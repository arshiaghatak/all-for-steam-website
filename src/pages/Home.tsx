import { Hero } from "../components/home/Hero";
import { ImpactStats } from "../components/home/ImpactStats";
import { Testimonials } from "../components/home/Testimonials";
import { JoinCta } from "../components/home/JoinCta";
import { StayConnected } from "../components/StayConnected";
import { usePageMeta } from "../hooks/usePageMeta";

export function Home() {
  usePageMeta(
    "All For STEAM — Making STEAM Accessible for Every Child",
    "All For STEAM is a student-run nonprofit making STEAM education accessible for every child through free tutoring, workshops, and mentorship."
  );

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
