const express = require('express');
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

//[POST] /api/actions

//[PUT] /api/actions/:id

//[DELETE] /api/actions/:id

//Error handler
router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: 'you done messed up that action a a ron',
      message: err.message,
      stack: err.stack,
    });
  });
  
module.exports = router;