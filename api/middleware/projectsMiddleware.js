const Project = require('../projects/projects-model');

async function validateProjectId(req, res, next) {
    try{
        const project = await Project.get(req.params.id);
        if(!project) {
            res.status(404).json({
                message: "project not found"
            });
        } else {
            req.project = project;
            next();
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Problem finding project'
        });
    }
}

function validateProjectPost(req, res, next) {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({
        message: "Please provide name and description for the post"
      });
    } else {
      req.name = name.trim();
      req.description = description.trim();
      next();
    }
}

module.exports = {
    validateProjectId,
    validateProjectPost,
};