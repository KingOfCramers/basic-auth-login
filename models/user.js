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

const User = mongoose.model('user', userSchema);

module.exports = User;