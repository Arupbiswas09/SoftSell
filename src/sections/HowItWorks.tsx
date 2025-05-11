import React, { useEffect, useRef } from 'react';
import SectionHeading from '../components/SectionHeading';
import { Upload, RefreshCw, DollarSign } from 'lucide-react';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (stepsRef.current) {
      stepsRef.current.forEach((step) => {
        if (step) observer.observe(step);
      });
    }

    return () => {
      if (stepsRef.current) {
        stepsRef.current.forEach((step) => {
          if (step) observer.unobserve(step);
        });
      }
    };
  }, []);

  const steps: Step[] = [
    {
      icon: <Upload className="h-12 w-12 text-primary-500" />,
      title: "Upload License",
      description: "Upload your software license information securely through our platform. We'll verify all details and ensure compliance with licensing terms."
    },
    {
      icon: <RefreshCw className="h-12 w-12 text-primary-500" />,
      title: "Get Valuation",
      description: "Our proprietary algorithm evaluates your license based on market demand, remaining term, and features to provide you with a competitive valuation."
    },
    {
      icon: <DollarSign className="h-12 w-12 text-primary-500" />,
      title: "Get Paid",
      description: "Accept our offer and receive payment within 48 hours via your preferred method. We handle all the paperwork and transfer processes."
    }
  ];

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How It Works"
          subtitle="Turn your unused software licenses into cash with our simple 3-step process"
        />
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={el => stepsRef.current[index] = el}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg opacity-0 transition-all duration-700 delay-100"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Visual process flow */}
        <div className="hidden md:block mt-16 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary-200 dark:bg-primary-800 transform -translate-y-1/2 z-0"></div>
          <div className="flex justify-between relative z-10">
            {[1, 2, 3].map((step) => (
              <div key={step} className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold shadow-lg">
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;