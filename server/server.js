const express = require('express');
const { ApolloServer } = require('apollo-server-express'); 
const fs = require('fs');
const { GraphQLScalarType } = require('graphql');
const { Kind, parseValue } = require('graphql/language');

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        return new Date(value);
    },
    parseLiteral(ast) {
        return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
    }
});

let aboutMessage = 'Issue Tracker API v1.0';

const issuesDB = [
    {
        id: 1, status: 'New', owner: 'Ravan', effort: 5,
        created: new Date('2018-08-15'), due: undefined,
        title: 'Error in console when clicking Add'
    },
    {
        id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
        created: new Date('2018-08-16'), due: new Date('2018-08-30'),
        title: 'Missing bottom border on panel'
    }
];

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList
    },
    Mutation: {
        setAboutMessage,
        issueAdd
    },
    GraphQLDate
}; 

function issueList() {
    return issuesDB;
}

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

function issueAdd(_, { issue }) {
    issue.id = issuesDB.length + 1;
    issue.created = new Date();
    if(!issue.status) issue.status = 'New';
    issuesDB.push(issue);
    return issue;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({app, path: '/graphql'});
app.listen( 3000, () => console.log('App started on port 3000.') );