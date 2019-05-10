const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    method: {
      type: String,
      enum: ['local', 'google', 'facebook'], // Only allow these types of logins.
      required: true
    },
    local: {
      email: {
        type: String,
        lowercase: true
      },
      password: {
          type: String
      },
    },
    google: {
      id: {
        type: String
      },
      email: {
        type: String,
        lowercase: true
      }
    },
    facebook: {
      id: {
        type: String
      },
      email: {
        type: String,
        lowercase: true
      }
    }
});

userSchema.pre("save", async function(next){
    try {
        if(this.method !== 'local'){
            next();
        }
        // Generate salt, and hash + salt password. Reassign hashed version before save...
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        this.local.password = passwordHash;
        next();
    } catch(err){
        next(err);
    }
});

userSchema.methods.isValidPassword = async function(password){
    try {
        let isMatch = await bcrypt.compare(password, this.local.password); // This.password is referring to our hashed, saved password... This returns a boolean.
        return isMatch;
    } catch(err){
        throw new Error(error);
    }
};

const User = mongoose.model('user', userSchema);

module.exports = User;