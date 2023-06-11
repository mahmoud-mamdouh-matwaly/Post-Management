// <reference types="Cypress" />

export default {
  testId: id => `[data-testid=${id}]`,
  className: name => `[class=${name}]`,
  assertElementExistsAttr: selector => cy.get(selector).should('have.attr', 'data-testid'),
  assertElementExists: selector => cy.get(selector).should('exist'),
  assertElementNotExists: selector => cy.get(selector).should('not.exist'),
  click: selector => cy.get(selector).click({ force: true, multiple: true }),
  assertVisibleText: text => cy.contains(text).should('be.visible'),
  assertNotVisible: selector => cy.get(selector).should('not.be.visible'),
  assertElementTextContains: (selector, text) => cy.get(selector).should('contain.text', text),
  assertsElementsTableItems: (selector, child, count) => cy.get(selector).get(child).should('have.length', count),
  assertElementsChildrenCountEquals: (selector, count) => cy.get(selector).should('have.length', count),
  clickElementByIndex: (selector, index) =>
    cy.get(selector).each((element, elementIndex) => {
      if (elementIndex === index) cy.wrap(element).click();
    }),
  assertShouldHaveValue: (selector, value) => cy.get(selector).should('have.value', value),

};
