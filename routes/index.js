const express = require("express");
const pSchema = require("../schemas/photo");
const tSchema = require("../schemas/tags");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/:id", async (req, res) => {
    try{
        const android_id = req.params.id;
        console.log(android_id);
        const result = await mongoose.model("android", pSchema, "android").find({});
        console.log(typeof(android_id));
        res.json(result);

    } catch(err) {
        console.error(err);
    }
})

router.post("/", async (req, res) => {
    try{
        const android_id = req.body.android_id;
        console.log(android_id);
        const time_data = req.body.time_data;
        await mongoose.model("android", pSchema, "android").create({
            id: "testing",
            data: Date(req.body.time_data),
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