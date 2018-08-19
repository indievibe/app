const userRoutes = require('./user_routes');

// Index for setting up API routes
module.exports = function(app, db) {
    userRoutes(app, db);
    //possible future routes here later
}