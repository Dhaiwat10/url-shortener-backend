const router = require('express').Router();
const utility = require('../utility');

const Url = require('../models/url.model');

router.route('/new').post((req, res) => {
    let newCode = utility.generateCode();
    
    console.log('Base URL received: ' + req.body.baseUrl);
    console.log('Created by: '+ req.body.username)
    console.log(newCode);

    let baseUrl = req.body.baseUrl;

    console.log(baseUrl.substring(0, 6));

    if(baseUrl.substring(0, 7) === 'http://') {
        let arr = baseUrl.split('');
        arr.splice(0, 7);
        console.log(arr);
        baseUrl = arr.join('');     
    }

    if(baseUrl.substring(0, 8) === 'https://') {
        let arr = baseUrl.split('');
        arr.splice(0, 8);
        console.log(arr);
        baseUrl = arr.join('');  
    }

    console.log('Modified base URl: ' + baseUrl);

    const newUrl = new Url({baseUrl: req.body.baseUrl, shortenedCode: newCode, createdBy: req.body.username});
    newUrl.save()
        .then(() => {
            console.log('New url added to db');
            res.json(newCode);
        })
        .catch((err) => {
            console.log('Error: '+ err);
            res.json('Please try again.');
        });

})

router.route('/all/:username').get((req, res) => {
    let reqUsername = req.params.username;

    Url.find({createdBy: reqUsername}, (err, foundUrls) => {
        if(!err) {
            console.log(foundUrls);
            res.json(foundUrls);
        } else
            console.log(err);
    })
})

module.exports = router;