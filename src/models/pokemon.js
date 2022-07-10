const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée', 'Psy', 'Spectre', 'Ténèbres', 'Roche', 'Sol', 'Acier']

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Le nom est déja pris."
      },
      validate: {
        notEmpty: { msg: "Vous ne pouvez pas entrez de chaîne vide." },
        notNull: { msg: "Le nom est une propriété requise." },
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Utilisez uniquement des nombres entier pour les points de vie." },
        notNull: { msg: "Les points de vie sont une propriété requise." },
        min: {
          args: [0],
          msg: "Les points de vie doivent être supérieurs où égal à 0",
        },
        max: {
          args: [999],
          msg: "Les points de vie doivent être inférieurs où égal à 999"
        }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Utilisez uniquement des nombres entier pour les points de combats." },
        notNull: { msg: "Les points de combats sont une propriété requise." },
        min: {
          args: [0],
          msg: "Les points de combats doivent être supérieurs où égal à 0",
        },
        max: {
          args: [99],
          msg: "Les points de combats doivent être inférieurs où égal à 99"
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: "Utilisez une URL valide." },
        notNull: { msg: "L'URL est une propriété requise." }
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',');
      },
      set(types) {
        this.setDataValue('types', types.join());
      },
      validate: {
        isTypeValid(value) {
          if (!value) {
            throw new Error("Un pokémon doit avoir au moins un type.");
          }
          if (value.split(',').length > 3) {
            throw new Error("Un pokémon ne peux avoir plus de trois types.");
          }
          value.split(',').forEach(type => {
            if (!validTypes.includes(type)) {
              throw new Error(`Le type du pokémon doit appartenir à la liste suivante : ${validTypes}`)
            }
          })
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}