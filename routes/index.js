const express = require("express");
const pSchema = require("../schemas/photo");
const tSchema = require("../schemas/tags");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/:id/:date", async (req, res) => {
    try{
        const android_id = req.params.id;
        console.log(android_id);
        var datetime1 = new Date(req.params.date);
        var datetime2 = new Date(req.params.date);
        datetime2.setDate(datetime1.getDate() + 1);
        console.log(datetime1, datetime2);
        const result = await mongoose.model(android_id, pSchema, android_id).find({
            datetime : {$gte: datetime1, $lte: datetime2}
        });
        console.log(result);
        res.json(result);

    } catch(err) {
        console.error(err);
    }
})

router.post("/:id", async (req, res) => {
    try{
        const android_id = req.params.id;
        console.log(android_id);
        
        console.log(req.body);

        //사진들
        const photos = req.body.photos;

        //저장여부
        var existed = req.body.existed;
        existed = existed.slice(1, -1);
        existed = existed.split(', ');
        console.log(existed);
        
        //사진 저장
        for(idx in photos){
            console.log(photos[idx], existed[idx]);
            const photo = photos[idx];
            if(existed[idx] == "false"){
                await mongoose.model(android_id, pSchema, android_id).create({
                    id: photo.id,
                    datetime: Date(photo.datetime),
                    location: photo.location,
                });
            }
        };

        res.send({"respose": "isSuccess"});
    
    } catch(err) {
        console.error(err);
    }
});

module.exports = router;
