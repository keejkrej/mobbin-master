import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'ElevenLabs · Design study', description: 'An interactive text-to-speech workspace study based on Mobbin reference screens.' };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
