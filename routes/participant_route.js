const express = require('express');
const router = express.Router();
const participante = require('../services/participant.js');

router.get('/atividade/:id/utilizador/:id_utilizador', async function(req, res, next) {
    try {
      console.log(req.params)
      console.log("test 1: passed")
      res.json(await participante.getMutiple(req.params.id, req.params.id_utilizador));
      console.log("final test: passed")
    } catch (err) {
      console.error(`Error while getting getting participante `, err.message);
      next(err);
    }
  });

  router.get('/atividade/:id', async function(req, res, next) {
    try {
      console.log(req.params)
      console.log("test 1: passed")
      res.json(await participante.getMutipleByActivity(req.params.id, req.params.id_utilizador));
      console.log("final test: passed")
    } catch (err) {
      console.error(`Error while getting getting participante `, err.message);
      next(err);
    }
  });

  router.get('/utilizador/:id', async function(req, res, next) {
    try {
      console.log(req.params)
      console.log("test 1: passed")
      res.json(await participante.getMutipleByUser(req.params.id));
      console.log("final test: passed")
    } catch (err) {
      console.error(`Error while getting getting participante `, err.message);
      next(err);
    }
  });
  

router.post('/atividade/:id/utilizador/:id_utilizador', async function(req, res, next){
  try{
    console.log("test 1: passed")
    res.json(await participante.create(req.params.id, req.params.id_utilizador, req.body));
    console.log("final test: passed")
  }catch(err){
    console.error(`Error while creating participante `, err.message);
    next(err)
  } 
})

router.put('/atividade/:id/utilizador/:id_utlizador', async function(req, res, next) {
  try {
    console.log(req.params.id)
    res.json(await participante.update(req.params.id, req.params.id_utilizador, req.body));
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

router.delete('/atividade/:id/utilizador/:id_utilizador', async function(req, res, next) {
  try {
    res.json(await participante.remove(req.params.id, req.params.id_utilizador));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});


module.exports = router