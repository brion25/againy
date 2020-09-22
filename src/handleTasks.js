const {TASKS} = require('./constants')
const {handleQuestions, tasksHandler} = require('./services')
const {iterateAsyncIterator, asyncIterator} = require('./utils')

async function handleTasks({tasks, matcher, variant}) {
    let steps = variant ? tasks[variant] : tasks.steps;

    if (!steps) {
        throw new Error ('Task is not defined...');
    }

    const stepsConfig = await handleQuestions(steps);
    const taskCallback = tasksHandler(stepsConfig)
    await iterateAsyncIterator(asyncIterator(stepsConfig.length, taskCallback))
}

module.exports = handleTasks;
