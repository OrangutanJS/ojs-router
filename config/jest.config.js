const path = require('path');
const rootDir = process.cwd();

module.exports = {
  roots: [
    path.join(rootDir, 'src')
  ],
  testEnvironment: "jsdom",
};
