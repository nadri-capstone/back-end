const express = require("express");
const pSchema = require("../schemas/photo");
const tSchema = require("../schemas/tags");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/", async (req, res) => {
    try{
        const UID = req.body.tname;
        console.log(UID);
        await mongoose.model(UID, testSchema, UID).create({
            id: "testing"
        });
        res.send({"respose": 21011});
    
    } catch(err) {
        console.error(err);
    }
});

module.exports = router;