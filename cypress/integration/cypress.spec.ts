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
        // cy.get(".dog").eq(0).click()
        // let src2 = ""
        // cy.get("img").eq(0).invoke("attr", "src").then((secondSrc) => {
        //     src2 = secondSrc
        // })


        // const test = cy.get("img").eq(0).should('have.attr', 'src').should('include', 'https')
        // console.log("This is scypress,", test)
        // cy.get(".dog").eq(0).click()
        // cy.get("img").eq(0).should('have.attr', 'src').should('include', 'https')
        //if link image is different test passes

    })
})