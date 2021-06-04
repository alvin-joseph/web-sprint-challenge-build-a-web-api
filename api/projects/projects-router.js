const express = require('express');
const {
    validateProjectId,
    validateProjectPost,
} = require('../middleware/projectsMiddleware');

const Project = require('./projects-model');

const router = express.Router();

//[GET] /api/projects
router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            if(projects.length >= 1) {
                res.json(projects);
            } else {
                res.json([]);
            }
        })
        .catch(next);
});

//[GET] /api/projects/:id
router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project);
});

//[POST] /api/projects
router.post('/', validateProjectPost, (req, res, next) => {
    Project.insert({ 
        name: req.name,
        description: req.description
    })
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(next);
  });

//[PUT] /api/projects/:id
router.put('/:id', validateProjectId, validateProjectPost, (req, res, next) => {
    Project.update(req.params.id, { 
        name: req.name,
        description: req.description
    })
      .then(updatedUser => {
          res.json(updatedUser);
      })
      .catch(next);
  });

//[DELETE] /api/projects/:id
router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
      await Project.remove(req.params.id);
      res.json({ message: "The post has been deleted"});
    }
    catch (err){
      next(err);
    }
  });

//[GET] /api/projects/:id/actions
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
      const result = await Project.getProjectActions(req.params.id);
      res.json(result);
    }
    catch (err){
      next(err);
    }
  });

//Error handler
router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: 'you done messed up that project a a ron',
      message: err.message,
      stack: err.stack,
    });
  });
  
module.exports = router;
