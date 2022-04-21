import express from 'express';
import usersRouter from '../modules/users/router';
import discsRouter from '../modules/discs/router';
import {USERS_ENDPOINT} from '../modules/users/const';
import {DISCS_ENDPOINT} from '../modules/discs/const';

const router = express.Router();

router.use(USERS_ENDPOINT, usersRouter);

router.use(DISCS_ENDPOINT, discsRouter);

router.get('/', (req, res) =>
	res.send(req.__('Hello world!'))
);

export default router;
