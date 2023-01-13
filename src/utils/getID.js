const { Types } = require("../db.js");

async function getID(data) {
  let types = [];
  for (let i = 0; i < data.length; i++) {
    types.push(
      await Types.findOne({
        where: { name: data[i] }, //en la tabla Types busco los tipos de pokemon por id, y regreso solo sus ids en un array
        attributes: ["id"], //saco el atributo id
      })
    );
  }
  return types;
}

module.exports = { getID };
