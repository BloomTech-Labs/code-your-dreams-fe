import Link from "next/link"
import Image from "next/image"

export default function SiteLogo() {
  return (
    <Link href="/" className="no-text">
      <Image
        src="/images/CYD-Logo.png"
        alt="Code Your Dreams logo"
        width={105}
        height={60}
      />
    </Link>
  )
}
