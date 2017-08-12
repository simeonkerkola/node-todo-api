module.exports = {
     "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "mocha": true
    },
    "extends": "airbnb-base",
    rules: {
    semi: 0,
    "no-unused-vars": ["warn", { "vars": "local" }],
    "no-shadow": ["error", { "builtinGlobals": false, "hoist": "functions", "allow": [] }],
    "no-underscore-dangle": ["error", { "allow": ["_id"] }]
  }
};