'use client'

import React, { useState } from 'react'
import HeaderTop from './HeaderTop';
// import Navbar from './Navbar';
import SearchInput from './SearchInput';
import { motion, useScroll, useMotionValueEvent } from "motion/react"


function FullHeader() {

    
    // Header scroll animation
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
  
    useMotionValueEvent(scrollY, "change", (current) => {
      const previous = scrollY.getPrevious() ?? 0;
      if(current > previous && current > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    })

  return (
    <motion.header
     className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#131927] dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
        animate={{ y: hidden ? -140 : 0,
        opacity: hidden ? 0 : 1,
       }}
       transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <HeaderTop />
      <SearchInput />
      {/* <Navbar /> */}
    </motion.header>
  )
}

export default FullHeader
