import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "@/entities/User";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import TokenomicsSection from "../components/landing/TokenomicsSection";
import VideoSection from "../components/landing/VideoSection";
import FAQSection from "../components/landing/FAQSection";
import InternetIdentityModal from "../components/landing/InternetIdentityModal";
import ContactSection from "../components/landing/ContactSection";

export default function Home() {
  const navigate = useNavigate();
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
      // In a real app, you would integrate with Internet Identity here
      navigate(createPageUrl("Dashboard"));
    } catch (error) {
      console.error("Authentication failed:", error);
    }
    setIsAuthenticating(false);
    setShowAuthModal(false);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <HeroSection onGetStarted={handleGetStarted} />
      <FeaturesSection />
      <HowItWorksSection />
      <TokenomicsSection />
      <VideoSection />
      <FAQSection />
      <ContactSection />
      
      <InternetIdentityModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticate={handleInternetIdentity}
        isLoading={isAuthenticating}
      />
    </div>
  );
}