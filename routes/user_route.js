const express = require('express');
const router = express.Router();
const users = require('../services/user.js');

router.get('/', async function(req, res, next) {
    try {
      console.log("test 1: passed")
      res.json(await users.getMutiple());
      console.log("final test: passed")
    } catch (err) {
      console.error(`Error while getting getting users `, err.message);
      next(err);
    }
  });

router.get('/:id', async function(req, res, next) {
  try {
    res.json(await users.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
  });

router.post('/', async function(req, res, next){
  try{
    console.log("test 1: passed")
    res.json(await users.create(req.body));
    console.log("final test: passed")
  }catch(err){
    console.error(`Error while creating users `, err.message);
    next(err)
  } 
})

router.put('/:id', async function(req, res, next) {
  try {
    console.log(req.params.id)
    res.json(await users.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await users.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});


module.exports = router