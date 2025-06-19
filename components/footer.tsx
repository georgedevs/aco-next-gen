import { Sparkles, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: "About", href: "#about" },
    { name: "Benefits", href: "#benefits" },
    { name: "How It Works", href: "#process" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#facebook" },
    { name: "Twitter", icon: Twitter, href: "#twitter" },
    { name: "LinkedIn", icon: Linkedin, href: "#linkedin" },
    { name: "Instagram", icon: Instagram, href: "#instagram" },
  ]

  return (
    <footer className="bg-aco-navy text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Brand */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo-dark.webp"
              alt="Aco NextGen"
              width={140}
              height={36}
              className="h-9 w-auto transition-all duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-aco-cyan transition-colors duration-300 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-gray-400 text-sm text-center md:text-right">
            © {currentYear} Aco NextGen Scholarship.
            <br className="md:hidden" /> All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
