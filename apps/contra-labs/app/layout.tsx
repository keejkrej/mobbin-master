import type { Metadata } from 'next';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import './globals.css';

export const metadata: Metadata = { title: 'Contra Labs — Human taste is the new training data', description: 'An interactive study of Contra Labs, the human data and creative AI evaluation lab.' };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
