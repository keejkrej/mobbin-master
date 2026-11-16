import type { Metadata } from 'next';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './globals.css';

export const metadata: Metadata = { title: 'Cartesia — Architecting AI that learns', description: 'An interactive Cartesia marketing and voice interface study, informed by Mobbin references.' };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
