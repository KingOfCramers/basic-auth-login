const mongoose = require("mongoose");

let User;

const modelAlreadyDeclared = () => {
    try {
      mongoose.model('User')  // it throws an error if the model is still not defined
      return true
    } catch (e) {
      return false
    }
  }
  
if(!modelAlreadyDeclared()) {
    User = mongoose.model("User", {
        email: {
            type: String
        },
        password: {
            type: String
        }
    });
};  
module.exports = User;