const express = require('express');
const router = express.Router();
const perfis = require('../services/perfil.js');

router.get('/', async function(req, res, next) {
    try {
      console.log("test 1: passed")
      res.json(await perfis.getMutiple());
      console.log("final test: passed")
    } catch (err) {
      console.error(`Error while getting getting perfil `, err.message);
      next(err);
    }
  });

router.get('/user/:id_user', async function(req, res, next) {
  try {
    res.json(await perfis.getById(req.params.id_user));
  } catch (err) {
    console.error(`Error while getting perfil `, err.message);
    next(err);
  }
  });

  //  multer(multerConfig).single('file') -> Upload de um so arquivo
  //  multer(multerConfig).array -> Upload de varios ao mesmo tempo
router.post('/user/:id_user', async function(req, res, next){
  try{
    console.log(req.file);
    console.log("test 1: passed")
    res.json(await perfis.create(req.params.id_user, req.body));
    console.log("final test: passed")
  }catch(err){
    console.error(`Error while creating perfil `, err.message);
    next(err)
  } 
})

router.put('/user/:id_user', async function(req, res, next) {
  try {
    console.log(req.params.id)
    res.json(await perfis.update(req.params.id_user, req.body));
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await perfis.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});


module.exports = router