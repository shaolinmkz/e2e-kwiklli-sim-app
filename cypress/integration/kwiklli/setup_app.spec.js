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
const NEW_USERID = Cypress.env("NEW_USERID");

/** Auth data */
const USERNAME = Cypress.env("USERNAME");
const PASSWORD = Cypress.env("PASSWORD");

/** Global Variables */
const GLOBAL_TIMEOUT = 60000;
const FIXED_OTP = [1, 2, 3, 4, 5, 6];

describe("The Simulation App", () => {
  before(() => {
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

  describe("Enroll and link a user", () => {
    it("Try to transfer money but realise you have to link", () => {
      cy.get('div.menu > button[type="button"]', { timeout: GLOBAL_TIMEOUT })
        .contains("Transfer To Phone/Email")
        .click()
        .get("h2.setup")
        .contains("Link Phone/Email")
        .get('input[data-testId="phoneNumber"]')
        .should("have.value", PHONE_NUMBER)
        .get('button[data-testId="custom-btn-id"]')
        .should("not.be.disabled")
        .click();
    });

    it("Enter OTP to confirm linking then click link", () => {
      FIXED_OTP.forEach((entry) => {
        cy.get(`[data-testid=char${entry}]`, { timeout: GLOBAL_TIMEOUT })
          .type(entry)
          .should("have.value", entry);
      });

      cy.get("[data-testid=custom-btn-id]")
        .contains("Link")
        .should("not.be.disabled")
        .click();
    });

    it("show a link success screen and close the view by clicking on the close button", () => {
      cy.get("h3", { timeout: GLOBAL_TIMEOUT })
        .contains("Account Linked Successfully")
        .get("p")
        .contains(`${PHONE_NUMBER} has been linked to your bank account`)
        .get(".close-modal > button")
        .click();
    });
  });

  describe("Transfer money to another users Email or Phone", () => {
    const RECEIVERID = "mcemie4eva@gmail.com";
    const AMOUNT = "15000";

    it("Enter the amount you want to send", () => {
      cy.get("h2")
        .contains("Transfer Money")
        .get('[data-testid="amount"]')
        .type(AMOUNT)
        .should("have.value", AMOUNT);
    });

    it("Enter the receivers phone number or email and click send money", () => {
      cy.get('[data-testid="receiverId"]')
        .type(RECEIVERID)
        .should("have.value", RECEIVERID)
        .get('[data-testid="custom-btn-id"]')
        .contains("SEND MONEY")
        .click();
    });

    it("show a transfer success screen and close the view by clicking on the close button", () => {
      const RESOLVE_AMOUNT = Number(AMOUNT).toLocaleString();

      cy.get("p", { timeout: GLOBAL_TIMEOUT * 2 })
        .contains(
          `You have successfully sent ₦${RESOLVE_AMOUNT} to ${RECEIVERID} Kindly ensure that they link their phone number or email in their bank's app`
        )
        .get("p")
        .contains(
          "This payment will expire in 3 days and will return to your account"
        )
        // Close the success view
        .get(".close-modal > button")
        .click();
    });
  });

  describe("Independent Linking", () => {
    it("link another email or phone number", () => {
      cy.get('div.menu > button[type="button"]', { timeout: GLOBAL_TIMEOUT })
        .contains("Link Another Phone/Email")
        .click()
        .get("h2.setup")
        .contains("Link Phone or Email")
        .get('input[data-testId="userId"]')
        .clear()
        .type(NEW_USERID)
        .should("have.value", NEW_USERID)
        .get('button[data-testId="custom-btn-id"]')
        // Click the send OTP button
        .contains("SEND OTP")
        .should("not.be.disabled")
        .click();
    });

    it("Enter OTP to confirm linking then click link", () => {
      FIXED_OTP.forEach((entry) => {
        cy.get(`[data-testid=char${entry}]`, { timeout: GLOBAL_TIMEOUT })
          .type(entry)
          .should("have.value", entry);
      });

      cy.get("[data-testid=custom-btn-id]")
        .contains("Link")
        .should("not.be.disabled")
        .click();
    });

    it("show the independent link success screen and close the view by clicking on the close button", () => {
      cy.get("h3", { timeout: GLOBAL_TIMEOUT })
        .contains("Account Linked Successfully")
        .get("p")
        .contains(`${NEW_USERID} has been linked to your bank account`)
        .get(".close-modal > button")
        .click();
    });
  });

  describe("Unlinking", () => {
    describe(`Unlinking ${NEW_USERID}`, () => {
      it(`unlink ${NEW_USERID}`, () => {
        cy.get('div.menu > button[type="button"]', { timeout: GLOBAL_TIMEOUT })
          .contains("Unlink Phone/Email")
          .click()
          .get("h2.setup")
          .contains("Unlink Phone or Email")
          .get('input[data-testId="userId"]')
          .clear()
          .type(NEW_USERID)
          .should("have.value", NEW_USERID)
          .get('button[data-testId="custom-btn-id"]')
          // Click the send OTP button
          .contains("SEND OTP")
          .should("not.be.disabled")
          .click();
      });

      it("Enter OTP to confirm linking then click link", () => {
        FIXED_OTP.forEach((entry) => {
          cy.get(`[data-testid=char${entry}]`, { timeout: GLOBAL_TIMEOUT })
            .type(entry)
            .should("have.value", entry);
        });

        cy.get("[data-testid=custom-btn-id]")
          .contains("Link")
          .should("not.be.disabled")
          .click();
      });

      it("show the independent link success screen and close the view by clicking on the close button", () => {
        cy.get("h3", { timeout: GLOBAL_TIMEOUT })
          .contains("Account Linked Successfully")
          .get("p")
          .contains(`${NEW_USERID} has been linked to your bank account`)
          .get(".close-modal > button")
          .click();
      });
    });

    describe(`Unlinking ${PHONE_NUMBER}`, () => {
      it(`unlink ${PHONE_NUMBER}`, () => {
        cy.get('div.menu > button[type="button"]', { timeout: GLOBAL_TIMEOUT })
          .contains("Unlink Phone/Email")
          .click()
          .get("h2.setup")
          .contains("Unlink Phone or Email")
          .get('input[data-testId="userId"]')
          .clear()
          .type(PHONE_NUMBER)
          .should("have.value", PHONE_NUMBER)
          .get('button[data-testId="custom-btn-id"]')
          // Click the send OTP button
          .contains("SEND OTP")
          .should("not.be.disabled")
          .click();
      });

      it("Enter OTP to confirm linking then click link", () => {
        FIXED_OTP.forEach((entry) => {
          cy.get(`[data-testid=char${entry}]`, { timeout: GLOBAL_TIMEOUT })
            .type(entry)
            .should("have.value", entry);
        });

        cy.get("[data-testid=custom-btn-id]")
          .contains("Link")
          .should("not.be.disabled")
          .click();
      });

      it("show the independent link success screen and close the view by clicking on the close button", () => {
        cy.get("h3", { timeout: GLOBAL_TIMEOUT })
          .contains("Account Linked Successfully")
          .get("p")
          .contains(`${PHONE_NUMBER} has been linked to your bank account`)
          .get(".close-modal > button")
          .click();
      });
    });
  });

  describe("Logout", () => {
    it("check for link status and logout", () => {
      cy.get(".app-header .link-status-style > span.tag", {
        timeout: GLOBAL_TIMEOUT,
      })
        .contains("Unlinked")
        .get(".app-header > nav > ul > li button")
        .contains("Logout")
        .click();
    });
  });
});
