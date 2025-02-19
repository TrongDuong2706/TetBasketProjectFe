import { Button } from "src/components/ui/Button";
import { Card, CardContent } from "src/components/ui/card";

import { ShoppingCart, Gift, Truck, ShieldCheck } from "lucide-react";
import Footer from "src/components/HomeFooter/Footer";
import Header from "src/components/HomeHeader/Header";
import IntroSlider from "src/components/Slide/IntroSlider";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <IntroSlider />
      {/* Categories */}

      {/* Best Sellers */}
      

      {/* Why Choose Us */}

      {/* Footer */}
      <Footer />
    </div>
  );
}