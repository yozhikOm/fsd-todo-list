export const typeDefs = `#graphql
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    priority: Int!
    date: String
  }

  type Query {
    tasks: [Task!]!
    task(id: ID!): Task
    tasksByCompleted(completed: Boolean!): [Task!]!
    tasksToday: [Task!]!
  }

  type Mutation {
    addTask(title: String!, description: String, priority: Int!, date: String): Task!
    editTask(id: ID!, title: String!, description: String, priority: Int!, date: String): Task!
    toggleTask(id: ID!): Task!
    deleteTask(id: ID!): Boolean!
  }
`;