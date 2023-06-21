import Header from "components/layout/Header/Header"

export default function PortalLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
