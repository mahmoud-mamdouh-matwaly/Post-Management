import postsPage from '../../fixtures/selector/posts';
import {
  POSTS_RESPONSE,
  HEAD_POSTS_COLUMNS_LIST,
  ROW_VALUES_LIST,
  LIST_OF_LABEL_NAME,
} from '../../fixtures/selector/samples';

const { assertions, selectors, actions } = postsPage;

describe('Posts Page', () => {
  beforeEach(() => {
    cy.visit('/posts-management');
  });
  describe('Check posts page is render', () => {
    it('check page heading is render with action buttons', () => {
      assertions.assertElementIsVisible(selectors?.pageTitle);
      assertions.assertElementTextContains(selectors?.pageTitle, 'Posts');
    });

    describe('Check error message is render', () => {
      before(() => {
        cy.intercept('GET', '**/posts', req => {
          req.reply({
            delay: 10,
            statusCode: 500,
            body: { error: true, code: 500, message: 'Request failed with status code 500' },
          });
        }).as('postsRequestWithError');
      });

      it('check request with wrong message is visible', () => {
        cy.wait('@postsRequestWithError');

        assertions.assertVisibleText('Request failed with status code 500');
      });
    });

    describe('Request to get posts and check render data', () => {
      beforeEach(() => {
        cy.intercept('GET', '**/posts', POSTS_RESPONSE).as('requestPosts');
      });

      it('check posts table is render with columns and title table', () => {
        cy.wait('@requestPosts');
        const textColumnsHead = [];

        assertions
          .assertsElementsTableItems('table', '.ant-table-thead > tr > th', 3)
          .each($li => textColumnsHead.push($li.text()));
        cy.wrap(textColumnsHead).should('deep.equal', HEAD_POSTS_COLUMNS_LIST);
      });

      it('check posts table is render with values at row and actions', () => {
        cy.wait('@requestPosts');
        const textRowValue = [];
        assertions.assertElementsChildrenCountEquals('.ant-table-tbody > .ant-table-row', 2);
        assertions.assertElementIsVisible(selectors?.deleteBtn);
        assertions.assertElementIsVisible(selectors?.editBtn);
        assertions.assertElementIsVisible(selectors?.viewBtn);
        assertions
          .assertsElementsTableItems('table', '.ant-table-tbody tr:nth-child(2) > .ant-table-cell', 3)
          .each($li => textRowValue.push($li.text()));
        cy.wrap(textRowValue).should('deep.equal', ROW_VALUES_LIST);
      });
      describe('Check view modal is visible when click view button', () => {
        beforeEach(() => {
          actions.clickSpecificElement(selectors.viewBtn, 0);
          assertions.assertElementIsVisible(selectors?.viewModal);
        });

        describe('Check view modal is have data and close it', () => {
          it('check all label is render with correct label name', () => {
            const labelNames = [];

            cy.get(selectors.postForm)
              .find('label')
              .each($input => {
                labelNames.push($input.attr('title'));
              });
            cy.wrap(labelNames).should('deep.equal', LIST_OF_LABEL_NAME);
          });

          it('check all input is render with correct name attribute', () => {
            assertions.assertElementIsVisible(selectors.titleInput);
            assertions.assertElementIsVisible(selectors.descriptionTextarea);
          });

          it('view modal should have values', () => {
            assertions.assertInputHaveValue(selectors.titleInput, 'new post');
            assertions.assertInputHaveValue(selectors.descriptionTextarea, 'new Description');
          });

          it('click close icon should modal not visible', () => {
            assertions.assertElementIsExists(selectors?.closeIconModal);
            actions.clickAction(selectors?.closeIconModal);
            assertions.assertNotVisible(selectors?.viewModal);
          });
        });
      });
    });
  });
});
