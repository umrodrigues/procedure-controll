import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalLoading from "@/components/ui/GlobalLoading";
import Footer from "@/components/ui/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Controle de Procedimentos Médicos",
  description: "Sistema de controle e monitoramento de procedimentos médicos",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js"
          type="module"
          async
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <GlobalLoading />
        </AuthProvider>
      </body>
    </html>
  );
}
