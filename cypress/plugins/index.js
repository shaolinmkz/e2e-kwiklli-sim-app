/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  require('dotenv').config();
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  config.env.FONTEND_BASE_URL = process.env.FONTEND_BASE_URL;
  config.env.API_KEY = process.env.API_KEY;
  config.env.APP_ICON = process.env.APP_ICON;
  config.env.BANK_ACCOUNT_NAME = process.env.BANK_ACCOUNT_NAME;
  config.env.BANK_NAME = process.env.BANK_NAME;
  config.env.BANK_ACCOUNT_NUMBER = process.env.BANK_ACCOUNT_NUMBER;
  config.env.BANK_CODE = process.env.BANK_CODE;
  config.env.PHONE_NUMBER = process.env.PHONE_NUMBER;
  config.env.BVN = process.env.BVN;
  config.env.USERNAME = process.env.USERNAME;
  config.env.PASSWORD = process.env.PASSWORD;

  return config;
}
