import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { Send, Check } from 'lucide-react';

interface FormValues {
  name: string;
  email: string;
  company: string;
  licenseType: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const licenseTypes = [
    'Microsoft Office',
    'Adobe Creative Cloud',
    'Oracle Database',
    'SAP',
    'VMware',
    'Autodesk',
    'Other'
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validate = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formValues.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formValues.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formValues.company.trim()) {
      errors.company = 'Company is required';
    }
    
    if (!formValues.licenseType) {
      errors.licenseType = 'Please select a license type';
    }
    
    if (!formValues.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form
        setFormValues({
          name: '',
          email: '',
          company: '',
          licenseType: '',
          message: ''
        });
        
        // Reset submission status after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };
  
  return (
    <section 
      id="contact" 
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get a Free Valuation"
          subtitle="Fill out the form below and our team will get back to you within 24 hours"
        />
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-5">
              {/* Contact info sidebar */}
              <div className="md:col-span-2 bg-gradient-to-br from-primary-600 to-secondary-700 p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-white/80 mb-1">Email</p>
                    <p className="font-medium">contact@softsell.com</p>
                  </div>
                  <div>
                    <p className="text-white/80 mb-1">Phone</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-white/80 mb-1">Address</p>
                    <p className="font-medium">123 Tech Avenue<br />San Francisco, CA 94107</p>
                  </div>
                </div>
                
                <div className="mt-12">
                  <p className="text-white/90 text-sm">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </div>
              </div>
              
              {/* Contact form */}
              <div className="md:col-span-3 p-8">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Thanks for reaching out!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                      We've received your message and will get back to you within 24 hours with a valuation estimate.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formValues.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-md border ${
                            formErrors.name 
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 dark:border-gray-700 focus:ring-primary-500 focus:border-primary-500'
                          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                        />
                        {formErrors.name && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formValues.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-md border ${
                            formErrors.email 
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 dark:border-gray-700 focus:ring-primary-500 focus:border-primary-500'
                          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Company *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formValues.company}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-md border ${
                            formErrors.company 
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 dark:border-gray-700 focus:ring-primary-500 focus:border-primary-500'
                          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                        />
                        {formErrors.company && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.company}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="licenseType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          License Type *
                        </label>
                        <select
                          id="licenseType"
                          name="licenseType"
                          value={formValues.licenseType}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-md border ${
                            formErrors.licenseType 
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 dark:border-gray-700 focus:ring-primary-500 focus:border-primary-500'
                          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                        >
                          <option value="">Select License Type</option>
                          {licenseTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        {formErrors.licenseType && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.licenseType}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formValues.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-md border ${
                          formErrors.message 
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 dark:border-gray-700 focus:ring-primary-500 focus:border-primary-500'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                        placeholder="Please provide some details about your software licenses..."
                      ></textarea>
                      {formErrors.message && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                      )}
                    </div>
                    
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Get Free Valuation
                          <Send className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;