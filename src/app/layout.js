
import { Inter } from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import Navbar from "@/components/Navbar";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import {Toaster} from "react-hot-toast";
import AuthProvider from "@/providers/SessionProvider";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CSULB Dorm Dinning",
  description: "Find your dorm meals and reviews",
};

export default async function RootLayout({ children }) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={cn("antialiased", inter.className)}>
        <AuthProvider session={session}>
          <MaxWidthWrapper className={"max-w-screen-2xl"}>
            <main className={"relative flex flex-col min-h-screen"}>
              <Navbar />
              <div className={"flex-grow flex-1"}>
                {children}
              </div>
              {/*Footer*/}
            </main>
          </MaxWidthWrapper>
        </AuthProvider>
        <Toaster position="bottom-right"/>
      </body>
    </html>
  );
}
