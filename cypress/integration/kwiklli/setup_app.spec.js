/******* Setup App Data *******/
const FONTEND_BASE_URL = Cypress.env("FONTEND_BASE_URL");
const API_KEY = Cypress.env("API_KEY");
const APP_ICON = Cypress.env("APP_ICON");
const BANK_ACCOUNT_NAME = Cypress.env("BANK_ACCOUNT_NAME");
const BANK_NAME = Cypress.env("BANK_NAME");
const BANK_ACCOUNT_NUMBER = Cypress.env("BANK_ACCOUNT_NUMBER");
const BANK_CODE = Cypress.env("BANK_CODE");
const PHONE_NUMBER = Cypress.env("PHONE_NUMBER");
const BVN = Cypress.env("BVN");

/** Auth data */
const USERNAME = Cypress.env("USERNAME");
const PASSWORD = Cypress.env("PASSWORD");

describe("The Simulation App", () => {
  before(() => {
    sessionStorage.clear();
  });

  after(() => {
    sessionStorage.clear();
  });

  describe("Setup Bank App", () => {
    it("should check for the h2 tags inner content", () => {
      cy.visit(FONTEND_BASE_URL)
        .get("h2.setup")
        .contains("Bank App Setup")
        .get('button[data-testId="custom-btn-id"]')
        .should("be.disabled");
    });

    it("should enter the App name", () => {
      cy.get('input[data-testId="appName"]')
        .type(BANK_NAME)
        .should("have.value", BANK_NAME)
        .get('button[data-testId="custom-btn-id"]')
        .should("be.disabled");
    });

    it("should enter the bank's API key", () => {
      cy.get('input[data-testId="apiKey"]')
        .type(API_KEY)
        .should("have.value", API_KEY)
        .get('button[data-testId="custom-btn-id"]')
        .should("be.disabled");
    });

    it("should enter the bank logo", () => {
      cy.get('input[data-testId="appIcon"]')
        .type(APP_ICON)
        .should("have.value", APP_ICON)
        .get('button[data-testId="custom-btn-id"]')
        .should("be.disabled");
    });

    it("should enter the bank account name (Full Name)", () => {
      cy.get('input[data-testId="senderFullName"]')
        .type(BANK_ACCOUNT_NAME)
        .should("have.value", BANK_ACCOUNT_NAME)
        .get('button[data-testId="custom-btn-id"]')
        .should("be.disabled");
    });

    it("should enter a phone number or email", () => {
      cy.get('input[data-testId="phoneNumber"]')
        .type(PHONE_NUMBER)
        .should("have.value", PHONE_NUMBER)
        .get('button[data-testId="custom-btn-id"]')
        .should("be.disabled");
    });

    it("should enter the bank account number", () => {
      cy.get('input[data-testId="accountNumber"]')
        .type(BANK_ACCOUNT_NUMBER)
        .should("have.value", BANK_ACCOUNT_NUMBER)
        .get('button[data-testId="custom-btn-id"]')
        .should("be.disabled");
    });

    it("should enter the bank code", () => {
      cy.get('input[data-testId="bankCode"]')
        .type(BANK_CODE)
        .should("have.value", BANK_CODE)
        .get('button[data-testId="custom-btn-id"]')
        .should("be.disabled");
    });

    it("should enter the bank verification number", () => {
      cy.get('input[data-testId="bvn"]')
        .type(BVN)
        .should("have.value", BVN)
        .get('button[data-testId="custom-btn-id"]')
        .should("not.be.disabled");
    });

    it("should click the proceed button", () => {
      cy.get('button[data-testId="custom-btn-id"]').click();
    });
  });

  describe("Authenticate User", () => {
    it("should check for the h2 tags inner content", () => {
      cy.get("h2.setup")
        .contains("Login")
        .get('button[data-testId="custom-btn-id"]')
        .should("be.disabled");
    });

    it("should enter the username (Mock Auth)", () => {
      cy.get('input[data-testId="username"]')
        .type(USERNAME)
        .should("have.value", USERNAME)
        .get('button[data-testId="custom-btn-id"]')
        .should("be.disabled");
    });

    it("should enter the password (Mock Auth)", () => {
      cy.get('input[data-testId="password"]')
        .type(PASSWORD)
        .should("have.value", PASSWORD)
        .get('button[data-testId="custom-btn-id"]')
        .should("not.be.disabled");
    });

    it("should click the login button", () => {
      cy.get('button[data-testId="custom-btn-id"]').click();
    });
  });
});
