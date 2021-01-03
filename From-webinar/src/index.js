import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import api from "./api";
import { statuses } from "./data";
import { generate as id } from "shortid";
/*  ================== Contstants  ================  */
const SELECT_STATUS = "SELECT_STATUS";
const LOAD_PLAYERS = "LOAD_PLAYERS";
const ADD_PLAYER = "ADD_PLAYER";
/*  ================== Actions  ================  */
const loadPlayersAction = (page = 1, limit = 3) => (dispatch) => {
  return api.loadPlayers(page, limit).then(({ data, total }) => {
    return dispatch({
      type: LOAD_PLAYERS,
      payload: { data, total, page },
    });
  });
};

const selectStatusAction = (selectedStatus) => ({
  type: SELECT_STATUS,
  payload: { selectedStatus },
});
const addPlayerAction = (name) => (dispatch) => {
  return api.createPlayer(name).then(() => {
    return dispatch(loadPlayersAction(1));
  });
};

/*  ================== Reducers  ================  */
const initStatePlayers = {total: 0, players: [], page: 1};

const playersReducer = (state = initStatePlayers, action) => {
  const { type, payload: {data, total, page} = {} } = action;
  switch (type) {
    case LOAD_PLAYERS:
      return {...state, players: [ ...data], total, page};
    case ADD_PLAYER:
      return [{ ...payload.data }, ...state];
    default:
      return state;
  }
};
const initState = {
  statusesList: statuses,
  selectedStatus: -1,
};
const statusesReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SELECT_STATUS:
      return { ...state, selectedStatus: payload.selectedStatus };
    default:
      return state;
  }
};
const reducer = combineReducers({
  players: playersReducer,
  statuses: statusesReducer,
});

const middlewares = [thunk];

const store = createStore(reducer, applyMiddleware(...middlewares));
window.store = store;
store.dispatch(loadPlayersAction());
/*  ================== View ================  */
const results = document.getElementById("results");
const statusBox = document.getElementById("status-select");
const pagination = document.getElementById("pagination");
const gameResult = document.getElementById("game-result");

/*  ================== Handlers ================  */
document.addEventListener("submit", (e) => {
  if (e.target.nodeName.toLowerCase() !== "form") return;
  e.preventDefault();
  const playerNameInput = e.target.playerName;
  const name = playerNameInput.value.trim();
  if (!name) {
    alert("Enter name");
    return;
  }
  store.dispatch(addPlayerAction(name));
  playerNameInput.value = "";
});
document.addEventListener(`change`, ({ target }) => {
  if (target.id !== "status-select") return;
  const status = target.value;
  if (Number(status) === -1) {
    alert("Choose status");
    return;
  }
  store.dispatch(selectStatusAction(status));
});

document.addEventListener('click', e => {
  const { target } = e;
  if (!target.classList.contains('page-link')){
    return
  }
  e.preventDefault();
  const page = Number(target.dataset.page);
store.dispatch(loadPlayersAction(page));
})
/*  ================== Render ================  */
function render() {
  const {
    players: {players, total, page},
    statuses: { statusesList, selectedStatus },
  } = store.getState();
  const pages = Math.ceil(total / 3);

  if (players.length && statusesList.length) {
    results.innerHTML = players
      .map((p, i) => Row(i, p, statusesList, selectedStatus))
      .join("");
    statusBox.innerHTML =
      `<option value="-1">Choose status</option>` +
      statusesList.map((s) => Option(s, selectedStatus)).join("");
  
  pagination.innerHTML = Paginate(pages, page);
  gameResult.innerHTML = "Page" + page + "total: " + total;
    }
}

function Paginate(pages, page){
  let out = '';
  for (let i = 1; i <= pages; i++){
    out += `<li class="page-item ${i===page ? "active":""}">
    <a class="page-link" data-page="${i}" href="#">${i}</a>
    </li>`
  }
  return out;
}

function Option(el, selectedStatus) {
  const { id, title } = el;
  return `<option ${
    Number(selectedStatus) === id ? "selected" : ""
  } value=${id}>
    ${title}</option>`;
}

function Row(i, player, statuses, selectedStatus) {
  const { name, result, status } = player;
  const statusTitle =
    statuses.find((s) => s.id === status).title || "No Status";
  return `<tr class="${
    status === parseInt(selectedStatus) ? "table-info" : ""
  }">
<td>${i + 1}</td>
<td>${name}</td>
<td>${result}</td>
<td>${statusTitle}</td>
</tr>`;
}
render();
store.subscribe(render);
store.subscribe(() => console.log(store.getState()));
