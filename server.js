import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import i18n from 'i18n';
import {BASE_API_ENDPOINT} from './const';
import {PORT} from './const/env';
//import './database';
import router from './router/index';

i18n.configure({
	locales: ['en', 'pt-BR', 'pt'],
	directory: __dirname + '/locales'
});

const app = express();

app.use(cors());

app.use(helmet());

app.use(i18n.init);

app.use(BASE_API_ENDPOINT, router);

app.listen(PORT, () =>
	console.log(`Server running on port ${PORT}`)
);
