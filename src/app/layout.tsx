import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ELTON — Video Editor · Visual Storyteller · Motion Creative',
  description:
    'Award-winning cinematic video editor portfolio. Specializing in commercial films, music visuals, high-velocity social campaigns, and celluloid color grading.',
  keywords: [
    'Elton',
    'Video Editor',
    'Visual Storyteller',
    'Motion Creative',
    'Commercial Editor',
    'Music Video Editor',
    'DaVinci Resolve Colorist',
    'Film Editor India',
    'Cinematic Portfolio',
  ],
  authors: [{ name: 'Elton' }],
  creator: 'Elton',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://elton-portfolio.vercel.app',
    title: 'ELTON — Video Editor & Visual Storyteller',
    description: '“I turn raw footage into stories that stay.”',
    siteName: 'Elton Editorial Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ELTON — Video Editor & Visual Storyteller',
    description: 'Cutting moments. Shaping rhythm. Creating emotion.',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.svg'],
    apple: [
      { url: '/icon.svg' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-obsidian text-offWhite antialiased selection:bg-crimson selection:text-white">
        {/* Subtle Film Grain Noise Texture */}
        <div className="film-grain" />

        {/* Anamorphic Letterbox Bars */}
        <div className="letterbox-top" />
        <div className="letterbox-bottom" />

        {children}
      </body>
    </html>
  );
}
