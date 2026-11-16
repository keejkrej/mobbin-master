import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AS Mobbin · Linear',
  description: 'Interactive Linear interface study, built from Mobbin references.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
