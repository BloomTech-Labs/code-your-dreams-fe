import Header from "@/components/layout/Header/Header"
import Navigation from "@/components/layout/Navigation/Navigation"

export default function PortalLayout({ children }) {
  return (
    <>
      <Header />
      <Navigation />
      {children}
    </>
  )
}
