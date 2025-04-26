import { HeroSection } from "@/components/community/hero-section"
import { StatsBar } from "@/components/community/stats-bar"
import { TabsSection } from "@/components/community/tabs-section"
import { SuccessStories } from "@/components/community/success-stories"
import { CallToAction } from "@/components/community/call-to-action"

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className=" bg-primary text-primary-foreground">
        <HeroSection />
        <StatsBar />
      </div>
      <TabsSection />
      <SuccessStories />
      <CallToAction />
    </div>
  )
}

export default CommunityPage

