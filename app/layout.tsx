import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Space_Grotesk, Satisfy, Kalam, Comfortaa } from "next/font/google"
import "./globals.css"

// Plus Jakarta Sans 
const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

// Space Grotesk for section titles and headings
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const satisfy= Satisfy({
  subsets: ["latin"],
  variable: "--font-satisfy",
  weight: "400",
  display: "swap",
})

const kalam = Kalam({
  subsets: ["latin"],
  variable: "--font-kalam",
  weight: ["300" ,"400", "700"],
  display: "swap",
})


const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})


export const metadata: Metadata = {
  title: "Aco NextGen Scholarship - Free Tech Skills Training for Global Opportunities",
  description:
    "Join the Aco NextGen Scholarship program and gain the tech skills needed for the 4th industrial revolution. Free training, global job opportunities, and career transformation await.",
  keywords:
    "tech scholarship, free tech training, 4th industrial revolution, tech skills, global job opportunities, career development",
  authors: [{ name: "Aco NextGen" }],
  creator: "Aco NextGen",
  publisher: "Aco NextGen",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aconextgen.com",
    title: "Aco NextGen Scholarship - Free Tech Skills Training",
    description: "Transform your career with free tech skills training designed for global opportunities",
    siteName: "Aco NextGen Scholarship",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aco NextGen Scholarship - Free Tech Skills Training",
    description: "Transform your career with free tech skills training designed for global opportunities",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} ${satisfy.variable} ${kalam.variable} ${comfortaa.variable} font-sans`}>{children}</body>
    </html>
  )
}
