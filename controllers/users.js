const User = require("../models/user");

module.exports = {
    signUp: async (req,res,next) => {

        const { email, password } = req.value.body;
        const foundUser = await User.findOne({ email });
        if(foundUser){ 
            return res.status(403).send({ error: "Email is already in use."}); // Must return to end execution of code!
        }

        const newUser = new User({ email, password });
        await newUser.save();
        res.json({ user: 'Created '});
    
    },
    signIn: async (req,res,next) => {
        // Generate token...
        console.log('UsersController.signIn() called!')
    },
    secret: async (req,res,next) => {
        console.log('UsersController.secret() called!')
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