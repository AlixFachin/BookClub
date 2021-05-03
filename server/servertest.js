require('mocha');
const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('GraphQL API Tests', () => {
  it('should fetch all books properly', async () => {
    const response = await chai
        .request('http://localhost:3000')
        .post('/graphql?')
        .send({
          query: `{
          allBooks {
              id
              title
              author
              genre
          }}`,
        });
    expect(response.status).to.equal(200);
    const allBooks = response.body.data.allBooks;
    expect(allBooks).to.be.an('array');
  });
});
