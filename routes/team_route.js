const express = require('express');
const router = express.Router();
const equipa = require('../services/team.js');

router.get('/', async function(req, res, next) {
    try {
      console.log("test 1: passed")
      res.json(await equipa.getMutiple());
      console.log("final test: passed")
    } catch (err) {
      console.error(`Error while getting getting perfil `, err.message);
      next(err);
    }
  });

router.get('/:id', async function(req, res, next) {
  try {
    res.json(await equipa.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting perfil `, err.message);
    next(err);
  }
  });

router.post('/', async function(req, res, next){
  try{
    console.log("test 1: passed")
    res.json(await equipa.create(req.body));
    console.log("final test: passed")
  }catch(err){
    console.error(`Error while creating perfil `, err.message);
    next(err)
  } 
})

router.put('/:id', async function(req, res, next) {
  try {
    console.log(req.params.id)
    res.json(await equipa.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await equipa.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});


module.exports = router