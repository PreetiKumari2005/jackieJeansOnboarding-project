import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jackie Jeans — Smart Fit Experience',
  description: 'Premium AI onboarding module for tailored precision denim calculations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-neutral-100 selection:bg-neutral-900 selection:text-white">
      <body className="antialiased font-sans bg-neutral-100 text-neutral-900">
        {children}
      </body>
    </html>
  );
}