import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Update document title
document.title = 'SoftSell - Monetize Your Unused Software Licenses';

// Add meta tags for SEO
const meta = document.createElement('meta');
meta.name = 'description';
meta.content = 'SoftSell helps businesses monetize unused software licenses with our secure, transparent, and hassle-free resale platform.';
document.head.appendChild(meta);

const metaKeywords = document.createElement('meta');
metaKeywords.name = 'keywords';
metaKeywords.content = 'software resale, license marketplace, unused software, license valuation, software asset management';
document.head.appendChild(metaKeywords);

const metaOgTitle = document.createElement('meta');
metaOgTitle.property = 'og:title';
metaOgTitle.content = 'SoftSell - Monetize Your Unused Software Licenses';
document.head.appendChild(metaOgTitle);

const metaOgDescription = document.createElement('meta');
metaOgDescription.property = 'og:description';
metaOgDescription.content = 'Turn your idle software assets into immediate cash flow with our secure and transparent platform.';
document.head.appendChild(metaOgDescription);

const metaOgType = document.createElement('meta');
metaOgType.property = 'og:type';
metaOgType.content = 'website';
document.head.appendChild(metaOgType);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);