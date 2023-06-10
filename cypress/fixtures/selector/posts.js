import {
  testId,
  assertElementExistsAttr,
  assertElementNotExists,
  click,
  assertVisibleText,
  assertElementTextContains,
  assertsElementsTableItems,
  assertElementsChildrenCountEquals,
} from '../../utils/cypress-helpers';

const postsPage = Object.freeze({
  selectors: {
    postsPage: testId('postsPage'),
    loading: testId('loading'),
    pageTitle: testId('pageTitle'),
  },
  actions: {
    clickAction: selectors => click(selectors),
  },
  assertions: {
    assertElementIsVisible: selectors => assertElementExistsAttr(selectors),
    assertElementIsNotExist: selectors => assertElementNotExists(selectors),
    assertVisibleText: text => assertVisibleText(text),
    assertElementTextContains: (selector, text) => assertElementTextContains(selector, text),
    assertsElementsTableItems: (selector, child, count) => assertsElementsTableItems(selector, child, count),
    assertElementsChildrenCountEquals: (selector, count) => assertElementsChildrenCountEquals(selector, count),
  },
});
export default postsPage;
