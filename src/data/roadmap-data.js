import React from 'react';
import { formatText } from '../utils/text-formatting';

const boldTerms = [
  're:Think', 
  'AI', 
  'Artificial Intelligence', 
  'Innovation', 
  'Growth', 
  'Resilience',
  'AI-driven transformation',
  'high-impact use cases',
  'data analysis',
  'AI models',
  'actionable intelligence',
  'AI capabilities',
  'continuous improvement',
  'AI solutions',
  'AI initiatives'
];

export const roadmapData = {
  introduction: formatText("At DudeWorth, we simplify the journey to AI-driven transformation. Our five-step process ensures seamless integration of AI into your business, driving Innovation, Growth, Resilience.", boldTerms),
  steps: [
    {
      title: "1. Identify and Innovate",
      color: "#FF073A",
      content: formatText("Discover the potential of AI for your business. We begin by understanding your unique business challenges and opportunities. Together, we identify high-impact use cases for AI and select the most suitable models to address these use cases.", boldTerms)
    },
    {
      title: "2. Organize and Collect",
      color: "#FF7F00",
      content: formatText("Harness the power of your data. We structure and gather relevant data from various sources, ensuring it is clean and ready for use. This step ensures that our AI models are built on a solid foundation, leading to accurate and actionable insights.", boldTerms)
    },
    {
      title: "3. Train and Implement",
      color: "#FFFF00",
      content: formatText("Turn data into actionable intelligence. With structured data, we train our AI models to learn and adapt. Our deployment process integrates these models into your existing systems, enabling you to leverage AI capabilities seamlessly.", boldTerms)
    },
    {
      title: "4. Monitor and Refine",
      color: "#BFFF00",
      content: formatText("Ensure continuous improvement. AI is not a set-and-forget solution. We continuously monitor the performance of our models, analyzing outcomes and making necessary adjustments. This iterative process ensures that your AI solutions remain effective and evolve with your business needs.", boldTerms)
    },
    {
      title: "5. Evaluate and Scale",
      color: "#00FF00",
      content: formatText("Maximize your AI potential. We regularly evaluate the impact of AI on your business, identifying opportunities to scale successful solutions. By aligning AI initiatives with your broader business strategy, we help you maximize ROI and drive sustained growth.", boldTerms)
    }
  ],
  /* Call to Action (currently blank, uncomment and populate when ready)
  callToAction: {
    title: "Ready to Start Your AI Journey?",
    content: formatText("Embark on your AI transformation with DudeWorth. Our proven process will guide you through each step, ensuring a seamless integration of AI into your business operations. Contact us today to begin your journey towards innovation, growth, and resilience.", boldTerms)
  }
  */
};