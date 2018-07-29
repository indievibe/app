// Setting up API routes

module.exports = function(app, db) {
    app.post('/userInfo', (req, res) => {
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