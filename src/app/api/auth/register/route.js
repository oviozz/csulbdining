
import connectDB from "@/lib/dbConnect";
import User from "@/models/User";
import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";


export const POST = async (request) => {

    await connectDB();

    const {username, email, password} = await request.json();

    const existing = await User.findOne({email: email});

    if (existing) {
        return NextResponse.json({error: "Email is already in use", status: 400}, {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    try {
        await newUser.save();
        return NextResponse.json({ message: "User is created", status: 200 }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Could not create user.", status: 500 }, { status: 500 });
    }

}