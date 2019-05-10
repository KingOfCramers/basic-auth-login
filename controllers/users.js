const JWT = require("jsonwebtoken");
const User = require("../models/User");

const signToken = user => {
    return JWT.sign({
        iss: 'dcdocsapp',
        sub: user.id, // The id from our mongoose database, to keep this unique...
        iat: new Date().getTime(), // Date of creation...
        exp: new Date().setDate(new Date().getDate() + 1) // Current time + 1 day ahead...
    }, process.env.COOKIE_ENCODE_KEY);
};

module.exports = {
    signUp: async (req,res,next) => {

        const { email, password } = req.value.body;
        const foundUser = await User.findOne({ email });
        if(foundUser){ 
            return res.status(403).send({ error: "Email is already in use."}); // Must return to end execution of code!
        }

        const newUser = new User({ email, password });
        await newUser.save();
        const token = signToken(newUser);

        res.json({ token });
    
    },
    signIn:  (req,res,next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    secret: async (req,res,next) => {
        res.send("YOU MADE IT!")
    },
    faraToggle: async (req,res) => {
        try{
            await User.updateOne({ _id: req.params.id }, { fara: req.body.fara });
            res.status(200).send()
        } catch(err){
            res.status(500).send({
                message: err.message || "Some error occured while trying to update user data."
            });
        }
        },
    senatorsToggle: async (req,res) => {
        try{
            await User.updateOne({ _id: req.params.id }, { senators: req.body.senators });
            res.status(200).send()
        } catch(err){
            res.status(500).send({
                message: err.message || "Some error occured while trying to update user data."
            });
        }
    },
    senateCandidatesToggle: async (req,res) => {
        try{
            await User.updateOne({ _id: req.params.id }, { senateCandidates: req.body.senateCandidates });
            res.status(200).send()
        } catch(err){
            res.status(500).send({
                message: err.message || "Some error occured while trying to update user data."
            });
        }
    }
};