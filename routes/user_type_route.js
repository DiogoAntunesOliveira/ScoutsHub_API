const express = require('express');
const router = express.Router();
const user = require('../services/user_type.js');

router.get('/', async function(req, res, next) {
    try {
      console.log("test 1: passed")
      res.json(await user.getMutiple());
      console.log("final test: passed")
    } catch (err) {
      console.error(`Error while getting getting user `, err.message);
      next(err);
    }
  });

router.get('/:id', async function(req, res, next) {
  try {
    res.json(await user.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
  });

router.post('/', async function(req, res, next){
  try{
    console.log("test 1: passed")
    res.json(await user.create(req.body));
    console.log("final test: passed")
  }catch(err){
    console.error(`Error while creating user `, err.message);
    next(err)
  } 
})

router.put('/:id', async function(req, res, next) {
  try {
    console.log(req.params.id)
    res.json(await user.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await user.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});


module.exports = router