import { User } from "../models/user.model.js";

export const authcallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        // check if user exists
        const user = await User.findOne({ clerkId: id });

        if (user) {
            //sign in
            await User.create({
                clerkId: id,
                fullName: `${firstName || ""} ${lastName || ""}`.trim(),
                ImageUrl: imageUrl
            })
        }

        res.status(200).json({success: true});
    } catch (error) {
        console.log("Error in callback route: ", error);
       next(error);
    }
}