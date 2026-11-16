import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Grok — Interface Study',description:'An interactive, local Grok interface study based on Mobbin reference screens.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
