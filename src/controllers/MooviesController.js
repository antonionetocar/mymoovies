const db = require("../db");
const Joi = require('joi');

const createMoovieSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category_id: Joi.number().integer().required(),
  realease_date: Joi.date().iso().required(),
});

const MooviesController = {
  async findAll(req, res) {
    try {
      const moovies = await db.query(`
        SELECT 
          m.*,
          c.name AS category_name,
          c.description AS category_description
        FROM moovie m 
        INNER JOIN category c ON c.id = m.category_id
      `);

      res.json(moovies.rows);
    } catch (error) {
      handleError(res, error);
    }
  },

  async find(req, res) {
    const { id } = req.params;

    if (!Number.isInteger(parseInt(id, 10))) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    try {
      const moovies = await db.query(
        `
        SELECT 
          m.*,
          c.name AS category_name,
          c.description AS category_description
        FROM moovie m 
        INNER JOIN category c ON c.id = m.category_id
        WHERE m.id = $1
      `,
        [id]
      );

      if (moovies.rows.length > 0) {
        res.json(moovies.rows[0]);
      } else {
        res.status(404).json({ error: "Filme não encontrado" });
      }
    } catch (error) {
      handleError(res, error);
    }
  },

  async create(req, res) {
    const { error, value } = createMoovieSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const newMovie = await db.query(
        `INSERT INTO moovie (title, description, category_id, realease_date)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [value.title, value.description, value.category_id, value.realease_date]
      );

      res.status(201).json(newMovie.rows[0]);
    } catch (error) {
      handleError(res, error);
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    if (!Number.isInteger(parseInt(id, 10))) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    try {
      const result = await db.query(
        "DELETE FROM moovie WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rowCount > 0) {
        res.status(204).json({});
      } else {
        res.status(304).json({});
      }
    } catch (error) {
      handleError(res, error);
    }
  },
};

function handleError(res, error) {
  res.status(500).json({ error: error.message });
}

module.exports = MooviesController;
