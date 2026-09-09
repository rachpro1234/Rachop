import Footer from "../components/Footer";
import FullHeader from "../components/FullHeader";
import SearviceBanner from "../components/SearviceBanner";

export const metadata = {
  title: "Register",
  description: "register to be a part of Rachop store",
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
