import CallToAction from '@/components/business-english/call-to-action'
import CallToAction2 from '@/components/business-english/call-to-action-footer'
import CourseSection from '@/components/business-english/course-section'
import FeatureSection from '@/components/business-english/feature-section'
import HeroSection from '@/components/business-english/hero-section'
import SkillSection from '@/components/business-english/skill-section'
import SuccessStoriesSection from '@/components/business-english/success-stories-section'

import { Button } from '@/components/ui/button'
import React from 'react'

function BusinessEnglish() {
  return (
    <>
    
     <HeroSection/>
     <FeatureSection/>
     <CourseSection/>
     <SkillSection/>
     <CallToAction/>
     <SuccessStoriesSection/>
     <CallToAction2/>
    </>
  )
}

export default BusinessEnglish