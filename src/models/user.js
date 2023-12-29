import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    username:{
        type: String,
        required: [true, "Username is Required!"]
    },
    email:{
        type: String,
        required : [true, "Email is Required!"]
    },
    
    password: {
        type: String,
        required: [true, "Password is Required!"]
    },
    phone:{
        type: String,
        required: [true, "Phone Number is Required!"]

    },
    // isVerfied:{
    //     type: Boolean,
    //     default: false,
    // }
});

const User = mongoose.models.users || mongoose.model('users',UserSchema);
export default User;