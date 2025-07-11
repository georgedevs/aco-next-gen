import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  ClockIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

const currentYear = new Date().getFullYear();

const footerLinks = [
  { name: "About", href: "#about" },
  { name: "Benefits", href: "#benefits" },
  { name: "How It Works", href: "#process" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#facebook" },
  { name: "Twitter", icon: Twitter, href: "#twitter" },
  { name: "LinkedIn", icon: Linkedin, href: "#linkedin" },
  { name: "Instagram", icon: Instagram, href: "#instagram" },
];

export function FinalCtaSection() {
  return (
    <section
      className="py-20 bg-gradient-to-br bg-blend-multiply from-aco-navy to-aco-navy/95 text-white"
      style={{
        backgroundImage: "url('/footerbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Content */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight font-heading">
            Your Tech Career Transformation Starts Today
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful graduates who took the first step with
            our free career quiz. Discover your ideal tech path and unlock
            global opportunities.
          </p>

          <div className="mb-16">
            <Link href="/quiz">
              <Button
                size="lg"
                className="bg-gradient-to-r from-aco-orange to-orange-500 hover:from-orange-600 hover:to-aco-orange text-white font-semibold text-lg px-6 sm:px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="sm:hidden">Take Free Quiz</span>
                <span className="hidden sm:inline">Take Your Free Career Quiz Now</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-3 text-center">
              <ClockIcon className="w-6 h-6 text-aco-cyan flex-shrink-0" />
              <div>
                <div className="font-semibold text-white">Quick Start</div>
                <div className="text-sm text-gray-300">Begin in 5 minutes</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 text-center">
              <UserGroupIcon className="w-6 h-6 text-aco-cyan flex-shrink-0" />
              <div>
                <div className="font-semibold text-white">Expert Support</div>
                <div className="text-sm text-gray-300">Mentorship included</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 text-center">
              <ShieldCheckIcon className="w-6 h-6 text-aco-cyan flex-shrink-0" />
              <div>
                <div className="font-semibold text-white">
                  Guaranteed Results
                </div>
                <div className="text-sm text-gray-300">85% job placement</div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-300">
            ✓ No credit card required • ✓ Instant results • ✓ Completely
            confidential
          </p>
        </div>

        {/* Footer Content */}
        <div className="border-t-4 border-gray-600/30 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            {/* Brand */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/Asset 2 -dark.png"
                alt="Aco NextGen"
                width={140}
                height={36}
                className="transition-all duration-300 group-hover:scale-105"
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

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-aco-cyan transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

              {/*Copyright*/}
          <div className="text-center mt-5">
            <p className="text-gray-400 text-sm">
              © {currentYear} Aco NextGen Scholarship. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
