import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tasks_db';
const PORT = parseInt(process.env.PORT || '4000');

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB');

    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function start() {
  await connectToDatabase();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Добавляем подробное логирование ошибок в development
    formatError: (formattedError) => {
      console.error('GraphQL Error:', formattedError);
      return formattedError;
    },
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`🚀 Server ready at ${url}`);

  // Graceful shutdown
  // process.on('SIGINT', async () => {
  //   console.log('Shutting down gracefully...');
  //   await mongoose.disconnect();
  //   console.log('Disconnected from MongoDB');
  //   process.exit(0);
  // });
  const gracefulShutdown = async (signal: string) => {
    console.log(`🛑 Received ${signal}, shutting down gracefully...`);
    await server.stop();
    await mongoose.disconnect();
    console.log('✅ Server stopped and disconnected from MongoDB');
    process.exit(0);
  };
  
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
}

start().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});;
