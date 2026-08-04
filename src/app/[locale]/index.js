import Head from "next/head";
import { useState, useEffect } from 'react';
import axios from "axios";

function DataFetch() {
    console.log("Component rendering...");
   const [products, setProducts] = useState([]);

   useEffect(() => {
    const fetchData =  async () => {
       try {
         const response = await axios.get("http://localhost:5000/api/products");
         setProducts(response.data);
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
                {products.map((product) => {
                    return (
                        <div key={product.id}>
                         <img src={product.img} />
                         <h2>{product.title_key}</h2>
                         <p>{product.desc_key}</p>
                         <span>{product.price}</span>
                         <span>{product.prev_price}</span>
                        </div>
                    )
                })}
            </main>
        </>
  );
  
}

export default DataFetch;