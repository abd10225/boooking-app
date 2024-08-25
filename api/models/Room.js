import mongoose from "mongoose";
const {schema} = mongoose;

const RoomSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    price:{
        type: Number,
        required : true
    },
    desc:{
        type: String,
        required : true
    },
    maxPeople:{
        type: Number,
        required : true
    },
   
    roomNumbers: [{number: Number, unavailableDate: {type: [Date],default: []}}],
    

})

export default mongoose.model("Room", RoomSchema)