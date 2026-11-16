import type { Metadata } from 'next';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './globals.css';
export const metadata: Metadata = { title: 'FLORA — Your intelligent canvas', description: 'An interactive FLORA website study based on exact Mobbin references.' };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
