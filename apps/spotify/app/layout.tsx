import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Spotify · Design study', description: 'An interactive Spotify design study based on Mobbin reference screens.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
