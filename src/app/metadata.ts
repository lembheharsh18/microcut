import { Metadata } from 'next';

export const siteMetadata: Metadata = {
  title: {
    template: '%s | Microcut Technology',
    default: 'Microcut Technology | CNC & VMC Machining Pune',
  },
  description: 'Precision CNC and VMC machining services in Pune, Maharashtra. ISO 9001 certified manufacturing for automotive, aerospace, and medical industries.',
  keywords: ['CNC machining', 'VMC milling', 'Pune manufacturing', 'precision engineering', 'automotive parts'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://microcut.in',
    siteName: 'Microcut Technology',
  },
};
