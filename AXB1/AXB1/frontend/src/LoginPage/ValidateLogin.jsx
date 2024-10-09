import React from "react";

let padrao = {
    email: 'admin@gmail.com',
    password: 'admin'
}

function ValidateLogin(email,password) {
    console.log(email,password);
  if (email === padrao.email && password === padrao.password){
    alert("Validado")
    return(
        true
    )
  }

  return (
    false
  );
}

export default ValidateLogin;
