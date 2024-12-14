import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const registerGento = new Schema({
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true,
        // validate: {
        //     validator: v => {
        //         return validator.isEmail(v)
        //     },
        //     message: props => `${props.value} is not a valid email address.`
        // }
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: [8, "The password must have at least 6 characters "],
        max: [8, "The password can not execeed 30 characters "],
        validate: {
            validator: v => {
                const specticalCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
                return specticalCharacter.test(v)
            },
            message: props => `${props.value} must contain  at least one special character `
        }
    }
})

const gentoModel = mongoose.model("gentoUser", registerGento)

export default gentoModel;
