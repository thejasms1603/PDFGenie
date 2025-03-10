"use client";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { ArrowRight, Sparkle } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FileUploader from "./FileUploader";
const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className='w-full min-h-screen bg-gradient-to-r from-red-400 via-gray-300 to-blue-500'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black'
        >
          <div className='flex flex-col items-center text-center justify-between'>
            <div className='flex flex-col items-center'>
              <h1 className='font-semibold text-4xl mr-3'>PDF Genie</h1>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className='mt-2 text-md font-medium rounded-full border px-2 flex items-center gap-2'
              >
                <Sparkle className='size-4' />
                AI powered chat conversations
              </motion.span>
              <p className='m-1 tracking-tighter text-lg text-slate-600'>
                Join millions of students, researchers and professionals to
                instantly answer questions and understand research with AI
              </p>
            </div>
            <div className='flex mt-4'>
              <SignedOut>
                <Button
                  asChild
                  className='group relative px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1'
                >
                  <SignInButton mode='modal'>
                    <span className='flex items-center'>
                      Start Conversations Now
                      <ArrowRight className='ml-2 group-hover:translate-x-1 transition-transform' />
                    </span>
                  </SignInButton>
                </Button>
              </SignedOut>
              <SignedIn>
                <FileUploader />
              </SignedIn>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
