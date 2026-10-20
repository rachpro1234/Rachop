import Footer from "../components/Footer";
import FullHeader from "../components/FullHeader";
import SearviceBanner from "../components/SearviceBanner";


// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;


export const metadata = {
  title: "Login",
  description: "Login in to your Rachop Space",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
        <FullHeader />
      <hr />
      <br />
      {children}
      <SearviceBanner />
      <Footer />
    </>
  );
}
