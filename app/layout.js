import "../styles/globals.scss"
import { Roboto_Flex } from "next/font/google"
import Footer from "components/layout/Footer/Footer"
import { NextAuthProvider } from "./providers";

const robotoflex = Roboto_Flex({ subsets: ["latin"] })

export const metadata = {
  title: "Courses | Code Your Dreams",
  description: "Course management portal for Code Your Dreams",
  // Temporarily adding in to prevent indexing of the build site
  robots: {
    index: false,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={robotoflex.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
        <Footer />
      </body>
    </html>
  )
}
