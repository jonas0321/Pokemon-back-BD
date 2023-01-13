/******** Función para devolver la data del pokemon desde el api necesaria para la ruta de detalles *********/

function getDataDetallada(elemento) {
  return {
    id: elemento.data.id,
    name: elemento.data.name,
    hp: elemento.data.stats[0].base_stat,
    strength: elemento.data.stats[1].base_stat,
    defense: elemento.data.stats[2].base_stat,
    speed: elemento.data.stats[5].base_stat,
    height: elemento.data.height,
    weight: elemento.data.weight,
    img: elemento.data.sprites.versions["generation-v"]["black-white"].animated
      .front_default,
    types: elemento.data.types.map((e) => e.type.name),
  };
}

module.exports = { getDataDetallada };
