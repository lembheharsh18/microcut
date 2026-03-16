import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSnapshot } from "@/components/home/ServicesSnapshot";
import { WhyChooseUsStats } from "@/components/home/WhyChooseUsStats";
import { DealerPartnerCTA } from "@/components/home/DealerPartnerCTA";

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
