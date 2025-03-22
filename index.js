const express = require("express")
const app = express()

const {initializeDatabase} = require("./db/db.connect")
const Event = require('./models/event.models')

app.use(express.json())

const fs = require("fs")
initializeDatabase()

// const jsonData = fs.readFileSync("eventData.json","utf-8")
// const EventData = JSON.parse(jsonData)

async function seedData(){
    try{
for(const eventData of EventData){
    const newEvent = new Event({
title: eventData.title,
type: eventData.type,
eventImgUrl : eventData.eventImgUrl,
hostedBy: eventData.hostedBy,
details: eventData.details,
dressCode: eventData.dressCode,
ageRestrictions: eventData.ageRestrictions,
eventTags : eventData.eventTags,
startingTime : eventData.startingTime,
endingTime : eventData.endingTime,
location: eventData.location,
price : eventData.price,
speakers : eventData.speakers,

    })
    await newEvent.save()
    console.log("Data seeding completed successfully.");
}
    }catch(error){
        console.log("An Error occured while seeding the data.", error)
    }
}

// seedData()

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Get all Event Data
async function readAllEvent() {
    try{
        const allReadDetails = await Event.find()
        return allReadDetails
    }catch(error){
        console.log(error)
    }
}

app.get("/events", async(req,res)=>{
    try{
        const event = await readAllEvent()
        if(event.length!=0){
            res.json(event)
        }else{
            res.status(404).json({error:"No event Found."})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch restaurants."})
    }
})


 
 

// Get event by ID
app.get("/events/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch event." });
    }
});


const PORT = 3000
app.listen(PORT,()=>{
  console.log(`Server is running on ${PORT}`)
})