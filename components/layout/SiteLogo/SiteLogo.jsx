import Link from "next/link"
import Image from "next/image"

export default function SiteLogo() {
  return (
    <Link
      href="/portal"
      className="no-text"
      aria-label="return to default page"
    >
      <Image
        src="/images/CYD-Logo.png"
        alt="Code Your Dreams logo"
        width={105}
        height={60}
      />
    </Link>
  )
}
