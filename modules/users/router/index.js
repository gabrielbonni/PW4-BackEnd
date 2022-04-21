import { Router } from 'express';
// importando módulo body-parser para pegar dados enviados dentro do corpo da requisição.
import bodyParser from 'body-parser';
import  {register, log,update, getById, getAll,deleteAll,deleteOne} from '../controller';


const usersRouter = Router();

// configurando bodyParser
usersRouter.use(bodyParser.urlencoded({extended:false}))
usersRouter.use(bodyParser.json())

//-- rotas comuns --

usersRouter.post('/register', (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	res.json(register(password,email));
});


usersRouter.post('/login', (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	res.send(log(password,email));
});

usersRouter.post('/update', (req, res) => {
	const id = req.body.id;
	const newPassword = req.body.password;
	const newEmail = req.body.email;
	res.send(update(id,newPassword,newEmail));
});


//---rotas de teste de administradores---

usersRouter.post('/getAll', (req, res) => {
	//const adminpassword = req.body.adminpassword; 
	res.json(getAll());
});

usersRouter.post('/getOneById', (req, res) => {
	//const adminpassword = req.body.adminpassword; 
	const id = req.body.id;
	res.send(getById(id));
});

// PROVISORIO

usersRouter.post('/getOneByEmail', (req, res) => {
	//const adminpassword = req.body.adminpassword; 
	const email = req.body.email;
	res.json(getByEmail(email));
});

usersRouter.post('/deleteAll', (req, res) => {
	//const adminpassword = req.body.adminpassword; 
	res.json(deleteAll());
});

usersRouter.post('/deleteOne', (req, res) => {
	//const adminpassword = req.body.adminpassword;
	const id = req.body.id;
	res.json(deleteOne(id));
});

usersRouter.post('/deleteAll', (req, res) => {
	//const adminpassword = req.body.adminpassword; 
	const email = req.body.email;
	res.json(getByEmail(email));
});





export default usersRouter;

