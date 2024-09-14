// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// next.config.mjs
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  // specify a custom path for the i18n
  "./src/i18n.ts"
  
);

/** @type {import('next').NextConfig} */
const nextConfig = {

};


export default withNextIntl(nextConfig);

