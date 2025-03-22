const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: [String],
            required: true,
            enum: ["Online", "Offline", "Both"],
        },
        eventImgUrl: {
            type: String,
            required: true,
        },
        hostedBy: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
        dressCode: {
            type: String,
        },
        ageRestrictions: {
            type: String,
        },
        eventTags: [
            {
                type: String,
            },
        ],
        startingTime: {
            type: String,
            required: true,
        },
        endingTime: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        speakers: [
            {
                name: { type: String, required: true },
                title: { type: String, required:true },
                imgUrl:{type:String ,required:true}
            }
            
          ],
    },

    { timestamps:true }
);

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
