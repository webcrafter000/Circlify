import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import Header from "./_components/Header";
import Testimonials from "./_components/Testimonials";
import Features from "./_components/Features";
import Copyright from "./_components/Copyright";

export default function Home() {
  return (
    <div>
     <Header/>
     <Hero/>
     <Features/>
     <Testimonials/>
     <Copyright/>

    </div>
  );
}
