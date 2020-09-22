module.exports = (readStub, writeStub) => ({
  readFile: (...args) =>
    Promise.resolve(args).then(() => {
      readStub(args);
      return "template";
    }),
  writeFile: (...args) => Promise.resolve(args).then(writeStub),
});
