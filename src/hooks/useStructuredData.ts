import { useEffect } from "react";

/**
 * Hook to add Schema.org structured data (JSON-LD) to the page
 * This helps search engines understand the content and improves SEO
 */
export const useStructuredData = (schema: object, id?: string) => {
  useEffect(() => {
    // Remove existing script with the same ID if it exists
    const existingScript = id 
      ? document.getElementById(id)
      : document.querySelector('script[type="application/ld+json"]');
    
    if (existingScript) {
      existingScript.remove();
    }

    // Create and append the JSON-LD script
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id || "structured-data";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      const scriptToRemove = id 
        ? document.getElementById(id)
        : document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [schema, id]);
};

