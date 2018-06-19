var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

var app = express();

var books2;

app.use('/graphiql', (req, res, next) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("books_db");

    dbo.collection("books_db").find({}).toArray(function(err, docs) {
        books2 = docs
    });
  })
  next() //To notify that the request-response cycle is not complete
})


// Construct a schema, using GraphQL schema language
/*
var schema = buildSchema(`
  type Books {
    title: String!
    author : String!
  }

  type Query{
    allBooks : [Books]
  }
`);
*/

const typeDefs = `
  type Books { title: String, author: String }
  type Query { allBooks: [Books] }
`;

// The root provides a resolver function for each API endpoint
/*
var root = {
  allBooks: () => {
    return books2;
  },
};
*/

const resolvers = {
  Query: { allBooks: () => {return books2 } },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

/*
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,

}));

*/

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');