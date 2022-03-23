# GraphQL with Apollo server

## How run

```bash
npm install # install all dependencies
```

```bash
npm start # starts the graphql server
```

```bash
npm run json-server # starts up the json server
```

## What is GraphQL

-   Specification + query language for APIs;
-   Query runner environment.

### Schemas

Schemas are based on how data is used, not how it is stored

### Structure X Behavior

GraphQL makes a clear separation between structure and behavior.

The GraphQL structure is in the schema, in which you specify what the server is structured to do, with its types and objects

These Structure needs to be implemented in some way in order for it to work. In GraphQL this is done through what we call **resolver functions**, or just, **resolvers**. It's up to us that we implement the behavior. Each field in a GraphQL schema is implemented through a resolver.

This is where tools like Apollo come in. They serve to help us implement the GraphQL specification in our application.

### Basic GraphQL types

GraphQL has its own language, called SDL or Schema Definition Language. This is because tou can implement GraphQL in conjunction with any other language, so the SDL serves to this integration agnostically.

#### **Scalar types**

These are types that reflect of the types of data w already know, primitive. For GraphQL, these are types that are resolved on concrete data.

-   Int - integer of 32 bits
-   Float - floating-point tyoe
-   String - string in the format UTF-8
-   Boolean - boolean type
-   ID - unique identifier, typically used to find data. You can create custom scalar types.

#### **Object type**

When we work with GraphQL, the ideal is to think about the use of data, more than the way in which it is stored. With that in mind, we don't always want to return a concrete data, but rather a data set with specific properties, that is, an object.

```js
type Book {
  id: ID!
  title: String!
  author: String!
  pages: Int!
  collections: [Collection!]!
}
```

#### **Query type**

Query types define api entry points; indicate what data the customer can receive and how, in a way, they are similar to get-type requests when we work with REST, the difference here is that the customer has more liberated to assemble the queries to receive only the data they need - remembering that for GraphQL and also for the customer, no matter the origin of this data. It can come from several sources: REST Endpoints, SQL or NoSQL banks, another GraphQL server...

```js
type Query {
  books: [Book!]!
  book(id: ID!): Book!
}
```

#### **Mutation type**

Mutations are the GraphQL types used to add, change, and delete data, similar to post, PUT/PATCH, and DELETE operations developed with REST.

Query types are required in any GraphQL service, but Mutations are optional. An example of a mutation type to add a new book.

```js
type Mutation {
  addBook(title: String!, author: String!, pages: Int!, collections: Collection!): Book!
}
```

In addition to the types mentioned, GraphQL still has more basic types:

-   Enum
-   Input
-   Interface
-   Union

## Useful links

-   [Apollo server docs](https://www.apollographql.com/docs/apollo-server/)
