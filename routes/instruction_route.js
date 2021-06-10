const express = require('express');
const router = express.Router();
const instrucao = require('../services/intrution.js');

router.get('/', async function(req, res, next) {
    try {
      console.log("test 1: passed")
      res.json(await instrucao.getMutiple());
      console.log("final test: passed")
    } catch (err) {
      console.error(`Error while getting getting Instrucoes `, err.message);
      next(err);
    }
  });

router.get('/:id', async function(req, res, next) {
  try {
    res.json(await instrucao.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting Instrucoes `, err.message);
    next(err);
  }
  });

router.post('/', async function(req, res, next){
  try{
    console.log("test 1: passed")
    res.json(await instrucao.create(req.body));
    console.log("final test: passed")
  }catch(err){
    console.error(`Error while creating Instrucoes `, err.message);
    next(err)
  } 
})

router.put('/:id', async function(req, res, next) {
  try {
    console.log(req.params.id)
    res.json(await instrucao.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Instrucoes`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await instrucao.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});


module.exports = router