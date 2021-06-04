const express = require('express');
const server = express();

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h1>Sprint Challenge!</h1>`);
});

module.exports = server;
