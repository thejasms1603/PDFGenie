"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { FileText } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  const router = useRouter();
  return (

    <div>
      <motion.header
        className='fixed top-0 z-50 w-full p-2'
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 backdrop-blur-xl rounded-2xl bg-background/50 border border-neutral-300 dark:border-neutral-900 shadow-lg'
        >
          <div className='flex items-center h-16 justify-between'>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href='/'
                className='flex items-center space-x-1 transition-opacity hover:opacity-80'
              >
                <FileText className='w-6 h-6' />
                <span className='hidden sm:inline-block text-xl font-bold font-mono'>
                  PDFGenie
                </span>
              </Link>
            </motion.div>
            <div className='flex items-center gap-2 md:gap-4'>
              <SignedIn>
                <Button
                  variant='ghost'
                  size='sm'
                  asChild
                  className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  onClick={()=>{
                    router.push('/dashboard')
                  }}
                >
                  <Link href='/dashboard'>Dashboard</Link>
                </Button>
                
                <ThemeToggle/>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "h-8 w-8 rounded-full ring-2 ring-primary/10 transition-all hover:ring-primary/30",
                      userButtonPopover: "right-0 mt-2",
                    },
                  }}
                />
              </SignedIn>
              <SignedOut>
                <Button
                  className='dark:text-neutral-300 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition'
                  variant='ghost'
                  size='sm'
                  asChild
                >
                  <Link href='/pricing'>Pricing</Link>
                </Button>
                <Button className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'>
                  <SignInButton mode='modal'>
                    <span className='cursor-pointer'>Sign In</span>
                  </SignInButton>
                </Button>
              </SignedOut>
            </div>
          </div>
        </motion.div>
      </motion.header>
    </div>
  );
};

export default Navbar;
