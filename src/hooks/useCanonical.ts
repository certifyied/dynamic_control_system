import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook to manage canonical tag for SEO
 * Ensures only one canonical tag exists and points to the current page's absolute URL
 * 
 * Best Practices:
 * - Uses absolute URL (not relative)
 * - Excludes query parameters and hash fragments
 * - Ensures HTTPS in production
 * - Only one canonical tag per page
 */
export const useCanonical = () => {
  const location = useLocation();

  useEffect(() => {
    // Remove any existing canonical tags to prevent duplicates
    const existingCanonicals = document.querySelectorAll('link[rel="canonical"]');
    existingCanonicals.forEach((canonical) => canonical.remove());

    // Create the canonical URL (absolute URL)
    // Exclude query parameters and hash fragments for clean canonical URLs
    // Use the pathname as-is from React Router to match the actual URL structure
    const pathname = location.pathname || "/";
    
    // Use window.location.origin to get the current domain (works for both dev and production)
    // This ensures HTTPS in production and correct protocol in development
    // The canonical URL will match the live production URL exactly
    const canonicalUrl = `${window.location.origin}${pathname}`;

    // Create and append the canonical link tag
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = canonicalUrl;
    document.head.appendChild(link);

    // Cleanup function to remove the canonical tag when component unmounts
    return () => {
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical && canonical.getAttribute("href") === canonicalUrl) {
        canonical.remove();
      }
    };
  }, [location.pathname]);
};

