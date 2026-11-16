import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'General Intuition — Frontier lab study', description: 'An interactive official-site study of General Intuition with a local ASCII renderer and research previews.' };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
