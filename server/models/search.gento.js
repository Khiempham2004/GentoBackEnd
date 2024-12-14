import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const searchGento = new Schema({
    name: {
        type: String,
        require: true
    },
    desription: String,
    category: {
        type: String,
        require: true,
    },
    price: Number,
    brand: String,
    createAt: {
        type: String,
        default: Date.now,
    },

})

const searchSchema = mongoose.model('searchGento ', searchGento);
export default searchSchema;