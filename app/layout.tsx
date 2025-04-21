import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sahil Logistics Solution - Full & Part Truck Transport Services",
  description: "Sahil Logistics and Sahil Express offer the best transport solutions from Bhiwandi to Bangalore, Hyderabad, Delhi, Chennai. Full truck and part truck logistics services.",
  keywords: [
    "Bhiwandi to Bangalore transport",
    "Bhiwandi to Hyderabad logistics",
    "Bhiwandi to Delhi transport",
    "Bhiwandi to Chennai freight",
    "Sahil Logistics",
    "Sahil Express",
    "full truck load services",
    "part truck load services",
    "best transport service in India"
  ],
  generator: 'v0.dev'
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
