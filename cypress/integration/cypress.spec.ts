/// <reference types="cypress" />

import { eq, xorBy } from "cypress/types/lodash"

describe("Testing the dog app", () => {
    it("Visit the dog app", () => {
        cy.wait(500)
        cy.visit("http://localhost:3000/")
        cy.contains("Favourite Dog")
    })

    it("Clicks a dog picture and gets a new picture", () => {
        let src1 = ""
        let src2 = ""
        cy.get("img").eq(0).invoke("attr", "src").then((firstSrc) => {
            src1 = firstSrc
            console.log("This is cypress", src1)
        }).wait(1000)

        cy.get(".dog").eq(0).click().wait(1000)

        cy.get("img").eq(0).invoke("attr", "src").then((secondSrc) => {
            src2 = secondSrc
            console.log("This is cypress", src2)
            expect(src1).to.not.equal(src2)
        })




    })
})