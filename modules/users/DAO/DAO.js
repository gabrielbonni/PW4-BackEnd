import mongoose from '../../../database/index';
import userSchema from './Schema';
var User = mongoose.model('User', userSchema);

function create(json){

    var newUser = new User(json);
    var response = "error";

    newUser.save(function (error){
        if(error){
            response = error;
        }
        else{
            console.log("User created");
            console.log(newUser._id);
            response = newUser._id;
        }
    });
    return response;  
}

function findAll(){

    var response = "error";

    User.find({}).lean().exec(function(error,result){
        if(error){
            response = error;
        }
        else{
            console.log(result);
            response = result;
        }
    });
    return response;
    
}

function findByEmail(email){
    var response = null;

    User.find({email: email}).lean().exec(function(error,result){
        if(error){
            reponse = error;
        }
        else{
            if(result.length == 0){
                response = null;
            }
            console.log(result[0]);
            response = result[0]; // sempre possuirá só um elemento, pois não permito ele possuir 2 emails iguais.
           
        }
    });
    return response;
}

function emailExists(email){
    var response = null;

    User.find({email: email}).lean().exec(function(error,result){
        if(error){
            response = error;
        }
        else{
            //console.log("result = "+result);
            //console.log("result.length = "+result.length);
            if(result.length == 0){
                response = false;
            }
            response = true;
           
        }
    });
    return response;
}


function findById(id){
    var response = "error";

    User.findById(id).lean().exec(function(error,result){
        if(error){
            response = error;
        }
        else{
            console.log(result);
            response = result;
        }
    });
    return response;
}

function deleteAll(){
    var response = "error";

    User.deleteMany({},function (error){
        if(error){
            response = error;
        }
        else{
            console.log("All Users removed");
        }
    });
    return response;
}

function deleteOne(id){
    var response = "error";

    User.deleteOne({_id:id},function (error){
        if(error){
            response = error;
        }
        else{
            console.log(".."); 
        }
    });
    var response = "error";

}

module.exports = {create,findAll,findByEmail,emailExists,findById,deleteAll,deleteOne}
