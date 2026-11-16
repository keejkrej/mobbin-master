import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Decart · Design study', description: 'An interactive study of Decart’s Live AI research lab website, based on its official website.' };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
