/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_SIGNOUTCALLBACKURL: process.env.NEXT_PUBLIC_SIGNOUTCALLBACKURL
    }
}

module.exports = nextConfig
