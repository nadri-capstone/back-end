const express = require('express');
const Ntest = require('../schemas/test');

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        console.log(req.body);
        res.send({'respose': 21011});
    } catch(err) {
        console.error(err);
    }
});

module.exports = router;