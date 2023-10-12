import Navigation from "@/components/layout/Navigation/Navigation"
import { Suspense } from "react"
import Loading from "./loading"

export default function PortalLayout({ children }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navigation />
        {children}
      </Suspense>
    </>
  )
}
