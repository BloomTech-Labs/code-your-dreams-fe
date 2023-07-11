import SectionAccount from "./SectionAccount"
import SectionAdmin from "./SectionAdmin"
import SectionCourses from "./SectionCourses"
import SectionWelcome from "./SectionWelcome"

export default function Page() {
  return (
    // This is the landing page for users that are logged in
    <main>
      <SectionWelcome />
      <SectionCourses />
      <SectionAccount />
      <SectionAdmin />
    </main>
  )
}
