const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../db"); //me raigo mis modelos de base de datos
const { getDataPrincipal } = require("../utils/getDataPrincipal.js");
const { getDataDetallada } = require("../utils/getDataDetallada.js");
const { getTypes } = require("../utils/getTypes.js");
const { getApiInfo, getDbInfo } = require("../servicios/modules.js");
const router = Router();

/* listar todos los pokemons y buscar por nombre */
router.get("/", async (req, res) => {
  const { name } = req.query; //recibimos el nombre del pokemon desde client
  try {
    if (!name) {
      //si no recibo nombre enviar todos los pokemons
      //obtenemos la data desde la base de datos como un array
      const arrPokemonsDb = await getDbInfo();
      //obtenemos la data desde el api como un array
      const arrPokemons = await getApiInfo();
      //las juntamos en un solo array y enviamos la respuesta
      res.send([...arrPokemonsDb, ...arrPokemons]);
    } else {
      //si llegó un name por query GET /pokemons?name="..."
      const nameLower = name.trim().toLowerCase();
      //Primero verificamos si está en la base de datos
      let pokemonDB = await Pokemon.findOne({
        where: {
          name: nameLower,
        },
        include: Type,
      });
      if (pokemonDB) {
        pokemonDB = {
          ...pokemonDB.dataValues,
          types: getTypes(pokemonDB),
        };
        res.send(pokemonDB);
      }
      //Si no está en la base de datos traemos desde el api
      let pokemonAPI = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${nameLower}`
      );
      pokemonAPI = getDataPrincipal(pokemonAPI);
      res.send(pokemonAPI);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

/* Busco mis pokemons po Id */

router.get("/:id", async (req, res, next) => {
  const { id } = req.params; // recibimos el id por client
  try {
    let pokemonDB = await Pokemon.findOne({ where: { id }, include: Type }); //verificamos que el ID exista
    pokemonDB = { ...pokemonDB.dataValues, types: getTypes(pokemonDB) }; // como si existe, guardalo en la cosntante
    return res.send(pokemonDB); // envia el pokemon
  } catch (error) {
    // este catch se activa obvio si no existe el pokemon con el ID entregado
    try {
      //como ese id no estaba en la base de datos, ahora vamos a buscar en el api
      let pokemonAPI = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${parseInt(id)}`
      );
      pokemonAPI = getDataDetallada(pokemonAPI); //guardamos el pokemon detallado
      return res.send(pokemonAPI); //lo enviamos, todo esto es obvio si lo encontramos en la API
    } catch (error) {
      return res.status(404).send(error); //si el id no se encontró en ningún lado
    }
  }
});

/*-------Agrega un pokemon------*/

/*[ ] POST /pokemons:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
Crea un nuevo pokemon y lo guarda en la base de datos */

router.post("/", async (req, res, next) => {
  let { name, hp, strength, defense, speed, height, weight, img, types } =  req.body; //recibo toda la info por body
  try {
    if (!name || !hp || !strength || !defense || !speed || !height || !weight) {
      // si recibo un nombre guardo el pokemon en la base de datos, con los siguientes atributos
      return res.status(404).send("Faltan datos para crear pokemon");
    } else {
      const pokemonCreated = await Pokemon.create({
        //creo el pokemon
        name,
        hp,
        strength,
        defense,
        speed,
        height,
        weight,
        img,
        types,
      });

      let pokemons = await Type.findAll({
        //busco  el id de un pokemon creado, en la base de datos para enviarlo
        where: {
          name: types,
        },
      });
      pokemonCreated.addTypes(pokemons);
      return res.send( pokemonCreated); //lo envio
    }
  } catch (error) {
    return res.status(404).send("no se pudo crear el pokemon");
  }
});

module.exports = router;
