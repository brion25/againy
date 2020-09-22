const prompts = require("prompts");
const Mustache = require("mustache");
const { basename, join } = require("path");
const { readFile, writeFile } = require("fs-extra");

const { formatSteps, asyncIterator, iterateAsyncIterator } = require("./utils");
const { TASKS } = require("./constants");

const promptsHandler = (steps) => (stepIterator) => {
  const step = steps[stepIterator];
  if (step.variables) {
    console.log(`-> Variables for ${step.file.name}`);
    return prompts(steps[stepIterator].variables);
  }
};

const handleQuestions = async (steps) => {
  const stepsFormatted = formatSteps(steps);
  const stepsCallback = promptsHandler(stepsFormatted);
  await iterateAsyncIterator(
    asyncIterator(stepsFormatted.length, stepsCallback),
    (iterator, answers) => {
      stepsFormatted[iterator].variables = answers;
    }
  );

  return stepsFormatted;
};

const handleFileCreation = async ({ file, variables }) => {
  const template = await readFile(file.template, "utf8");
  const output = Mustache.render(template, variables);
  await writeFile(join(file.path, basename(file.template)), output);
};

const tasksHandler = (tasks) => (taskIterator) => {
  const task = tasks[taskIterator];
  switch (task.type) {
    case TASKS.CREATE:
      return handleFileCreation(task);
  }
};

module.exports = {
  handleQuestions,
  handleFileCreation,
  tasksHandler,
};
