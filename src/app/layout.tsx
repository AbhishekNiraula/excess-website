import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/src/app/globals.css";
import Footer from "@/src/components/Footer";
import NextTopLoader from 'nextjs-toploader';

const poppins = Poppins({ 
  weight: '400',
  subsets: ["latin"] }
);

export const metadata: Metadata = {
  title: "EXCESS - Electronics and Communication Engineering Student Society",
  description: "IOE Purwanchal Campus - EXCESS",
};

export default function RootLayout({
  
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
      </head>
      <body className={poppins.className}>       
        
          <NextTopLoader
            color="#F5233C"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          {children}
          <section id="footer">
              <Footer />
          </section> 
      </body>
      </html>
  );
}
