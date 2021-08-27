
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import campfireRoutes from './routes/campfire.js';
import memberRoutes from './routes/member.js';
import baseRoute from './routes/base.js';
import { errorHandler } from './controllers/error.js';

dotenv.config();
const { DB_CONN, DB_USER, DB_PW } = process.env;

const app = express();

const corsOptions = {
	origin: 'http://localhost:3000'
};


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
app.use(cors(corsOptions));

app.use('/api', baseRoute);
app.use('/api', campfireRoutes);
app.use('/api', memberRoutes);

app.use((req, res, next) => {
	const error = new Error('Not Found!');
	error.status = 404;
	next(error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect(DB_CONN, { auth: { user: DB_USER, password: DB_PW  }, dbName: 'gt-campfire', useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, () => console.log(PORT, 'Successfully connected to db!')))
	.catch(error => console.log(error.message));

mongoose.set('useFindAndModify', false);
