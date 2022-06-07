const express = require("express");
const pSchema = require("../schemas/photo");
const tSchema = require("../schemas/tags");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const android_id = req.body.android_id;
        const result = await mongoose.model(android_id, pSchema, android_id).find({
        });

    } catch(err) {
        console.error(err);
    }
})

router.post("/", async (req, res) => {
    try{
        const android_id = req.body.android_id;
        console.log(android_id);
        await mongoose.model(android_id, pSchema, android_id).create({
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