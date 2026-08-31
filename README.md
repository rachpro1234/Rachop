# rachop
 
A full-stack e-commerce fashion storefront for shoes, clothing, and accessories — built with Next.js, Tailwind CSS, and a custom Express/MySQL backend.
 
This project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
 
---
 
## Getting Started
 
First, run the development server:
 
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
 
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
 
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
 
This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
 
---
 
## About the Project
 
### Front-End
 
- Supports switching between languages, implemented using [next-intl](https://next-intl.dev/) with the App Router
- Icons provided by the [Phosphor Icons](https://phosphoricons.com/) library
- Fully responsive, user-friendly design that fits all devices
- Shopping cart state and selected checkout items managed with Redux Toolkit
- Built with TypeScript for strict type checking
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Dark mode support, following this [Tailwind dark mode guide](https://prismic.io/blog/tailwind-css-darkmode-tutorial)
- Image carousels handled with [React Slick](https://react-slick.neostack.com/)

### Back-End
 
Repository: [rachop-backend](https://github.com/rachpro1234/rachop-backend)
 
- Express.js for handling Stripe checkout sessions and user authentication via [REST API](https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/)
- MySQL database for storing and retrieving product data
---
 
## Learn More
 
To learn more about Next.js, take a look at the following resources:
 
- [Next.js Documentation](https://nextjs.org/docs) — learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) — an interactive Next.js tutorial
You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) — feedback and contributions are welcome.
 
---
 
## Deploy on Vercel
 
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
 
Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
 