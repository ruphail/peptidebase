const { Op } = require('sequelize');
const Peptide = require('../models/Peptide');
const Experiment = require('../models/Experiment');

exports.searchPeptides = async (req, res) => {
  try {
    const {
      sequence,
      source,
      minActivity,
      maxToxicity,
      page = 1,
      limit = 10
    } = req.query;

    const whereClause = {};
    
    if (sequence) {
      whereClause.sequence = {
        [Op.iLike]: `%${sequence}%`
      };
    }

    if (source) {
      whereClause.source = {
        [Op.iLike]: `%${source}%`
      };
    }

    if (minActivity) {
      whereClause.antimicrobialActivity = {
        [Op.gte]: parseFloat(minActivity)
      };
    }

    if (maxToxicity) {
      whereClause.hostToxicity = {
        [Op.lte]: parseFloat(maxToxicity)
      };
    }

    const offset = (page - 1) * limit;

    const peptides = await Peptide.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{
        model: Experiment,
        attributes: ['type', 'result', 'isSuccess']
      }]
    });

    res.json({
      totalCount: peptides.count,
      totalPages: Math.ceil(peptides.count / limit),
      currentPage: page,
      peptides: peptides.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPeptide = async (req, res) => {
  try {
    const peptide = await Peptide.create(req.body);
    res.status(201).json(peptide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};