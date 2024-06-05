import { MongooseModule } from '@nestjs/mongoose';

const mongoDbConfig = {
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  dbName: process.env.MONGO_DB_NAME || 'quiz',
};

const mongoDb = MongooseModule.forRoot(
  `mongodb://${mongoDbConfig.host}:${mongoDbConfig.port}/${mongoDbConfig.dbName}`,
);

export default mongoDb;
