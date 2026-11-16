import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ChatGPT · Design study',
  description: 'An interactive ChatGPT interface study based on Mobbin references.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
