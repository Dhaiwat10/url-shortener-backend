const router = require('express').Router();

const Url = require('../models/url.model');

router.route('/:code').get((req, res) => {
    let reqCode = req.params.code;

    Url.findOne({shortenedCode: reqCode}, (err, foundUrl) => {
        if(!err && foundUrl) {
            res.redirect('http://' + foundUrl.baseUrl);
        } else {
            res.status(404).json({message: 'Requested page not found.'});
        }
    })
})

module.exports = router;