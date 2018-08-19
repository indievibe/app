// Setting up API routes

var ObjectID = require('mongodb').ObjectID;

// Setup CRUD operation on the API
module.exports = function(app, db) {
    // Update operation
    // Alter for proper user once implemented
    app.put('/users/:id', (req, res) => {
        const id = req.params.id;
        const userDetails = { '_id': new ObjectID(id) };
        const user = { location: req.body.location, userName: req.body.userName };
        db.collection('users').update(userDetails, user, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(user);
          } 
        });
      });
    
    // Delete operation
    // Maybe update for deleting more then one?
    app.delete('/users/:id', (req, res) => {
        const id = req.params.id;
        const userDetails = { '_id': new ObjectID(id) };
        db.collection('users').remove(userDetails, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('User ' + id + ' deleted!');
          } 
        });
      });

      // Read operation
      // Update for full user once implemented
      // Think of variations for future implementations, i.e. getAll, getUserName, etc...
    app.get('/users/:id', (req, res) => {
        const id = req.params.id;
        const userDetails = { '_id': new ObjectID(id) }
        db.collection('users').findOne(userDetails, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    // Create operation
    // Need to alter for final create with proper user
    app.post('/users', (req, res) => {
        // To-do of setting up calls for getting the user's info
        // testing for now
        const user = { location: req.body.location, userName: req.body.userName };
        db.collection('users').insert(user, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
}