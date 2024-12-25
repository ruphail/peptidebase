const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Peptide extends Model {}

Peptide.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  sequence: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isValidSequence(value) {
        // Validate amino acid sequence
        const validAminoAcids = /^[ACDEFGHIKLMNPQRSTVWY]+$/;
        if (!validAminoAcids.test(value)) {
          throw new Error('Invalid amino acid sequence');
        }
      }
    }
  },
  length: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false
  },
  antimicrobialActivity: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 1
    }
  },
  hostToxicity: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 1
    }
  },
  stability: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 1
    }
  },
  membraneAffinity: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 1
    }
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  sequelize,
  modelName: 'Peptide',
  timestamps: true
});

module.exports = Peptide;