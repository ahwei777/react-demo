describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.server();
    cy.route(
      'https://student-json-api.lidemy.me/posts?_sort=createdAt&_order=desc',
      [
        {
          id: 1,
          title: 'i am title',
          createdAt: 12345,
        },
      ]
    );
    cy.visit('/');
    // 找出畫面中是否真的有此元素
    cy.contains('i am title');
  });
});
