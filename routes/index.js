const express = require("express");
const pSchema = require("../schemas/photo");
const tSchema = require("../schemas/tags");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/", async (req, res) => {
    try{
        const android_ID = req.body.android_id;
        console.log(android_ID);
        await mongoose.model(android_ID, pSchema, android_ID).create({
            id: "testing",
            tags: {
                tag: "Dog", 
                odj: "20, 21"
            },
            comment: "This is Test"
        });
        res.send({"respose": 21011});
    
    } catch(err) {
        console.error(err);
    }
});

module.exports = router;