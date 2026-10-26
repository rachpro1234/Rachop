import createNextIntlPlugin from "next-intl/plugin";
import { withNextVideo } from "next-video/process";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";
import path from 'path';
import { fileURLToPath } from "url";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

const __dirname = path.dirname(fileURLToPath(import.meta.url));


/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  }
};

export default withFlowbiteReact(withNextVideo(withNextIntl(nextConfig)));
