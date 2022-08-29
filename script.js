const axios = require("axios");
const { Player, Nation, Club } = require("./models/index");
axios.defaults.headers.common["x-auth-token"] =
  "cf8ffe45-0d25-444d-8aac-f79bd0d2df84";

let totalPage = 0;

let saveData = async (data, model) => {
  let save;
  switch (model) {
    case "player":
      for (let i = 0; i < data.length; i++) {
        save = new Player({
          id: data[i].id,
          name: data[i].name,
          common_name: data[i].common_name,
          position: data[i].position,
          nationId: data[i].nation,
          clubId: data[i].club,
        });
        save.save();
      }
      break;
    case "nation":
      for (let i = 0; i < data.length; i++) {
        save = new Nation(data[i]);
        save.save();
      }
      break;
    case "club":
      for (let i = 0; i < data.length; i++) {
        save = new Club(data[i]);
        save.save();
      }
      break;
  }
  return save;
};

let getData = async (path, model) => {
  let response;
  if (totalPage === 0) {
    response = await axios(`${path}?page=1`);
    totalPage = response.data.page_total;
    saveData(response.data.items, model);
  }

  for (let i = 2; i <= totalPage; i++) {
    response = await axios(`${path}?page=${i}`);
    saveData(response.data.items, model);
  }

  totalPage = 0;
  return response;
};

let getPlayers = async () => {
  let response = await getData("https://futdb.app/api/players", "player");
  return response;
};

let getClubs = async () => {
  let response = await getData("https://futdb.app/api/clubs", "club");
  return response;
};

let getNations = async () => {
  let response = await getData("https://futdb.app/api/nations", "nation");
  return response;
};

module.exports = async (req, res) => {
  let responsePlayers = await getPlayers();
  let responseClubs = await getClubs();
  let responseNations = await getNations();

  res.send("Success!!!");
  console.log("Success!!!");
};
