import {
  testId,
  assertElementExistsAttr,
  assertElementNotExists,
  click,
  assertVisibleText,
  assertElementTextContains,
  assertsElementsTableItems,
  assertElementsChildrenCountEquals,
  clickElementByIndex,
  assertShouldHaveValue,
  className,
  assertElementExists,
  assertNotVisible
} from '../../utils/cypress-helpers';

const postsPage = Object.freeze({
  selectors: {
    postsPage: testId('postsPage'),
    loading: testId('loading'),
    pageTitle: testId('pageTitle'),
    viewBtn: testId('viewBtn'),
    editBtn: testId('editBtn'),
    deleteBtn: testId('deleteBtn'),
    viewModal:  testId('viewModal'),
    deleteModal:  testId('deleteModal'),
    postForm:  testId('postForm'),
    closeIconModal: className('ant-modal-close'),
    titleInput: testId('title'),
    descriptionTextarea:  testId('body'),
  },
  actions: {
    clickAction: selectors => click(selectors),
    clickSpecificElement: (selector, elementIndex) => clickElementByIndex(selector, elementIndex),
  },
  assertions: {
    assertElementIsVisible: selectors => assertElementExistsAttr(selectors),
    assertElementIsNotExist: selectors => assertElementNotExists(selectors),
    assertVisibleText: text => assertVisibleText(text),
    assertElementTextContains: (selector, text) => assertElementTextContains(selector, text),
    assertsElementsTableItems: (selector, child, count) => assertsElementsTableItems(selector, child, count),
    assertElementsChildrenCountEquals: (selector, count) => assertElementsChildrenCountEquals(selector, count),
    assertInputHaveValue: (input, value) => assertShouldHaveValue(input, value),
    assertElementIsExists: selectors => assertElementExists(selectors),
    assertNotVisible: selectors => assertNotVisible(selectors),
  },
});
export default postsPage;
