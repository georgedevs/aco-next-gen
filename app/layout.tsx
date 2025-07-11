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
    "tech scholarship, free tech training, 4th industrial revolution, tech skills, global job opportunities, career development, programming bootcamp, software engineering, web development, data science, artificial intelligence, machine learning, cybersecurity, cloud computing, Nigeria tech, Africa tech education",
  authors: [{ name: "Aco NextGen" }],
  creator: "Aco NextGen",
  publisher: "Aco NextGen",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.aconextgenscholarship.com",
  },
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
    url: "https://www.aconextgenscholarship.com",
    title: "Aco NextGen Scholarship - Free Tech Skills Training",
    description: "Transform your career with free tech skills training designed for global opportunities",
    siteName: "Aco NextGen Scholarship",
    images: [
      {
        url: "https://www.aconextgenscholarship.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aco NextGen Scholarship - Free Tech Training Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aconextgen",
    creator: "@aconextgen",
    title: "Aco NextGen Scholarship - Free Tech Skills Training",
    description: "Transform your career with free tech skills training designed for global opportunities",
    images: ["https://www.aconextgenscholarship.com/og-image.png"],
  },
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Aco NextGen Scholarship",
              "url": "https://www.aconextgenscholarship.com",
              "logo": "https://www.aconextgenscholarship.com/logo-dark.webp",
              "description": "Free tech skills training program for global opportunities in the 4th industrial revolution",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "NG"
              },
              "offers": {
                "@type": "Offer",
                "category": "Education",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "educationalCredentialAwarded": "Tech Skills Certificate",
              "areaServed": "Worldwide",
              "sameAs": [
                "https://twitter.com/aconextgen",
                "https://linkedin.com/company/aconextgen"
              ]
            })
          }}
        />
      </head>
      <body className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} ${satisfy.variable} ${kalam.variable} ${comfortaa.variable} font-sans`}>{children}</body>
    </html>
  )
}
