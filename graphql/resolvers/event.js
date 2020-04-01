const Event = require ('../../models/event');
const {transformEvent} = require ('../resolvers/merge');
const User = require ('../../models/user');

module.exports = {
    events:async () => {
        try {
        const events = await Event.find();
            return events.map(event=>{
                return transformEvent(event);
            })
        } catch (err){
            throw err;
        }
    },

    createEvent :async (args,req) =>{
        if(!req.auth){
            throw new Error ('Unauthenticated!!');
        }
       const event = new Event({
           titre : args.eventInput.titre,
           sujet : args.eventInput.sujet,
           description : args.eventInput.description,
           lieu : args.eventInput.lieu,
           date : new Date(args.eventInput.date),
           fraisInsc : +args.eventInput.fraisInsc,
           creator : req.userId
       });
       let createdEvent;
       try{
       const result = await event.save();
           createdEvent = transformEvent(result);
        const creatorUser = await User.findById(req.userId);
           if (!creatorUser){
               throw new Error('user not exists!!!')
           }
           creatorUser.createdEvent.push(event);
           await creatorUser.save();
            return createdEvent;
       }catch (err){
           console.log(err)
           throw err;
       };
    }
};