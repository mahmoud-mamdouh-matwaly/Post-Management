import postsPage from '../../fixtures/selector/posts';
import { POSTS_RESPONSE, HEAD_POSTS_COLUMNS_LIST, ROW_VALUES_LIST } from '../../fixtures/selector/samples';

const { assertions, selectors } = postsPage;

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

      it('check posts table is render with values at row', () => {
        cy.wait('@requestPosts');
        const textRowValue = [];
        assertions.assertElementsChildrenCountEquals('.ant-table-tbody > .ant-table-row', 2);

        assertions
          .assertsElementsTableItems('table', '.ant-table-tbody tr:nth-child(2) > .ant-table-cell', 3)
          .each($li => textRowValue.push($li.text()));
        cy.wrap(textRowValue).should('deep.equal', ROW_VALUES_LIST);
      });
    });
  });
});
