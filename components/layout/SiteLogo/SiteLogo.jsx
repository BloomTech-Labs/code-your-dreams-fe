import Link from "next/link"
import Image from "next/image"

export default function SiteLogo() {
  return (
    <Link href="/" className="no-text">
      <Image
        src="/images/CYD_Logo_2020.jpg"
        alt="Code Your Dreams logo"
        width={102}
        height={60}
      />
    </Link>
  )
}
