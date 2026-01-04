import type { Metadata } from 'next';
import { ThemeProvider, Navigation, Footer, GoogleAnalytics } from '@/components/layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ali Hamza Malik - Research Scientist',
  description: 'Research scientist specializing in formal verification, automated reasoning, and security.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="pt-20">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

