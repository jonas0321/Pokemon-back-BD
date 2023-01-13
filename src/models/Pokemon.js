const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.UUID, //genera un identidicador numérico único
        defaultValue: DataTypes.UUIDV4, //genera un identificador único por defecto, un UUIDV4, la más estable
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, //para hacer que sea obligatorio
        unique: true,
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      strength: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      defense: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      speed: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      img: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createInDb: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      
    }
  );
};
