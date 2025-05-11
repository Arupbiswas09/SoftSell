import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-secondary-900/20 dark:from-primary-900/40 dark:to-secondary-900/40 z-0"></div>
      
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-[-1]"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className={`transition-all duration-1000 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Unlock Hidden Value in Your Unused Software Licenses
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-xl">
              Turn your idle software assets into immediate cash flow with our secure, 
              transparent, and hassle-free license resale platform.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="primary" 
                size="lg" 
                className="shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Get a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                Learn How It Works
              </Button>
            </div>
          </div>
          
          <div 
            className={`hidden lg:block bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-2xl transition-all duration-1000 ease-out transform ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                New!
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-inner">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Recent Success Story
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "We recovered $45,000 from unused software licenses that were just sitting in our asset inventory."
                </p>
                <div className="flex items-center">
                  <div 
                    className="h-10 w-10 rounded-full bg-cover bg-center mr-3"
                    style={{
                      backgroundImage: "url('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                    }}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Michael Stevens</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">CTO, TechNova Inc.</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">3 days ago</span>
                  <span className="font-medium text-primary-500">$45,000 recovered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Companies/Clients */}
        <div className="mt-16 sm:mt-24">
          <p className="text-center text-white/80 mb-6">
            Trusted by innovative companies worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center items-center">
            {['Microsoft', 'Adobe', 'Oracle', 'IBM', 'SAP'].map((company, index) => (
              <div 
                key={index} 
                className={`text-white/90 font-semibold text-xl transition-all duration-1000 delay-${index * 100} transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,128L48,128C96,128,192,128,288,149.3C384,171,480,213,576,208C672,203,768,149,864,144C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="fill-white dark:fill-gray-900"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;