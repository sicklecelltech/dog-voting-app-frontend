/// <reference types="cypress" />

describe("Testing the dog app", () => {
    it("Visit the dog app", () => {
        cy.visit("https://tichnozar-dog-voting-app.netlify.app/")
    })
})