import { Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'KodLearn LMS | Premium Learn',
  description: 'A premium learning management system',
};

function Stars() {
  return (
    <div className="stars-container">
      {Array.from({ length: 150 }).map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            width: Math.random() * 2 + 'px',
            height: Math.random() * 2 + 'px',
            top: Math.random() * 2000 + 'px',
            left: Math.random() * 100 + 'vw',
            animationDelay: Math.random() * 50 + 's',
            animationDuration: Math.random() * 50 + 50 + 's',
          }}
        />
      ))}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="comet"
          style={{
            top: Math.random() * 20 + 'vh',
            animationDelay: Math.random() * 20 + 's',
            animationDuration: Math.random() * 10 + 10 + 's',
          }}
        />
      ))}
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans select-none">
        <Stars />
        <div className="bg-mesh" />
        <div className="floating-orb" />
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
