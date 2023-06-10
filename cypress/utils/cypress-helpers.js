// <reference types="Cypress" />

export default {
  testId: id => `[data-testid=${id}]`,
  assertElementExistsAttr: selector => cy.get(selector).should('have.attr', 'data-testid'),
  assertElementNotExists: selector => cy.get(selector).should('not.exist'),
  click: selector => cy.get(selector).click({ force: true, multiple: true }),
  assertVisibleText: text => cy.contains(text).should('be.visible'),
  assertElementTextContains: (selector, text) => cy.get(selector).should('contain.text', text),
  assertsElementsTableItems: (selector, child, count) => cy.get(selector).get(child).should('have.length', count),
  assertElementsChildrenCountEquals: (selector, count) => cy.get(selector).should('have.length', count),
};
