import dynamic from 'next/dynamic';
import { HeroSection } from "@/components/home/HeroSection";

const ServicesSnapshot = dynamic(() => import('@/components/home/ServicesSnapshot').then(mod => mod.ServicesSnapshot), { ssr: true });
const WhyChooseUsStats = dynamic(() => import('@/components/home/WhyChooseUsStats').then(mod => mod.WhyChooseUsStats), { ssr: false });
const DealerPartnerCTA = dynamic(() => import('@/components/home/DealerPartnerCTA').then(mod => mod.DealerPartnerCTA), { ssr: false });

export const metadata = {
  title: "Microcut Technology | CNC & VMC Machining Pune",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSnapshot />
      <WhyChooseUsStats />
      <DealerPartnerCTA />
    </>
  );
}
