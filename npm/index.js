'use strict';

if (process.env.NODE_ENV === 'development') {
  module.exports = require('./oRouter.development.js');
} else {
  module.exports = require('./oRouter.production.min.js');
}