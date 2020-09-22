#!/usr/bin/env node
const path = require("path");
const againy = require("../src");

require("yargs").command(
  "$0 [task] [options]",
  "Start scaffolding",
  (yargs) => {
    yargs
      .positional("task", {
        describe: "task to execute",
      })
      .option("variant", {
        describe: "Variant to run",
      })
      .option("conf", {
        describe: "Path to the folder steps",
        default: path.resolve(process.cwd(), "./.againy"),
      })
      .option("matcher", {
        describe: "Comment to look for for the files to update",
        default: "// againy -->",
      });
  },
  againy
).argv;
