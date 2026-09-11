import mongoose from 'mongoose';

// Disable command buffering so queries fail-fast (0ms lag) when DB is offline/unreachable
mongoose.set('bufferCommands', false);

export const isDbConnected = () => mongoose.connection.readyState === 1;

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.log('[DB Engine] Running fast in-memory storage engine.');
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 1500,
      connectTimeoutMS: 1500
    });
    console.log(`[DB Engine] MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`[DB Engine] MongoDB disconnected (${error.message}). Running fast in-memory storage engine.`);
  }
};

