// import { Playfair_Display, Montserrat } from 'next/font/google'
// import './globals.css'
// import { Header } from '@/components/header'
// import { Footer } from '@/components/footer'
// import { AnimatePresence } from 'framer-motion'

// const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
// const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

// export const metadata = {
//   title: 'Peace Marathon | An Epic Journey of Endurance',
//   description: 'Experience the serenity and challenge of the Peace Marathon, where every step brings us closer to unity.',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" className={`scroll-smooth ${playfair.variable} ${montserrat.variable}`}>
//       <body className={`font-sans antialiased bg-neutral-50 text-neutral-900`}>
//         <AnimatePresence mode="wait">
//           <Header />
//           <main className="min-h-screen">{children}</main>
//           <Footer />
//         </AnimatePresence>
//       </body>
//     </html>
//   )
// }



'use client'

import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${montserrat.variable}`}>
      <body className={`font-sans antialiased bg-neutral-50 text-neutral-900`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}