const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newParking = new Schema({
    amount: {type: String},
    slot: {type: String},
    parkingStatus: {type: String}
});

const Parking = mongoose.model("Parking", newParking);

module.exports = Parking;