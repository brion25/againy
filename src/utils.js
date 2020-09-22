const formatPromptStep = (step) => {
  if (step.file && step.file.entries) {
    return {
      ...step,
      variables: step.file.entries.map((entry) => {
        if (typeof entry === "string") {
          return {
            type: "text",
            name: entry,
            message: `Value for "${entry}": `,
          };
        }

        return entry;
      }),
    };
  }

  return step;
};

const getSteps = (steps) => {
  if (!Array.isArray(steps)) {
    console.warn("Steps is not an array...");

    return [].concat(steps);
  } else {
    return [...steps];
  }
};

const formatSteps = (steps) => {
  return getSteps(steps).map(formatPromptStep);
};

const asyncIterator = async function* (maxIterations, callback) {
  let iteration = 0;

  while (iteration < maxIterations) {
    const response = await callback(iteration);
    yield response;
    iteration++;
  }
};

const iterateAsyncIterator = async (iterator, callback) => {
  let i = 0;

  for await (let iteratee of iterator) {
    if (callback) {
      callback(i, iteratee);
    }
    i++;
  }
};

module.exports = {
  formatPromptStep,
  getSteps,
  formatSteps,
  asyncIterator,
  iterateAsyncIterator,
};
