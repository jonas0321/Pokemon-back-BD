const { getDataPrincipal } = require("../utils/getDataPrincipal");
const { Pokemon, Type } = require("../db.js");

const axios = require("axios");

const getApiInfo = async () => {
  
    let url = "https://pokeapi.co/api/v2/pokemon/";
    let pokemones = [];
    do {
      let info = await axios.get(url);
      let pokemonesApi = info.data;
      let auxPokemones = await pokemonesApi.results.map((e) => {
        return {
          name: e.name,
          url: e.url,
        };
      });
      pokemones.push(...auxPokemones);
      url = pokemonesApi.next;
    } while (url != null && pokemones.length < 40); //ACA PUEDO LIMITARLOS A LOS QUE QUIERA TRAER
    // console.log(pokemones);
    let pokesWithData = await Promise.all(
      pokemones.map(async (e) => {
        let pokemon = await axios.get(e.url);
        return {
          ...getDataPrincipal(pokemon),
        };
      })
    );
    // console.log(pokesWithData);
    return pokesWithData;
  
};

async function getDbInfo() {
  return await Pokemon.findAll({
    include: {
      model: Type,
      atributes: ["name"], //trae la data mediante el nombre(la propiedad del modelo type)
      thorugh: {
        atributes: ["id", "name"], //para comprobación, siempre va
      },
    },
  });
}

module.exports = { getApiInfo, getDbInfo };
