import axios from "axios";
export default {
  loadPlayers: (_page,_limit) => axios.get("/api/players", {
    params: {
      _page, _limit
    }
  }).then((res) => res.data),
createPlayer: name => axios.post('/api/players', {name}).then((res) => res.data)
};
