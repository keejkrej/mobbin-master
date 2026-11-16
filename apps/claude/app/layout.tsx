import type { Metadata } from 'next';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './globals.css';
export const metadata: Metadata = { title: 'Claude', description: 'An interactive Claude interface study built from Mobbin references.' };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
