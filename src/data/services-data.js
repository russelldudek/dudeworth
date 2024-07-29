import React from 'react';
import { formatText } from '../utils/text-formatting';

const boldTerms = [
  're:Think', 
  'AI', 
  'Artificial Intelligence', 
  'Innovation', 
  'Growth', 
  'Resilience',
  'AI integration',
  'AI solutions',
  'AI transformation',
  'AI innovation',
  'chatbots',
  'virtual assistants',
  'data analysis',
  'predictive analytics',
  'process automation',
  'custom AI solutions',
  'AI strategy'
];

export const servicesData = {
  introduction: formatText("Unlock new possibilities with DudeWorth's AI service tiers. Transform your business reality, ensuring Innovation, Growth, Resilience.", boldTerms),
  tiers: [
    {
      title: "1. Basic AI Integration",
      color: "#FF073A",
      description: formatText("Ideal for small businesses looking to dip their toes into AI. This tier focuses on integrating AI tools into existing processes for efficiency.", boldTerms),
      benefits: [
        formatText("Automated Customer Support: Implement chatbots and virtual assistants to handle routine customer queries.", boldTerms),
        formatText("Data Analysis: Basic AI-driven data analysis to provide insights and inform decision-making.", boldTerms)
      ]
    },
    {
      title: "2. Advanced AI Solutions",
      color: "#FF7F00",
      description: formatText("Designed for medium-sized businesses ready to leverage AI for competitive advantage. This tier offers more advanced AI applications.", boldTerms),
      benefits: [
        formatText("Predictive Analytics: Utilize AI to predict market trends and customer behaviors.", boldTerms),
        formatText("Process Automation: Streamline operations with AI-driven automation of repetitive tasks.", boldTerms),
        formatText("Enhanced Customer Experience: Use AI to personalize customer interactions and improve satisfaction.", boldTerms)
      ]
    },
    {
      title: "3. Enterprise AI Transformation",
      color: "#FFFF00",
      description: formatText("For large enterprises aiming for comprehensive AI integration. This tier provides end-to-end AI transformation solutions.", boldTerms),
      benefits: [
        formatText("Custom AI Solutions: Develop bespoke AI models tailored to specific business needs.", boldTerms),
        formatText("AI Strategy Development: Formulate a strategic AI roadmap to align with long-term business goals.", boldTerms),
        formatText("Full-scale Implementation: Implement AI across various departments for holistic transformation.", boldTerms),
        formatText("Continuous Optimization: Ongoing monitoring and optimization to ensure sustained AI performance and ROI.", boldTerms)
      ]
    },
    {
      title: "4. AI Innovation Partnership",
      color: "#BFFF00",
      description: formatText("Ideal for businesses seeking to lead in AI innovation. This tier focuses on collaborative AI development and cutting-edge solutions.", boldTerms),
      benefits: [
        formatText("Joint R&D: Collaborate on research and development of new AI technologies and applications.", boldTerms),
        formatText("Innovation Labs: Establish in-house AI labs to foster innovation and experimentation.", boldTerms),
        formatText("Strategic AI Alliances: Form strategic partnerships to leverage AI advancements and stay ahead of the curve.", boldTerms),
        formatText("AI Talent Development: Invest in training and development to build an in-house AI team.", boldTerms)
      ]
    }
  ],
  callToAction: "Unlock Your Business's Full Potential",
  finalNote: formatText("Discover the perfect fit for AI automation by exploring our service tiers. Whether you're just starting or ready to lead in innovation, we have the ideal solution for your business. Contact us today to discuss your needs and embark on your AI journey with DudeWorth.", boldTerms)
};