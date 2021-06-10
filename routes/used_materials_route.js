const express = require('express');
const router = express.Router();
const material = require('../services/used_material.js');

router.get('/', async function(req, res, next) {
    try {
      console.log("test 1: passed")
      res.json(await material.getMutiple());
      console.log("final test: passed")
    } catch (err) {
      console.error(`Error while getting getting material_usado `, err.message);
      next(err);
    }
  });

router.get('/:id', async function(req, res, next) {
  try {
    res.json(await material.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting material_usado `, err.message);
    next(err);
  }
  });

router.post('/', async function(req, res, next){
  try{
    console.log("test 1: passed")
    res.json(await material.create(req.body));
    console.log("final test: passed")
  }catch(err){
    console.error(`Error while creating material_usado `, err.message);
    next(err)
  } 
})

router.put('/:id', async function(req, res, next) {
  try {
    console.log(req.params.id)
    res.json(await material.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

router.delete('/:id, id_material', async function(req, res, next) {
  try {
    res.json(await material.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});


module.exports = router