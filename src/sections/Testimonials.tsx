import React, { useState, useEffect, useRef } from 'react';
import SectionHeading from '../components/SectionHeading';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && testimonialsRef.current) {
          testimonialsRef.current.classList.add('opacity-100');
          testimonialsRef.current.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 0.2 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const testimonials: Testimonial[] = [
    {
      quote: "SoftSell helped us recover nearly $150,000 from unused software licenses that were just sitting in our asset inventory. The process was smooth, and their team handled all the paperwork and compliance issues.",
      name: "Jennifer Lawson",
      role: "CIO",
      company: "Quantum Enterprises",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      quote: "As a growing startup, we needed to offload some licenses after downsizing a department. SoftSell found buyers quickly and got us 30% more than we expected. This helped us extend our runway during a critical growth phase.",
      name: "Robert Chen",
      role: "CFO",
      company: "InnovateTech",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Hear from businesses that have successfully monetized their software assets"
        />
        
        <div 
          ref={testimonialsRef}
          className="max-w-4xl mx-auto transition-all duration-700 opacity-0 transform translate-y-8"
        >
          <div className="relative">
            <div className="absolute -top-12 -left-12 text-primary-200 dark:text-primary-800 opacity-50">
              <Quote size={80} />
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 relative z-10">
              <div 
                className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
              >
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 relative z-10">
                  {testimonials[currentIndex].quote}
                </p>
                
                <div className="flex items-center">
                  <div 
                    className="h-16 w-16 rounded-full bg-cover bg-center mr-4"
                    style={{ backgroundImage: `url(${testimonials[currentIndex].image})` }}
                  ></div>
                  <div>
                    <p className="font-bold text-lg text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'w-8 bg-primary-500' 
                    : 'w-2 bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;