const express = require('express');
const {
    validateActionId,
    validateActionPost,
} = require('../middleware/actionsMiddleware');

const Action = require('./actions-model');

const router = express.Router();

//[GET] /api/actions
router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            if(actions.length >= 1) {
                res.json(actions);
            } else {
                res.json([]);
            }
        })
        .catch(next);
});

//[GET] /api/actions/:id
router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action);
});

//[POST] /api/actions
router.post('/', validateActionPost, async (req, res, next) => {
    try {
      const result = await Action.insert({
        project_id: req.project_id,
        description: req.description,
        notes: req.notes
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  });

//[PUT] /api/actions/:id
router.put('/:id', validateActionId, validateActionPost, (req, res, next) => {
    Action.update(req.params.id, { 
        project_id: req.project_id,
        description: req.description,
        notes: req.notes
    })
      .then(updatedAction => {
          res.json(updatedAction);
      })
      .catch(next);
  });

//[DELETE] /api/actions/:id
router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
      await Action.remove(req.params.id);
      res.json({ message: "The post has been deleted"});
    }
    catch (err){
      next(err);
    }
  });

//Error handler
router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: 'you done messed up that action a a ron',
      message: err.message,
      stack: err.stack,
    });
  });
  
module.exports = router;