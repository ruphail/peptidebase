const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Experiment extends Model {}

Experiment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  peptideId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Peptides',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM('ANTIMICROBIAL', 'TOXICITY', 'STABILITY'),
    allowNull: false
  },
  result: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  conditions: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  methodology: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isSuccess: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  sequelize,
  modelName: 'Experiment',
  timestamps: true
});

module.exports = Experiment;