import { Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'KodLearn LMS | Premium Learn',
  description: 'A premium learning management system',
};

/* ───────────────────────────────────────────────
   Deterministic star data so SSR ≡ client hydration
   (no Math.random() directly in JSX)
─────────────────────────────────────────────── */
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface StarDef {
  x: number; y: number; size: number; opacity: number; dur: number; delay: number;
}
interface BrightStarDef {
  x: number; y: number; size: number; glow: number; minOp: number; maxOp: number;
  dur: number; delay: number; driftDur: number;
}
interface ShootDef {
  x: number; y: number; dur: number; delay: number; angle: number;
}

function buildStars(): { dim: StarDef[]; bright: BrightStarDef[]; shoots: ShootDef[] } {
  const dim: StarDef[] = [];
  for (let i = 0; i < 200; i++) {
    dim.push({
      x:     seededRandom(i * 7 + 0) * 100,
      y:     seededRandom(i * 7 + 1) * 100,
      size:  seededRandom(i * 7 + 2) * 1.2 + 0.4,
      opacity: seededRandom(i * 7 + 3) * 0.4 + 0.3,
      dur:   seededRandom(i * 7 + 4) * 4 + 3,
      delay: seededRandom(i * 7 + 5) * 6,
    });
  }

  const bright: BrightStarDef[] = [];
  for (let i = 0; i < 60; i++) {
    const s = seededRandom(i * 11 + 0);
    bright.push({
      x:       seededRandom(i * 11 + 1) * 100,
      y:       seededRandom(i * 11 + 2) * 100,
      size:    s * 2 + 1.5,
      glow:    s * 6 + 3,
      minOp:   0.5,
      maxOp:   1.0,
      dur:     seededRandom(i * 11 + 3) * 3 + 2,
      delay:   seededRandom(i * 11 + 4) * 5,
      driftDur:seededRandom(i * 11 + 5) * 40 + 60,
    });
  }

  const shoots: ShootDef[] = [];
  for (let i = 0; i < 6; i++) {
    shoots.push({
      x:     seededRandom(i * 13 + 0) * 90 + 5,
      y:     seededRandom(i * 13 + 1) * 40 + 5,
      dur:   seededRandom(i * 13 + 2) * 3 + 3,
      delay: seededRandom(i * 13 + 3) * 18 + i * 4,
      angle: seededRandom(i * 13 + 4) * 20 - 40,
    });
  }

  return { dim, bright, shoots };
}

const { dim, bright, shoots } = buildStars();

function Stars() {
  return (
    <div className="stars-container">
      {/* Dim background stars */}
      {dim.map((s, i) => (
        <div
          key={`d${i}`}
          className="star"
          style={{
            left: `${s.x}%`,
            top:  `${s.y}%`,
            width:  `${s.size}px`,
            height: `${s.size}px`,
            background: 'white',
            opacity: s.opacity,
            ['--dur' as string]: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Bright twinkling stars */}
      {bright.map((s, i) => (
        <div
          key={`b${i}`}
          className="star-bright"
          style={{
            left: `${s.x}%`,
            top:  `${s.y}%`,
            width:  `${s.size}px`,
            height: `${s.size}px`,
            ['--glow' as string]:      `${s.glow}px`,
            ['--min-op' as string]:    `${s.minOp}`,
            ['--max-op' as string]:    `${s.maxOp}`,
            ['--dur' as string]:       `${s.dur}s`,
            ['--drift-dur' as string]: `${s.driftDur}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shoots.map((s, i) => (
        <div
          key={`sh${i}`}
          className="shooting-star"
          style={{
            left:  `${s.x}%`,
            top:   `${s.y}%`,
            ['--shoot-dur' as string]:   `${s.dur}s`,
            ['--shoot-delay' as string]: `${s.delay}s`,
            transform: `rotate(${s.angle}deg)`,
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
        <div className="floating-orb floating-orb-1" />
        <div className="floating-orb floating-orb-2" />
        <div className="floating-orb floating-orb-3" />
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
