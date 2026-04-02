import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: number;
  date: string;
};

let tasks: Task[] = [
  {
    id: '1',
    title: 'Помыть посуду',
    description: 'Загрузить посудомойку',
    completed: false,
    priority: 2,
    date: '2026-03-20', 
  },
  {
    id: '2',
    title: 'Получасовая прогулка',
    description: 'Погулять немного',
    completed: false,
    priority: 3,
    date: '2026-03-25',
  },
];

const typeDefs = `#graphql
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    priority: Int!
    date: String!
  }

  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    addTask(title: String!, description: String, priority: Int!, date: String!): Task!
    toggleTask(id: ID!): Task!
    deleteTask(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    tasks: () => tasks,
  },

  Mutation: {
    addTask: (_: any, args: any) => {
      const newTask: Task = {
        id: Date.now().toString(),
        completed: false,
        ...args,
      };
      tasks.push(newTask);
      return newTask;
    },

    toggleTask: (_: any, { id }: { id: string }) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) throw new Error('Task not found');

      task.completed = !task.completed;
      return task;
    },

    deleteTask: (_: any, { id }: { id: string }) => {
      tasks = tasks.filter((t) => t.id !== id);
      return true;
    },
  },
};

async function start() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
}

start();
