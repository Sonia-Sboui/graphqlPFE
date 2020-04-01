const bcrypt = require ('bcryptjs');
const User = require ('../../models/user');
const jwt = require ('jsonwebtoken');


module.exports = {
    createUser :async args =>{
        try{
       const existingUser= await User.findOne({email:args.userInput.email});
            if (existingUser){
                throw new Error ('user exists already!');
            }
           const hashedPassword= await bcrypt.hash(args.userInput.password,12);
            const user = new User({
                email:args.userInput.email,
                password:hashedPassword,
                nom : args.userInput.nom,
                prenom:args.userInput.prenom,
                nationalite:args.userInput.nationalite,
                civilite:args.userInput.civilite,
                telFixe:args.userInput.telFixe,
                telMobile:args.userInput.telMobile
            });
           const result = await user.save();
            return {...result._doc, password:null, _id:result.id}
        }catch(err)
        {
            throw err;
        }
        
    },

    login : async ({email,password}) =>{
        const user = await User.findOne({email:email});
        if (!user){
            throw new Error ('user does not exist!!')
        }
        const comparePwd = await bcrypt.compare(password,user.password);
        if (!comparePwd){
            throw new Error ('password is incorrect');
        }
const token  = jwt.sign({userId : user.id,email : user.email},'supersecretkey',{ expiresIn :'1h'})
        return {userId : user.id , token : token , expirationToken:1}
    }
};