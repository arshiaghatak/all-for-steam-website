import { Hero } from "../components/home/Hero";
import { ImpactStats } from "../components/home/ImpactStats";
import { Testimonials } from "../components/home/Testimonials";
import { JoinCta } from "../components/home/JoinCta";
import { StayConnected } from "../components/StayConnected";

export function Home() {
  return (
    <>
      <Hero />
      <ImpactStats />
      <Testimonials />
      <JoinCta />
      <StayConnected />
    </>
  );
}
