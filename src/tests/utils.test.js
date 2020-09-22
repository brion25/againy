const test = require("tape");
const sinon = require("sinon");
const {
  getSteps,
  formatSteps,
  asyncIterator,
  iterateAsyncIterator,
} = require("../utils");

test("getSteps", (t) => {
  t.plan(2);
  t.deepEqual(getSteps("test"), ["test"], "should handle NON array values");
  t.deepEqual(getSteps(["test"]), ["test"], "should handle array values");
});

test("formatSteps", (t) => {
  t.plan(3);

  t.deepEqual(formatSteps([{}]), [{}], "NON file steps");
  t.deepEqual(
    formatSteps([{ file: { entries: ["variable"] } }]),
    [
      {
        file: { entries: ["variable"] },
        variables: [
          { type: "text", name: "variable", message: 'Value for "variable": ' },
        ],
      },
    ],
    "should handle string entries"
  );
  t.deepEqual(
    formatSteps([
      { file: { entries: [{ type: "text", name: "test", message: "test" }] } },
    ]),
    [
      {
        file: { entries: [{ type: "text", name: "test", message: "test" }] },
        variables: [{ type: "text", name: "test", message: "test" }],
      },
    ],
    "should handle object entries"
  );
});

test("asyncIterator", (t) => {
  t.plan(1);

  const it = asyncIterator(1, () => Promise.resolve());

  t.equal(it[Symbol.asyncIterator](), it, "Should return an iterator");
});

test("iterateAsyncIterator", async (t) => {
  t.plan(1);
  const it = asyncIterator(1, () => Promise.resolve());
  const spy = sinon.spy();

  await iterateAsyncIterator(it, spy);

  t.equal(spy.callCount, 1);
});
