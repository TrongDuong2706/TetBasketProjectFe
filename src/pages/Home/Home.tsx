import { Button } from 'src/components/ui/Button'
import { Card, CardContent } from 'src/components/ui/card'
import { ShoppingCart, Gift, Truck, ShieldCheck } from 'lucide-react'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'
import IntroSlider from 'src/components/Slide/IntroSlider'
import OrderInformation from 'src/components/OrderInfor/OrderInformation'
import PromoCodes from 'src/components/PromoCodes/PromoCodes' 
import ProductBox from 'src/components/Product/ProductBox'
import FlashSalePage from 'src/components/Product/FlashSalePage'
import SignupSalePage from 'src/components/Product/SignupSalePage'
import ProductPage from 'src/components/Product/ProductPage'
import Welcome from 'src/components/Welcome/Welcome'
import AddToCart from 'src/components/AddToCart/AddToCart'

export default function HomePage() {
  return (
    <div className='w-full'>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <IntroSlider />

      {/* Giới Thiệu */}
      <section className='bg-[#fff8f1] text-black py-10 text-center'>
        <Welcome />
        {/* PromoCodes Component */}
        <PromoCodes />
        {/* FlashSalePage Component */}
        <FlashSalePage />
        {/* Add FlashSalePage after PromoCodes */}
        <SignupSalePage />
        <ProductPage />
        <ProductPage />
      </section>
      {/* Order Information Section */}
      <OrderInformation />

      {/* Footer */}
      <Footer />
    </div>
  )
}
