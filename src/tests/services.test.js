const tape = require("tape");
const sinon = require("sinon");
const { proxy } = require("proxyrequire");

const prompts = require("../mocks/prompts");
const mustache = require("../mocks/mustache");
const fsExtra = require("../mocks/fs-extra");
const { TASKS } = require("../constants");

tape("handleQuestions", async (t) => {
  t.plan(1);

  const spy = sinon.spy();
  const Stub = proxy(() => require("../services").handleQuestions, {
    prompts: prompts(spy),
  });

  await Stub([{ file: {}, variables: ["variable 1"] }]);

  t.equal(spy.callCount, 1, "should call prompts");
});

tape("handleFileCreation", async (t) => {
  t.plan(3);

  const readSpy = sinon.spy();
  const writeSpy = sinon.spy();
  const renderSpy = sinon.spy();
  const Stub = proxy(() => require("../services").handleFileCreation, {
    mustache: mustache(renderSpy),
    "fs-extra": fsExtra(readSpy, writeSpy),
  });

  await Stub({ file: { path: "", template: "" }, variables: {} });

  t.equal(readSpy.callCount, 1, "should read the file");
  t.equal(writeSpy.callCount, 1, "should write the file");
  t.equal(
    renderSpy.calledWith("template", {}),
    true,
    "should format the template"
  );
});

tape("tasksHandler", async (t) => {
  t.plan(1);

  const readSpy = sinon.spy();
  const writeSpy = sinon.spy();
  const renderSpy = sinon.spy();
  const Stub = proxy(() => require("../services").tasksHandler, {
    mustache: mustache(renderSpy),
    "fs-extra": fsExtra(readSpy, writeSpy),
  });

  await Stub([
    { type: TASKS.CREATE, file: { path: "", template: "" }, variables: {} },
  ])(0);
  await Stub([
    { type: "NO_TASK", file: { path: "", template: "" }, variables: {} },
  ])(0);

  t.equal(writeSpy.callCount, 1, "should write the file");
});
