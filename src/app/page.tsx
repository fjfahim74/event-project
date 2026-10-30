import Image from "next/image";
import Hero from "@/components/home/Hero"
import ImpactStats from "@/components/home/ImpactStats";
import Features from "@/components/home/Features";

export default function Home() {
  return (
    <>
      <Hero />
      <ImpactStats />
      <Features />
    </>
  )
}
