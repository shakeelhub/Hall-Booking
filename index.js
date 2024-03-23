const express = require("express")
const fs = require("fs")


const app = express()

const PORT = process.env.PORT || 9001

app.use(express.json())

const data = [
    {
        id:"1",
        numberOfSeats: 120,
        price: 3000,
        ifBooked:"true",
        amenities: ["chairs", " AC", "Discolights"],
        CustomerName: "Chris",
        date: "03-mar-2023",
        startTime: "20-nov-2023 at 9AM",
        endTime: "22-nov-2023 at 9PM",
        RoomName:"Duplex",
        RoomId: 108,
    },

    {
        id:"2",
        numberOfSeats: 120,
        price: 3000,
        ifBooked:"false",
        amenities: ["chairs", " AC", "Discolights"],
        CustomerName: "Scarlet",
        date: "",
        startTime: "",
        endTime: "",
        RoomName:"",
        RoomId: 109,
    },
]
//Get Hall Details

app.get("/halldetails",(req,res)=>{
    if(req.query){
        const{ifBooked} = req.query;
        console.log(ifBooked)
        let filterHall = data;
        if(ifBooked){
       filterHall = filterHall.filter((halls)=>halls.ifBooked ===ifBooked)     

        }
        res.send(filterHall)
        
    } else{
        req.send(data)
    }
    // console.log(req.query)
    // res.send(data)
})

// //Get Hall Details by ID
app.get("/halldetails/:id",(req, res)=>{

const {id} = req.params;
    console.log(id)
    const specificHall =data.find(hall=>hall.id ===id);
    res.send(specificHall)

 })

// New Hall
app.post("/halldetails/", (req, res) => {
    const newHall = {
        id: data.length+1,
        numberOfSeats: req.body.numberOfSeats,
        price: req.body.price,
        ifBooked: req.body.ifBooked,
        amenities: req.body.amenities,
        CustomerName: req.body.CustomerName,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        RoomId: req.body.RoomId,
        RoomName: req.body.RoomName
    }
    data.push(newHall)
    res.send(data)
})


app.put("/halldetails/:id", (req, res) => {
    const {id} = req.params
    const halls = data.find(hall => hall.id === id)

    if(halls.ifBooked === "true") {
        res.status(400).send("Hey the hall is already booked") 
    }

    halls.data = req.body.data
    halls.startTime = req.body.startTime
    halls.endTime = req.body.endTime
    halls.CustomerName = req.body.CustomerName
    halls.ifBooked = req.body.ifBooked
    res.status(200).send(data)
})



//starting o the port 9000
app.listen(PORT, ()=>console.log(`server started in localhost:PORT`))