"use client";


import "@/src/app/globals.css";
import HeaderTop from '@/src/components/HeaderTop';
import Navigation from "@/src/components/Navigation";
import Main from "@/src/components/Main";
import Testimonial from "@/src/components/Testimonial";
import About from "@/src/components/About";
import Navbar from "@/src/components/Navbar";
import Member from "@/src/components/Member";
import { useRef } from "react";
import Progressbar from '@/src/components/ProgressBar';

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  return (
    <main ref={mainRef}>
      <Progressbar target={mainRef} />
      <section id="header">
        <HeaderTop />
        <Navbar />
        <Main />
      </section>
      <section id="about-us">
        <About />
      </section>
      <section id="members">
        <Member />
      </section>
      <section id="testimonial">
        <Testimonial />
      </section>
    </main>
  );
}
