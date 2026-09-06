"use client";
// import { SearchInput } from "./components/SearchInput";
import HeroSection from "./components/HeroSection";
// import HeaderTop from "./components/HeaderTop";
import FullHeader from "./components/FullHeader";
import SearviceBanner from "./components/SearviceBanner";
import ReduxProvider from "./redux/provider";
import Footer from "./components/Footer";
// import DataFetch from "./index";

export default function Home() {
  return (
    <div className="bg-white dark:bg-[#131927] p-0">
      <ReduxProvider>
        {/* <HeaderTop />
        <SearchInput /> */}
          <FullHeader />
        <hr />
        <br />
        <div className="bg-[repeating-linear-gradient(45deg,theme(colors.gray.800)_0,theme(colors.gray.800)_1px,transparent_1px,transparent_13px)]">      
          <HeroSection />
          <SearviceBanner />
          <Footer />
          {/* <DataFetch /> */}
        </div>
      </ReduxProvider>
    </div>
  );
}
