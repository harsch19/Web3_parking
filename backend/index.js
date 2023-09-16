const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Parking = require("./models/ParkingModel.js");

const app = express();
const PORT = process.env.PORT || 5000;
const uri = "mongodb+srv://pranav21:pranav432@cluster0.ggr9g.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors());

mongoose.connect(uri)
.then(() => {
    console.log("Successfully connected to MongoDB Atlas");
})
.catch((err) => {
    console.log(err);
});

app.get("/getParkingDetails", (req, res) => {
    Parking.find()
    .then((doc) => {
        res.send(doc);
    })
    .catch((err) => {
        console.log(err);
    })
})

app.post("/bookParkingSlot", (req, res) => {
    const slot = req.body.slot;
    const parkingStatus = req.body.parkingStatus;

    Parking.create({
        amount: "0.005 ETH",
        slot: slot,
        parkingStatus: parkingStatus,
    })
    .then((response) => {
        res.status(200).json(response);
    })
})

app.get("/", (req, res) => {
    res.send("Blockchain Parking Manager");
})

app.listen(PORT, () => {
    console.log(`Server is listening on the port: ${PORT}`);
})