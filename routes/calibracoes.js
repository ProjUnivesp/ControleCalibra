const express = require('express');
const router = express.Router();
const calibracoes = require('../services/calibracoes');

/* GET calibrações. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await calibracoes.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Erro ao obter calibrações `, err.message);
    next(err);
  }
});

/* POST calibração */
router.post('/', async function(req, res, next) {
    try {
      res.json(await calibracoes.create(req.body));
    } catch (err) {
      console.error(`Erro ao criar calibrações `, err.message);
      next(err);
    }
  });

  /* PUT calibração */
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await calibracoes.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Erro ao atualizar calibração `, err.message);
      next(err);
    }
  });

  /* DELETE calibração */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await calibracoes.remove(req.params.id));
    } catch (err) {
      console.error(`Erro ao remover calibração`, err.message);
      next(err);
    }
  });

module.exports = router;