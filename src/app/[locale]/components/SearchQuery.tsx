// import { NextResponse } from "next/server";
// import Fuse from "fuse.js";
// import products from "@/app/data/products";

// export async function POST(request) {
//  try {
//   const { query } = await request.json();

//   const lowercaseQuery = query.toLowerCase();
//   const fuse = new Fuse(products, {
//    keys: ["title"],
//    includeScore: true,
//    threshold: 0.4,
//   });

//   const searchResults = fuse.search(lowercaseQuery);

//   return NextResponse.json({
//    success: true,
//    results: searchResults.map((result) => result.item),
//    message: "Here are your search results",
//   });
//  } catch (error) {
//   return NextResponse.json({
//    message: "Something went wrong",
//   });
//  }
// }
