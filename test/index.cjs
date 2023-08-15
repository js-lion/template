const { template } = require("../dist/template.umd.cjs");

const data = {
  id: 0,
  name: 1
};

const value = template("/a/{id}/:name", data);

console.log(value);

