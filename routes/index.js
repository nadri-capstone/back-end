const express = require("express");
const pSchema = require("../schemas/photo");
const tSchema = require("../schemas/tags");
const aSchema = require("../schemas/album");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/:id/:title", async (req, res) => {
    try{
        const android_id = req.params.id;

        console.log(req);

        /*
        var datetime1 = new Date(req.params.date);
        var datetime2 = new Date(req.params.date);
        datetime1.setHours(9);
        datetime2.setHours(9);
        datetime2.setDate(datetime1.getDate() + 1);
        console.log(datetime1, datetime2);
        */

        const result = await mongoose.model(android_id, pSchema, android_id).find({
            pages : { $elemMatch: { album : req.params.title }}
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
        const deletedList = req.body.deletedList;
        var resJson = new Array();

        //사진 삭제
        for(idx in deletedList){
            await mongoose.model(android_id, pSchema, android_id).deleteOne({
                _id: deletedList._id,
            })
        }
        
        //사진 저장 및 수정
        for(idx in photos){
            console.log(idx, ": ", photos[idx]);
            const photo = photos[idx];

            if(photo._id) {
                var result = await mongoose.model(android_id, pSchema, android_id).updateOne({
                    _id: photo._id 
                }, {
                    comment: photo.comment,
                    pages: photo.pages,
                    pageOrder: photo.pageOrder,
                    layoutOrder: photo.layoutOrder,
                });
                console.log("result: ", result);
                resJson.push(photo);
            }
            else {
                var datetime; 
                try {
                    datetime = new Date(photo.datetime);
                } catch (error) {
                    console.log(error);
                };

                var result = await mongoose.model(android_id, pSchema, android_id).create({
                    uri: photo.uri,
                    datetime: datetime,
                    location: photo.location,
                    comment: photo.comment,
                    pages: photo.pages,
                    pageOrder: photo.pageOrder,
                    layoutOrder: photo.layoutOrder,
                });
                console.log("result: ", result);
                resJson.push(result);
            }
        };

        res.json({"resJson": resJson});
    
    } catch(err) {
        console.error(err);
    }
});

module.exports = router;
