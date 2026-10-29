import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ExploreMapPage } from './pages/ExploreMapPage';
import { PlaceDetailPage } from './pages/PlaceDetailPage';
import { ThenVsNowPage } from './pages/ThenVsNowPage';
import { PlanMyDayPage } from './pages/PlanMyDayPage';
import { GreenEscapesPage } from './pages/GreenEscapesPage';
import { MyCollectionPage } from './pages/MyCollectionPage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-[#FDFBF7] font-sans text-stone-800 antialiased selection:bg-[#C85A32] selection:text-white">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<ExploreMapPage />} />
            <Route path="/place/:id" element={<PlaceDetailPage />} />
            <Route path="/then-vs-now" element={<ThenVsNowPage />} />
            <Route path="/plan-my-day" element={<PlanMyDayPage />} />
            <Route path="/green-escapes" element={<GreenEscapesPage />} />
            <Route path="/collection" element={<MyCollectionPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
