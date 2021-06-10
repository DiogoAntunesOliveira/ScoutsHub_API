const express = require('express');
const router = express.Router();
const participante = require('../services/activity.js');

router.get('/', async function(req, res, next) {
    try {
      console.log("test 1: passed")
      res.json(await participante.getMutiple());
      console.log("final test: passed")
    } catch (err) {
      console.error(`Error while getting getting participante `, err.message);
      next(err);
    }
  });

router.get('/:id /:id_utilizador', async function(req, res, next) {
  try {
    res.json(await participante.getById(req.params.id, req.params.id_utilizador));
  } catch (err) {
    console.error(`Error while getting participante `, err.message);
    next(err);
  }
  });

router.post('/', async function(req, res, next){
  try{
    console.log("test 1: passed")
    res.json(await participante.create(req.body));
    console.log("final test: passed")
  }catch(err){
    console.error(`Error while creating participante `, err.message);
    next(err)
  } 
})

router.put('/:id /:id_utlizador', async function(req, res, next) {
  try {
    console.log(req.params.id)
    res.json(await participante.update(req.params.id, req.params.id_utilizador, req.body));
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

router.delete('/:id /:id_utilizador', async function(req, res, next) {
  try {
    res.json(await participante.remove(req.params.id, req.params.id_utilizador));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});


module.exports = router