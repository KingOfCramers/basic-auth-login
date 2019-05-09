const joi = require("joi");

const validateBody = (schema) => { // This is essentially a controller that we pass to our route...
    return (req,res,next) => {
        const result = joi.validate(req.body, schema); // Check request against schema...
        if(result.error){
            return res.status(400).json(result.error); // Pass error if validation fails
        };

        if(!req.value){
            req.value = {};
        };
        
        req.value['body'] = result.value; // Attach our info to a new key value pair...
        next();
    }
};

const schemas = {
    authSchema: joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required()
    })
};

module.exports = {
    validateBody,
    schemas
};