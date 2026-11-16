import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Krea AI · Design study', description: 'Interactive image and video composer study based on Mobbin reference screens.' };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
