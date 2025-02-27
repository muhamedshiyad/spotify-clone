import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        ImageUrl: {
            type: String,
            required: true
        },
        clerkId: {
            type: String,
            required: true,
            unique: true
        }
    }, 
    {timestamps: true}
);

export default mongoose.model("User", userSchema);
