const Action = require('../actions/actions-model');
const Project = require('../projects/projects-model');

async function validateActionId(req, res, next) {
    try{
        const action = await Action.get(req.params.id);
        if(!action) {
            res.status(404).json({
                message: "action not found"
            });
        } else {
            req.action = action;
            next();
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Problem finding action'
        });
    }
}

async function validateActionPost(req, res, next) {
    try {
        const { description, notes, project_id } = req.body;
        const projects = await Project.get();
        projects.filter(project => {
            project.id;
            if(project_id !== project.id) {
                return res.status(400).json({
                    message:"please enter a valid project id"
                });
            }
        });
        if (!notes || !description || !project_id) {
          res.status(400).json({
            message: "Please provide notes, description, and a project id for the post"
          });
        } else {
            req.notes = notes.trim();
            req.description = description.trim();
            req.project_id = project_id;
            next();
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Problem finding project'
        });
    }
}

module.exports = {
    validateActionId,
    validateActionPost,
};