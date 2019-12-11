const router = require('express').Router();

const User = require('../models/user.model');

router.route('/new').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({
        username: username,
        password: password
    })

    newUser.save((err) => {
        if(err) {
            console.log(err.code);
            if (err.name === 'MongoError' && err.code === 11000)
                res.status(422).json({success: false, errCode: err.code, message: 'Duplicate username'});
        } else {
            res.json({success: true})
        }
    })
})

router.route('/auth').post((req, res) => {
    const reqUsername = req.body.username;
    const reqPass = req.body.password;

    console.log('Req received: ', req.body);

    User.findOne({username: reqUsername}, (err, foundUser) => {
        if(!err) {
            if(foundUser && foundUser.password === reqPass) {
                res.json({
                    username: foundUser.username,
                    auth: true
                })
            } else
                res.json({
                    auth: false
                })
        } else {
            res.status(400).json('Error: ' + err)
        }
    });
})

module.exports = router;