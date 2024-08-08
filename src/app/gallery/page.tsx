import "@/src/app/globals.css";
import HeaderTop from '@/src/components/HeaderTop';
import Navbar from '@/src/components/Navbar';
import Gallery from "@/src/app/gallery/Gallery";
import ClientSideWrapper from '@/src/components/ClientSideWrapper';

export default function Home() {
  return (
    <>
      <section id="header">
        <HeaderTop />
        <Navbar />
      </section>
      <ClientSideWrapper>
        <Gallery />
      </ClientSideWrapper>
    </>
  );
}
