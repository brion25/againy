module.exports = (stub) => (...args) => Promise.resolve(args).then(stub);
