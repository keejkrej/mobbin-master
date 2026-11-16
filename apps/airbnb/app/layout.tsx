import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Airbnb — Design study',
  description: 'An interactive, local Airbnb interface study based on Mobbin references.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
