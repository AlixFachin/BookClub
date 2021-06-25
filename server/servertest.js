require('mocha');
const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
const SERVER_PORT = process.env.PORT || 3000;

chai.use(chaiHttp);

describe('GraphQL API Tests', () => {
  it('should fetch all books properly', async () => {
    const response = await chai
        .request(`http://localhost:${SERVER_PORT}`)
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

  it('should fetch all users properly', async () => {
    const response = await chai
        .request(`http://localhost:${SERVER_PORT}`)
        .post('/graphql?')
        .send({
          query: `{
          allUsers {
              id
              fullName
              nickName
              area
          }}`,
        });
    expect(response.status).to.equal(200);
    const allUsers = response.body.data.allUsers;
    expect(allUsers).to.be.an('array');
  });

  it('should create and retrieve a book properly', async () => {
    const response = await chai
        .request(`http://localhost:${SERVER_PORT}`)
        .post('/graphql')
        .send({
          query: `
            mutation { 
              createBook(bookData: {
              title: "Life 3.0",
              author: "Max Tegmark",
              genre: "Science",
              language: "en-us"}) {
              id
              title
              author
            }
          }`,
        });
    expect(response.status).to.equal(200);
    const newBookId = response.body.data.createBook.id;
    const createdBookResponse = await chai
        .request(`http://localhost:${SERVER_PORT}`)
        .post('/graphql?')
        .send({
          query: `{
          singleBook(bookId: ${newBookId}) {
              id
              author
              title
              genre
              language
          }}`,
        });
    expect(createdBookResponse.status).to.equal(200);
    const createdBookData = createdBookResponse.body.data.singleBook;
    expect(createdBookData.author).to.equal('Max Tegmark');
    expect(createdBookData.title).to.equal('Life 3.0');
    expect(createdBookData.genre).to.equal('Science');
    expect(createdBookData.language).to.equal('en-us');
    // Now going to book deletion
    console.log(`Going to delete book ${newBookId}`);
    const deleteResponse = await chai
        .request(`http://localhost:${SERVER_PORT}`)
        .post('/graphql')
        .send({
          query: `
            mutation { 
              deleteBook(bookId: ${newBookId}) 
          }`,
        });
    expect(deleteResponse.status).to.equal(200);
    const retrieveAfterDeleteResponse = await chai
        .request(`http://localhost:${SERVER_PORT}`)
        .post('/graphql?')
        .send({
          query: `{
          singleBook(bookId: ${newBookId}) {
              id
          }}`,
        });
    // eslint-disable-next-line no-unused-expressions
    expect(retrieveAfterDeleteResponse.body.data.singleBook).to.be.null;
  });
});
