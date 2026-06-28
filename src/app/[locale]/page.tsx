"use client";
import { SearchInput } from "./components/SearchInput";
import HeroSection from "./components/HeroSection";
import HeaderTop from "./components/HeaderTop";
import SearviceBanner from "./components/SearviceBanner";
import ReduxProvider from "./redux/provider";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-[#131927] p-0">
      <ReduxProvider>
        <HeaderTop />
        <SearchInput />
        <hr />
        <br />
        <div>
          <HeroSection />
          <SearviceBanner />
          <Footer />
        </div>
      </ReduxProvider>
    </div>
  );
}
