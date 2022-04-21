import DAO from '../DAO/DAO';

const crypto = require('crypto')


// funções usadas na aplicação

function register(password, email){
    //console.log(DAO.emailExists(email));
    if(!DAO.emailExists(email)){
        const newUser = {
            'email':email,
            'password':returnHash(password),
        }
        return DAO.create(newUser);
     }
    return "Email already exists";
}


function log(password, email){
    const user = DAO.findByEmail(email);
    if(user){
        if(user.password == returnHash(password)){
            return true;
        }
    }
    return "Invalid Email or Invalid Password";
}

function update(id, newPassword, newEmail){
    const user = DAO.findById(id);
    if(user){
        if(!DAO.emailExists(newEmail)){
            user.email = newEmail;
            user.password = returnHash(newPassword);
            return (DAO.update());
        }
        return "Email already exists";
    }
    return "Id not found";
}


// ----------------------------------------------


// -----Funções testes do administrador---
function getById (id){
   return DAO.findById(id);
}



function getAll(){
    return DAO.findAll();
}

function deleteAll(){
   return DAO.deleteAll();
}

function deleteOne(id){
    return DAO.deleteOne(id);
}

// -------------------------------------------



// -----Funções usadas dentro de outras funções----
function returnHash(password){
    let hash = crypto.createHash('md5').update(password).digest("hex");
    return hash;
}

//--------------------------------------

export {register, log,update, getById, getAll,deleteAll,deleteOne} ;


