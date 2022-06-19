const express = require("express");
const pSchema = require("../schemas/photo");
const tSchema = require("../schemas/tags");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/:id", async (req, res) => {
    try{
        const android_id = req.params.id;
        console.log(android_id);
        const result = await mongoose.model(android_id, pSchema, android_id).find({});
        console.log(typeof(android_id));
        res.json(result);

    } catch(err) {
        console.error(err);
    }
})

router.post("/:id", async (req, res) => {
    try{
        const android_id = req.params.id;
        console.log(android_id);
        var body = req.body;
        console.log(body);
        body.forEach(photo =>
            console.log(photo));
        await mongoose.model(android_id, pSchema, android_id).create({
            datetime: Date(body.datetime),
            location: body.location,
        });
        res.send([{"respose": "isSuccess"}]);
    
    } catch(err) {
        console.error(err);
    }
});

module.exports = router;
