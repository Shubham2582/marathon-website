import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="container px-4 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-serif font-bold text-2xl text-white mb-6">Important Links</h3>
            <ul className="space-y-4">
              {[
                { id: 'office', text: 'Marathon Office Info' },
                { id: 'results', text: 'Race Results' },
                { id: 'sponsors', text: 'Our Sponsors' }
              ].map((link) => (
                <li key={link.id}>
                  <Link
                    href="#"
                    className="text-neutral-400 hover:text-primary transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-2xl text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { id: 'registration', text: 'Candidate Registration' },
                { id: 'rules', text: 'Race Rules' },
                { id: 'terms', text: 'Terms and conditions' }
              ].map((link) => (
                <li key={link.id}>
                  <Link
                    href="#"
                    className="text-neutral-400 hover:text-primary transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-2xl text-white mb-6">Contact Us</h3>
            <ul className="space-y-4 text-neutral-400">
              <li className="flex items-center gap-2">
                <span className="font-semibold text-white">Phone:</span> +1234567890
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-white">Email:</span> info@peacemarathon.com
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-white">Address:</span> Marathon HQ, City, Country
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-400">&copy; 2024 Peace Marathon. All rights reserved.</p>
          <div className="flex gap-6">
            {[
              { id: 'facebook', Icon: Facebook },
              { id: 'twitter', Icon: Twitter },
              { id: 'instagram', Icon: Instagram },
              { id: 'youtube', Icon: Youtube }
            ].map(({ id, Icon }) => (
              <Link
                key={id}
                href="#"
                className="text-neutral-400 hover:text-primary transition-colors duration-200"
              >
                <Icon className="w-6 h-6" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <h4 className="font-serif text-2xl font-bold text-white mb-4">Stay Updated</h4>
          <p className="text-neutral-400 mb-6">Subscribe to our newsletter for the latest updates and offers</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-full bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </footer>
  )
}

