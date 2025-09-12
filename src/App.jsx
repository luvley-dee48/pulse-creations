import React from 'react';

// Layout component
import Layout from './components/Layout';

// Home page components
import FeaturedCreators from './components/home/FeaturedCreators';
import HeroSection from './components/home/HeroSection';
import PlatformStats from './components/home/PlatformStats';
import TrendingTokens from './components/home/TrendingTokens';

// Landing page components
import ContactSection from './components/landing/ContactSection';
import FAQSection from './components/landing/FAQSection';
import FeaturesSection from './components/landing/FeaturesSection';
import HeroSection as LandingHeroSection from './components/landing/HeroSection';
import HowItWorks from './components/landing/HowItWorks';
import InternetIdentityModal from './components/landing/InternetIdentityModal';
import Navbar from './components/landing/Navbar';
import PartnerSection from './components/landing/PartnerSection';
import TokenomicsSection from './components/landing/TokenomicsSection';
import VideoSection from './components/landing/VideoSection';

// Create components
import CurveSelector from './components/create/CurveSelector';
import FeeBreakdown from './components/create/FeeBreakdown';
import TokenPreview from './components/create/TokenPreview';

// Market component
import TokenGrid from './components/market/TokenGrid';

function App() {
  return (
    <div className="App">
      <Layout>
        {/* Your app content here */}
        
        {/* Example usage of components: */}
        <Navbar />
        <LandingHeroSection />
        <FeaturesSection />
        <HowItWorks />
        <PlatformStats />
        <TrendingTokens />
        <FeaturedCreators />
        <TokenomicsSection />
        <PartnerSection />
        <VideoSection />
        <FAQSection />
        <ContactSection />
        
        {/* You can conditionally render these based on routes/state */}
        {/* <TokenGrid /> */}
        {/* <CurveSelector /> */}
        {/* <FeeBreakdown /> */}
        {/* <TokenPreview /> */}
        {/* <InternetIdentityModal /> */}
        
      </Layout>
    </div>
  );
}

export default App;