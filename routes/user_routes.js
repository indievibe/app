// Setting up API routes

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
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