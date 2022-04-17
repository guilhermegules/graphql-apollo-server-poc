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

## Resolvers

Resolvers have four parameters

- `root or parent`: the result of the call at the previous "level" of the query
- `args`: the arguments that the resolver can receive from the query, for example the data for a new User or an ID
- `context`: an object with the context for GraphQL, such as data about the connection, user permissions, etc
- `info`: the tree representation of the query or mutation

## Standards and patterns

### Good scenarios for GraphQL

- When development needs to be flexible enough for products that change very fast, they are in the development phase and with many different features to be tested. If your API only has one endpoint (or a few) or the product is not at that stage, REST remains a good option;
- GraphQL is about optimizing requisitions and queries, decreasing the amount of requests and avoiding the over-fetching or under-fetching problems that are common in REST, when a single request or brings a lot of data that is not needed, or does not bring enough data;
- GraphQL is a specification and you can use the libraries or platforms you want to help with implementation; but GraphQL would also work without them. Apollo is one of those platforms to develop in GraphQL with NodeJS, but there are several others focused on other languages, such as Graphene for Python.
- GraphQL makes development more agile by avoiding api adjustments by the backend for each new functionality that will be implemented; for example, decreases the need to create specific endpoints for a given feature;
- The schema makes monitoring resources easier, and from it the documentation is generated automatically, which makes working on teams easier.

**It is worth noting other points of creating a GraphQL API:**

- The schema greatly reduces the complexity of adding new API types and fields (more on this in the "versioning" topic below). However, changes that may break requests are not recommended, such as:
  - Rename a field;
  - Modify the arguments of a field, or make them mandatory;
  - Make a field non-null.

**However, you can depreciate these fields:**.

- It's perfectly OK to create types that don't exactly reflect the structure of the database (although the trend is that the API has a different data structure than the database structure as it evolves). Each type must represent an object with data that clients can consume;
- IDs are "anti-patterns" in GraphQL; you should always work with the reference object;
- It is advisable that Mutations have an error handling that passes clear information to the customer.

### Good practices

- **HTTP:** GraphQL typically uses the HTTP protocol to expose all API resources across a single endpoint, and all requests use POST-including query resources. Unlike REST, which is composed of a series of endpoints, each exposing a single API resource. You can use GraphQL to expose resources on more than one endpoint, but this is not a common practice, and it makes it difficult to use tools such as the playground—which despite the name is very important for accessing API documentation;
- **JSON:** With GraphQL, data is typically returned in JSON format, although this is not required according to the [GraphQL specification](http://spec.graphql.org/draft/#sec-Serialization-Format). JSON is a very familiar notation in web development, both for those who develop APIs and for customers, and it is easy to read. For performance reasons, it is recommended to use compression with GZIP and send requests with the `header` `accept-encoding: gzip`;
- **Versioning:** Although nothing prevents the versioning of a GraphQL API, similar to versioning the REST APIs, this is not a best practice. Instead, a continuous evolution of the schema is encouraged:
  - Versioning APIs is ultimately necessary because in the REST model any change in the data returned by the API can be considered a considerable change, and considerable changes require a new version. So since a new version becomes necessary every time new features are added to the API, we have a counterpoint between releasing new versions with frequent incremental modifications versus readability and API maintenance. _It is important to note here that comparison is being made between GraphQL and REST APIs focused solely on CRUD operations, without considering more complex RESTful APIs_;
  - In the case of GraphQL, because only data that is explicitly requested is returned, you can add new types and fields to the schema, including new fields in existing types, without "breaking" the API. For this reason, the practice of non-versioning of GraphQL APIs has been established. In addition, it is possible to monitor when an attribute is no longer being used by the front end and when it can be removed from the schema.
- **Type NULL:** By default, in GraphQL all fields of a type can be null, unless explicitly indicated. This is because in a service such as a GraphQL API there are several tips that can fail: the connection to the bank, an asynchronous action that failed, among other factors:
  - In this way, for GraphQL it is preferable that a field can return null than the request to fail. Instead, the `!` modifier is used to mark a field as 'not null';
  - When we create the schema, it is important to keep in mind when a field can return null in case of failure, and when it must return an error;
  - More about null and non-null fields in this link from [GraphQL documentation](https://graphql.org/learn/schema/#lists-and-non-null).

## Useful links

- [Apollo server docs](https://www.apollographql.com/docs/apollo-server/)
- [SQL Data Source with Apollo Server](https://github.com/cvburgess/SQLDataSource)
- [Mongo Data Source with Apollo Server](https://github.com/GraphQLGuide/apollo-datasource-mongodb/)
- [GraphQL Data Source with Apollo Server](https://github.com/poetic/apollo-datasource-graphql)
- [A Deep Dive on Apollo Data Source](https://www.apollographql.com/blog/backend/data-sources/a-deep-dive-on-apollo-data-sources/)
- [GraphQL Best Practices Resources and Design Patterns](https://www.moesif.com/blog/api-guide/graphql-best-practices-resources-and-design-patterns/)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
