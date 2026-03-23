import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KodLearn LMS | Premium Learn',
  description: 'A premium learning management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen text-white bg-[#0a0a0a]`}>
        <div className="stars-bg"></div>
        <div className="comet" style={{ top: '10%', left: '80%', animationDelay: '2s' }}></div>
        <div className="comet" style={{ top: '40%', left: '90%', animationDelay: '7s' }}></div>
        
        {/* Main Interface Wrapper */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
