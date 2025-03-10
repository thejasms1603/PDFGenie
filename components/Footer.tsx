import { FileText, Github, Linkedin, Twitter } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='w-full border-t bg-gradient-to-r from-red-400 via-gray-300 to-blue-500 text-black'>
      <div className='mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {/* Branding */}
          <div>
            <div className='flex items-center space-x-2'>
              <FileText className='w-6 h-6' />
              <span className='font-bold text-xl font-mono'>PDFGenie</span>
            </div>
            <p className='mt-4 max-w-sm'>
              PDF Genie is your AI-powered document assistant, enabling seamless
              interaction with PDFs. Simply upload your PDF and start a
              conversation—get instant answers, generate summaries, and retrieve
              information in seconds
            </p>
            <div className='mt-6 flex gap-4'>
              <Button variant='ghost' size='icon' asChild>
                <Link
                  href='https://x.com/ThejasGowda03'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Twitter />
                  <span className='sr-only'>Twitter</span>
                </Link>
              </Button>
              <Button variant='ghost' size='icon'>
                <Link
                  href='https://github.com/thejasms1603'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Github />
                  <span className='sr-only'>Github</span>
                </Link>
              </Button>
              <Button variant='ghost' size='icon'>
                <Link
                  href='https://www.linkedin.com/in/thejasms1603/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Linkedin />
                  <span className='sr-only'>Linkedin</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-8 lg:col-span-2'>
            <div className='space-y-4'>
              <p>Company</p>
              <nav className='flex flex-col space-y-2'>
                <Link
                  href='/'
                  className='text-sm  hover:text-foreground'
                >
                  About
                </Link>
                <Link
                  href='/'
                  className='text-sm  hover:text-foreground'
                >
                  Pricing
                </Link>
                <Link
                  href='/'
                  className='text-sm hover:text-foreground'
                >
                  Blog
                </Link>
                <Link
                  href='/'
                  className='text-sm hover:text-foreground'
                >
                  Careers
                </Link>
              </nav>
            </div>
            <div className='space-y-4'>
              <p>Resources</p>
              <nav className='flex flex-col space-y-2'>
                <Link
                  href='/'
                  className='text-sm hover:text-foreground'
                >
                  Help Center
                </Link>
                <Link
                  href='/'
                  className='text-sm  hover:text-foreground'
                >
                  Support
                </Link>
                <Link
                  href='/'
                  className='text-sm hover:text-foreground'
                >
                  Status
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className='mt-8 border-t pt-8'>
          <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
            <p className='text-xs'>
              &copy; {new Date().getFullYear()} PDFGenie. All rights reserved.
            </p>
            <div className='flex gap-4'>
              <Button variant='ghost' size='sm' asChild>
                <Link
                  href='/'
                  className='text-xs  hover:text-foreground'
                >
                  Privacy Policy
                </Link>
              </Button>
              <Button variant='ghost' size='sm' asChild>
                <Link
                  href='/'
                  className='text-xs hover:text-foreground'
                >
                  Terms of Service
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer