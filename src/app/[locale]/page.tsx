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
        <div>      
          <HeroSection />
          <SearviceBanner />
          <Footer />
          {/* <DataFetch /> */}
        </div>
      </ReduxProvider>
    </div>
  );
}
