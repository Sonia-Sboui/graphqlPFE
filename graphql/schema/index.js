const {buildSchema} = require ('graphql');
module.exports = buildSchema(`
    
    type Booking {
        _id : ID!
        event : Event!
        user: User!
        createdAt : String!
        updatedAt : String!
    }

    type Event {
        _id : ID!
        titre: String!
        sujet : String!
        description : String!
        lieu : String!
        date : String!
        fraisInsc: Float!
        creator: User!
    }

    type User {
        _id: ID!
        email:String!
        password : String
        nom : String!
        prenom : String!
        nationalite : String!
        civilite : String!
        telFixe : Int
        telMobile : Int!
        createdEvent : [Event!]
      
    }

    type AuthLogin {
        userId : ID!
        token : String!
        expirationToken : Int!
    }

    input EventInput {
        titre: String!
        sujet : String!
        description : String!
        lieu : String!
        date : String!
        fraisInsc: Float!   
    }

    input UserInput{
        email:String!
        password : String!
        nom : String!
        prenom : String!
        nationalite : String!
        civilite : String!
        telFixe : Int
        telMobile : Int!
    }
    type RootQuery{
        events : [Event!]!
        bookings : [Booking!]!
        login(email:String!,password:String!):AuthLogin!
   }
   type RootMutation{
        createEvent (eventInput : EventInput):Event
        createUser (userInput : UserInput) : User
        bookEvent (eventId : ID!): Booking!
        cancelBooking(bookingId : ID!) : Event !
   }

   schema{
       query: RootQuery
       mutation: RootMutation
   }
    `)