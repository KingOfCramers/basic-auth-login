const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});

userSchema.pre("save", async function(next){
    try {
        // Generate salt, and hash + salt password. Reassign hashed version before save...
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();
    } catch(err){
        next(err);
    }
});

userSchema.methods.isValidPassword = async function(password){
    try {
        let isMatch = await bcrypt.compare(password, this.password); // This.password is referring to our hashed, saved password... This returns a boolean.
        return isMatch;
    } catch(err){
        throw new Error(error);
    }
};

const User = mongoose.model('user', userSchema);

module.exports = User;