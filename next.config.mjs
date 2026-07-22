// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default withFlowbiteReact(nextConfig);

// next.config.mjs
// import createNextIntlPlugin from "next-intl/plugin";

// const withNextIntl = createNextIntlPlugin(
//   // specify a custom path for the i18n
//   "./src/i18n.ts"
// );

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// };

// export default withNextIntl(nextConfig);

import createNextIntlPlugin from "next-intl/plugin";
import { withNextVideo } from "next-video/process";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withFlowbiteReact(withNextVideo(withNextIntl(nextConfig)));