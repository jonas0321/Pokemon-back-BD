function getDataPrincipal(elemento) {
  return {
    id: elemento.data.id,
    name: elemento.data.name,
    strength: elemento.data.stats[1].base_stat,
    img: elemento.data.sprites.front_default,
    types: elemento.data.types.map((e) => e.type.name),
  };
}

module.exports = { getDataPrincipal };
