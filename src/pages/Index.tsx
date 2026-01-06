import { useCanonical } from "@/hooks/useCanonical";
import { useStructuredData } from "@/hooks/useStructuredData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProductCarousel from "@/components/home/ProductCarousel";
import MissionSection from "@/components/home/MissionSection";
import ServicesSection from "@/components/home/ServicesSection";

const Index = () => {
  useCanonical();

  // Organization Schema (Identity Schema)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://dynamiccontrolsystems.in/#organization",
    "name": "Dynamic Control Systems",
    "alternateName": "DCS",
    "url": "https://dynamiccontrolsystems.in",
    "logo": "https://dynamiccontrolsystems.in/dynamic_logo.png",
    "description": "Dynamic Control Systems delivers advanced industrial automation, SCADA, and energy solutions powered by Mitsubishi Electric in Kochi. Authorized Channel Partner for Mitsubishi Electric India Private Limited.",
    "foundingDate": "1998",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "52/3106, Near SBI Bank, NH Bypass, Vyttila",
      "addressLocality": "Kochi",
      "addressRegion": "Kerala",
      "postalCode": "682019",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-48440-41177",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Malayalam", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-94477-07855",
        "contactType": "sales",
        "areaServed": "IN",
        "availableLanguage": ["English", "Malayalam", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-85473-27855",
        "contactType": "sales",
        "areaServed": "IN",
        "availableLanguage": ["English", "Malayalam", "Hindi"]
      }
    ],
    "email": ["admin@dynamiccontrolsystems.in", "sales@dynamiccontrolsystems.in"],
    "sameAs": [
      "https://www.facebook.com/dynamiccontrolsystems",
      "https://www.twitter.com/dynamiccontrolsystems",
      "https://www.linkedin.com/company/dynamic-control-systems",
      "https://www.youtube.com/@dynamiccontrolsystems"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "knowsAbout": [
      "Industrial Automation",
      "SCADA Systems",
      "Factory Automation",
      "Process Automation",
      "Industrial IoT",
      "Embedded Systems",
      "Mitsubishi Electric Products",
      "PLC Programming",
      "HMI Systems",
      "Servo Motors",
      "Variable Frequency Drives"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Industrial Automation Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Engineering & Design"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Industrial, Factory & Process Automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SCADA System Integration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Industrial IoT Solution Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Embedded System Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Project Training"
          }
        }
      ]
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://dynamiccontrolsystems.in/#website",
    "url": "https://dynamiccontrolsystems.in",
    "name": "Dynamic Control Systems",
    "description": "Dynamic Control Systems delivers advanced industrial automation, SCADA, and energy solutions powered by Mitsubishi Electric in Kochi.",
    "publisher": {
      "@id": "https://dynamiccontrolsystems.in/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://dynamiccontrolsystems.in/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // LocalBusiness Schema (additional identity)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://dynamiccontrolsystems.in/#localbusiness",
    "name": "Dynamic Control Systems",
    "image": "https://dynamiccontrolsystems.in/dynamic_logo.png",
    "url": "https://dynamiccontrolsystems.in",
    "telephone": "+91-48440-41177",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "52/3106, Near SBI Bank, NH Bypass, Vyttila",
      "addressLocality": "Kochi",
      "addressRegion": "Kerala",
      "postalCode": "682019",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "9.9312",
      "longitude": "76.2673"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  useStructuredData(organizationSchema, "organization-schema");
  useStructuredData(websiteSchema, "website-schema");
  useStructuredData(localBusinessSchema, "localbusiness-schema");
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ProductCarousel />
        <MissionSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
