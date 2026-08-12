import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import { AnnouncementBanner } from "./components/AnnouncementBanner";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { ScrollManager } from "./components/ScrollManager";
import { Home } from "./pages/Home";

// Home ships eagerly (it's the landing experience); the rest split into
// their own chunks so a first visit only pays for what it needs.
const WhatWeDo = lazy(() => import("./pages/WhatWeDo").then((m) => ({ default: m.WhatWeDo })));
const Mission = lazy(() => import("./pages/Mission").then((m) => ({ default: m.Mission })));
const Opportunities = lazy(() =>
  import("./pages/Opportunities").then((m) => ({ default: m.Opportunities }))
);
const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));

export default function App() {
  useLenis();

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <ScrollManager />
      <AnnouncementBanner />
      <Nav />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
