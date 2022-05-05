/// <reference types="cypress" />

import { eq } from "cypress/types/lodash"

describe("Testing the dog app", () => {
    it("Visit the dog app", () => {
        cy.wait(500)
        cy.visit("http://localhost:3000/")
        cy.contains("Favourite Dog")
    })

    it("Clicks a dog picture and gets a new picture", () => {
        cy.get("img").eq(0).invoke("attr", "src").then((firstSrc) => {
            console.log("THis is cypress", firstSrc)
        })


    })
})