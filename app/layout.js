import "../styles/globals.scss"
import { Roboto_Flex } from "next/font/google"
import { NextAuthProvider } from "./providers"
import { AppProvider } from "@/context/appContext"
import { Suspense } from "react"
import Loading from "./loading"
import Header from "@/components/layout/Header/Header"
import Footer from "@/components/layout/Footer/Footer"

const robotoflex = Roboto_Flex({ subsets: ["latin"] })

export const metadata = {
  title: "Curriculum Portal | Code Your Dreams",
  description: "Portal for Code Your Dreams curriculum and course materials",
  // Temporarily adding in to prevent indexing of the build site
  robots: {
    index: false,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={robotoflex.className}>
        <Suspense fallback={<Loading />}>
          <NextAuthProvider>
            <AppProvider>
              <Header />
              {children}
              <Footer />
            </AppProvider>
          </NextAuthProvider>
        </Suspense>
      </body>
    </html>
  )
}
