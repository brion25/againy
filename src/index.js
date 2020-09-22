const path = require('path')
const {pathExists} = require('fs-extra')

const {TASKS} = require('./constants')
const handleTasks = require('./handleTasks')

async function againy ({task: taskName, conf, matcher, variant}) {
    const jsTaskPath = path.resolve(conf, `${taskName}.js`);
    let taskPath = path.resolve(conf, `${taskName}.json`);
    const isJs = await pathExists(jsTaskPath);

    if (isJs) {
        taskPath = jsTaskPath;
    }

    const taskExist = await pathExists(taskPath);

    if (!taskExist) {
        throw new Error(`Task: "${taskName}" does not exist`)
    }

    const tasks = require(taskPath);
    handleTasks({tasks, variant, matcher});
}

module.exports = againy;
