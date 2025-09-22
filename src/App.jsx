import React, { useState } from "react";

// Layout component - correct path based on your file structure
import Layout from "./entities/Layout";

// Landing page components
import ContactSection from "./components/landing/ContactSection";
import FAQSection from "./components/landing/FAQSection";
import FeaturesSection from "./components/landing/FeaturesSection";
import HeroSection from "./components/landing/HeroSection";
import HowItWorks from "./components/landing/HowItWorks";
import InternetIdentityModal from "./components/landing/InternetIdentityModal";
import TokenomicsSection from "./components/landing/TokenomicsSection";
import VideoSection from "./components/landing/VideoSection";

// Home page components
import FeaturedCreators from "./components/home/FeaturedCreators";
import PlatformStats from "./components/home/PlatformStats";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  // Modal state management
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  const handleInternetIdentity = async () => {
    setIsAuthenticating(true);
    try {
      // Simulate Internet Identity authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Internet Identity authentication successful!");
      
      // Close modal and navigate to dashboard
      setShowAuthModal(false);
      
      // In a real app, you'd navigate to dashboard
      alert("Internet Identity authentication successful! Welcome to PULSE!");
      
    } catch (error) {
      console.error("Internet Identity authentication failed:", error);
      alert("Authentication failed. Please try again.");
    }
    setIsAuthenticating(false);
  };

  const handleNFID = async () => {
    setIsAuthenticating(true);
    try {
      // Open NFID popup exactly like your screenshot
      const nfidUrl = `https://nfid.one/authenticate/#authorize`;
      const popup = window.open(
        nfidUrl,
        'nfid-auth',
        'width=500,height=700,scrollbars=yes,resizable=yes,status=yes,location=yes,toolbar=no,menubar=no'
      );

      if (!popup) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }

      // Listen for popup completion
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          console.log("NFID authentication completed!");
          
          // Close modal and show success
          setShowAuthModal(false);
          alert("NFID authentication successful! Welcome to PULSE!");
          setIsAuthenticating(false);
        }
      }, 1000);
      
    } catch (error) {
      console.error("NFID authentication failed:", error);
      alert(`Authentication failed: ${error.message}`);
      setIsAuthenticating(false);
    }
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
    setIsAuthenticating(false);
  };

  return (
    <div className="App">
      <Layout>
        {/* Landing Page Content - Pass the modal handler to HeroSection */}
        <HeroSection onGetStarted={handleGetStarted} />
        <FeaturesSection />
        <HowItWorks />
        <TokenomicsSection />
        <VideoSection />
        <FAQSection />
        <ContactSection />
        
        {/* Platform Stats for dashboard */}
        <PlatformStats />
        <FeaturedCreators />
        
        {/* Internet Identity Modal - Enhanced with proper design */}
        <InternetIdentityModal 
          isOpen={showAuthModal}
          onClose={handleCloseModal}
          onAuthenticate={handleInternetIdentity}
          onNFID={handleNFID}
          isLoading={isAuthenticating}
        />
      </Layout>
    </div>
  );
}

export default App;