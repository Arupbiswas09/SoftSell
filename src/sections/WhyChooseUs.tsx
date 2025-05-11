import React, { useEffect, useRef } from 'react';
import SectionHeading from '../components/SectionHeading';
import { Shield, Clock, Banknote, LineChart } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (featuresRef.current) {
      featuresRef.current.forEach((feature) => {
        if (feature) observer.observe(feature);
      });
    }

    return () => {
      if (featuresRef.current) {
        featuresRef.current.forEach((feature) => {
          if (feature) observer.unobserve(feature);
        });
      }
    };
  }, []);

  const features: Feature[] = [
    {
      icon: <Shield className="h-8 w-8 text-primary-500" />,
      title: "100% Legal & Compliant",
      description: "Our team of legal experts ensures all transactions comply with licensing agreements and regulations."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary-500" />,
      title: "Quick Turnaround",
      description: "From valuation to payment, our streamlined process typically completes within 2-3 business days."
    },
    {
      icon: <Banknote className="h-8 w-8 text-primary-500" />,
      title: "Maximum Value",
      description: "Our market knowledge and extensive buyer network ensures you get the highest possible value for your licenses."
    },
    {
      icon: <LineChart className="h-8 w-8 text-primary-500" />,
      title: "Transparent Pricing",
      description: "No hidden fees or commissions. We provide clear valuation reports and straightforward pricing."
    }
  ];

  return (
    <section 
      id="why-choose-us" 
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Choose SoftSell"
          subtitle="We've helped companies recover over $10 million from unused software licenses"
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => featuresRef.current[index] = el}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 opacity-0"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-4 p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Stats */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              { value: "$10M+", label: "Revenue Generated for Clients" },
              { value: "500+", label: "Successful Transactions" },
              { value: "98%", label: "Client Satisfaction Rate" }
            ].map((stat, index) => (
              <div key={index} className="p-8 text-center">
                <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;