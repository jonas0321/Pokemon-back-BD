function getTypes(pokemon) {
  pokemon = pokemon.types.map((e) => e.dataValues.name);
  return pokemon;
}

module.exports = { getTypes };
