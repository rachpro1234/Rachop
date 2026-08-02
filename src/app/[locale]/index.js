import Head from "next/head";
import { useState, useEffect } from 'react';
import axios from "axios";

export function Home() {
   const [message, setMessage] = useState('');

   useEffect(() => {
    const fetchData =  async () => {
       try {
         const response = await axios.get("http://localhost:5000/api/products");
         setMessage(response.data);
         console.log(response.data);
       } catch (error) {
        console.log("no data is found:", error);
       }
    };

    fetchData();
   }, []);

  return (
      <>
            <Head>
                <title>Create Next App</title>
            </Head>
            <main style={{ height: "100vh" }}>
                <h2>{message}</h2>
            </main>
        </>
  );
  
}

export default Home;