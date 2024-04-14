
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/clientPromise";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/dbConnect";

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: 'credentials',
            credentials: {
                email: {label: "email", type: "text"},
                password: {label: "password", type: "password"}
            },

            async authorize(credentials){

                await connectDB();

                if (credentials === null) return null;

                try {

                    const {email, password} = credentials;
                    const user = await User.findOne({ email: email });

                    if (user){

                        const isPasswordCorrect = await bcrypt.compare(
                            password,
                            user.password
                        );

                        if (isPasswordCorrect) {
                            return user;
                        }

                    }
                } catch (error){
                    throw new Error("Invalid Authorization!");
                }
            }
        })
    ],
    pages: {
        signIn: "/login",
        newUser: "/register",
        error: "/login",
    },

    callbacks: {
        jwt: async ({user, token}) => {

            if (user){
                token.uid = user.id;
            }
            return token;
        },

        session: async ({session, token}) => {

            if (session?.user){
                session.user.id = token.sub;
            }

            return session;
        }
    },
}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };