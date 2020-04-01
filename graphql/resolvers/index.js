const userResolvers = require('./user');
const bookResolvers= require('./booking');
const eventResolvers = require ('./event'); 

const rootResolvers = {
    ...userResolvers,
    ...bookResolvers,
    ...eventResolvers
}

module.exports = rootResolvers ;