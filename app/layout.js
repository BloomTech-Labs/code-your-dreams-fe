import "../styles/globals.scss"
import { Nunito_Sans } from "next/font/google"
import Footer from "components/layout/Footer/Footer"

const nunitos = Nunito_Sans({ subsets: ["latin"] })

export const metadata = {
  title: "Courses | Code Your Dreams",
  description: "Course management portal for Code Your Dreams",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunitos.className}>
        {/* <Header /> */}
        {children}
        <Footer />
      </body>
    </html>
  )
}
