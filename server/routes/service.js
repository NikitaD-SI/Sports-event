
const { response } = require("express")
const {User} = require("../config/config")
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
create:async function (data){
try{
  const checkUser = await User.findOne({
    where :{
      email:data.email
    }
  })
  if(checkUser){
    return "User Already Exist"
  }
  const response = await User.create(data)
if(response){
  return response
}else{
  return "Data Base Error"
}
}catch(error){
  throw error
}
},
login : async function (data) {
  try {
    const user = await User.findOne({
      where : {
        email: data.email
      }
    })
    if(user){
      const password_valid =await compareSync(data.password,user.password)
     if(password_valid){
      jsontoken = sign({result: data},"qwe1234",{
        expiresIn: "1h"
      })
      return {jsontoken, user}
     }else {
       return "Password Incorrect"
     }
    } else {
      return "User Not Found"
    }
  }catch(error){
    throw error
  }
}
}


