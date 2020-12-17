/*  ================== Contstants  ================  */

const { createStore } = require("redux");

/*  ================== Actions  ================  */

/*  ================== Reducers  ================  */

const store = createStore(reducer);
window.store = store;

/*  ================== View ================  */
const results = document.getElementById("results");
const statusBox = document.getElementById("status-select");
const pagination = document.getElementById("pagination");
const gameResult = document.getElementById("game-result");

/*  ================== Handlers ================  */
/*  ================== Render ================  */
function render() {
    const {players, statuses: {statusesList, selectedStatus}} = store.getState();
    console.log(players, statuses);
    results.innerHTML = players.map((p, i)=> Row())
}
function Row(i, players, statuses, selectedStatus) {
    const {id, name, result, status} = player;
    const statusTitle = statuses.find((s) => s.id === status).title || 'No status';

    return `<tr class='${
        status === parseInt(selectedStatus) ? 'table-info' : ''
    }'>
        <td>${i + 1}</td>
        <td>${name}</td>
        <td>${result}</td>
        <td>${statusTitle}</td>
    </tr>
    `
}
render();