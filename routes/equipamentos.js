const express = require('express');
const router = express.Router();
const equipamentos = require('../services/equipamentos');

/* GET equipamentos. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await equipamentos.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Erro ao obter equipamentos `, err.message);
    next(err);
  }
});

/* POST equipamento */
router.post('/', async function(req, res, next) {
    try {
      res.json(await equipamentos.create(req.body));
    } catch (err) {
      console.error(`Erro ao criar equipamentos `, err.message);
      next(err);
    }
  });

  /* PUT equipamento */
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await equipamentos.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Erro ao atualizar equipamento `, err.message);
      next(err);
    }
  });

  /* DELETE equipamento */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await equipamentos.remove(req.params.id));
    } catch (err) {
      console.error(`Erro ao remover equipamento`, err.message);
      next(err);
    }
  });

module.exports = router;