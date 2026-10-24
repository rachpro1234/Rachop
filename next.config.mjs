import createNextIntlPlugin from "next-intl/plugin";
import { withNextVideo } from "next-video/process";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {

};

export default withFlowbiteReact(withNextVideo(withNextIntl(nextConfig)));
