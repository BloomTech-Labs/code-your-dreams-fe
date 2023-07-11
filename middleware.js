export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/portal", "/portal/account", "/portal/courses", "/portal/members", "/portal/chapters"],
};