import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight } from "lucide-react";

// Import all product images from dynamic-products folder structure
const productImages = import.meta.glob<{ default: string }>(
  "/src/assets/dynamic-products/**/*.{png,jpg,jpeg,webp,svg}",
  { eager: true }
);

// Category mapping based on folder structure
interface Product {
  image: string;
  filename: string;
  name: string;
  category: string;
  subcategory?: string;
  title: string;
  description: string;
}

// Helper function to extract category and subcategory from path
const getCategoryFromPath = (path: string): { category: string; subcategory?: string } => {
  const pathParts = path.split("/");
  const dynamicProductIndex = pathParts.findIndex(part => part === "dynamic-products");
  
  if (dynamicProductIndex === -1 || dynamicProductIndex === pathParts.length - 1) {
    return { category: "Other" };
  }

  const categoryFolder = pathParts[dynamicProductIndex + 1];
  const filename = pathParts[pathParts.length - 1];

  // Normalize category names (case-insensitive)
  const normalizedCategory = categoryFolder.toLowerCase().trim();

  // Map PLC subcategories (handle various case combinations)
  if (normalizedCategory.includes("iqf") && normalizedCategory.includes("plc")) {
    return { category: "PLC", subcategory: "PLC iQF" };
  }
  if (normalizedCategory.includes("iqr") && normalizedCategory.includes("plc")) {
    return { category: "PLC", subcategory: "PLC iQR" };
  }
  if ((normalizedCategory.includes("melsec q") || normalizedCategory.includes("q series")) && normalizedCategory.includes("plc")) {
    return { category: "PLC", subcategory: "PLC MELSEC Q Series" };
  }
  if ((normalizedCategory.includes("melsec f") || normalizedCategory.includes("f series")) && normalizedCategory.includes("plc")) {
    return { category: "PLC", subcategory: "PLC MELSEC F Series" };
  }
  if (normalizedCategory.includes("mxf") && normalizedCategory.includes("plc")) {
    return { category: "PLC", subcategory: "PLC MXF Series" };
  }
  if (normalizedCategory.includes("mxr") && normalizedCategory.includes("plc")) {
    return { category: "PLC", subcategory: "PLC MXR Series" };
  }

  // Map other categories
  if (normalizedCategory.includes("hmi")) {
    return { category: "HMI" };
  }
  if (normalizedCategory.includes("robot")) {
    return { category: "Robot" };
  }
  if (normalizedCategory.includes("invertor")) {
    return { category: "Invertors" };
  }
  if (normalizedCategory.includes("servo")) {
    return { category: "AC Servo" };
  }
  if (normalizedCategory.includes("software")) {
    return { category: "Software" };
  }
  if (normalizedCategory.includes("integrated hmi") || normalizedCategory.includes("intergrated hmi")) {
    return { category: "Integrated HMI" };
  }
  if (normalizedCategory.includes("low voltage") || normalizedCategory.includes("power")) {
    return { category: "Low Voltage Power Distribution" };
  }

  // Default category based on folder name
  return { category: categoryFolder };
};

// Generate product title and description
const generateProductInfo = (filename: string, category: string, subcategory?: string): { title: string; description: string } => {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  
  // Remove common category and subcategory prefixes from filename
  const cleanName = nameWithoutExt
    .replace(/^(plc|hmi|robot|servo|invertor|software|invertors)\s*/i, "")
    .replace(/^(plc\s+)?(iqf|iqr|melsec\s+[qf]|mxf|mxr)\s+/i, "")
    .replace(/^(low\s+voltage\s+power\s+distribution|integrated\s+hmi|intergrated\s+hmi|engineering\s+software|visualization\s+software|ac\s+servo)\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();

  // Format the product name: capitalize first letter of each word, preserve acronyms and model numbers
  const formatProductName = (name: string): string => {
    if (!name) return name;
    
    // Split by spaces and format each word
    return name
      .split(" ")
      .map(word => {
        // Handle model numbers and product codes (e.g., FX5UJ, FR-D700, GOT 2000)
        // If word contains numbers or dashes with alphanumeric, likely a model number
        if (/\d/.test(word) || /^[a-z]+-[A-Z0-9]+/i.test(word) || /^[a-z]{1,3}[A-Z0-9]+/i.test(word)) {
          return word.toUpperCase();
        }
        // Preserve existing acronyms (all caps, 2+ letters)
        if (/^[A-Z]{2,}$/.test(word)) {
          return word;
        }
        // Preserve mixed case model numbers (e.g., iQF, iQR)
        if (/^[a-z][A-Z]+/.test(word)) {
          return word;
        }
        // Capitalize first letter, lowercase rest for regular words
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  // Generate title - only the product name, without category prefix
  // Fallback to formatted filename if cleanName is empty
  const title = cleanName ? formatProductName(cleanName) : formatProductName(nameWithoutExt);

  // Generate description based on category and product name
  const descriptions: Record<string, Record<string, string>> = {
    "PLC": {
      "iQF": "Compact and versatile iQ-F series PLC offering high-speed processing and extensive I/O capabilities for mid-range automation applications.",
      "iQR": "Advanced iQ-R series PLC with modular architecture, supporting complex control systems with high-performance CPUs and extensive module options.",
      "MELSEC Q Series": "High-performance MELSEC Q Series PLC designed for large-scale automation systems with advanced networking and motion control capabilities.",
      "MELSEC F Series": "Cost-effective MELSEC F Series PLC providing reliable control for small to medium-scale automation applications with compact design.",
      "MXF Series": "Next-generation MXF Series PLC featuring advanced processing power and integrated safety functions for modern industrial automation.",
      "MXR Series": "Scalable MXR Series PLC offering flexible configuration options and robust performance for diverse automation requirements.",
      "default": "Programmable Logic Controller designed for reliable industrial automation with robust communication and control capabilities.",
    },
    "HMI": {
      "default": "Human-Machine Interface with intuitive touchscreen display for seamless operator interaction and real-time system monitoring.",
    },
    "Robot": {
      "default": "Industrial robot system designed for precision automation, assembly, and material handling applications with high repeatability.",
    },
    "Invertors": {
      "default": "Variable frequency drive for precise motor control, energy efficiency, and smooth operation across various industrial applications.",
    },
    "AC Servo": {
      "default": "High-performance AC servo motor system providing exceptional torque control and precise positioning for automation applications.",
    },
    "Software": {
      "default": "Engineering and visualization software suite for system design, programming, monitoring, and configuration of automation systems.",
    },
    "Integrated HMI": {
      "default": "Integrated HMI solution combining display and control functions in a compact design for space-efficient automation applications.",
    },
    "Low Voltage Power Distribution": {
      "default": "Low voltage power distribution products including circuit breakers and protection devices for safe and reliable electrical systems.",
    },
  };

  let description = descriptions[category]?.default || "Industrial automation solution designed for reliability and performance.";

  if (subcategory && descriptions[category]?.[subcategory.replace("PLC ", "")]) {
    description = descriptions[category][subcategory.replace("PLC ", "")];
  } else if (descriptions[category]?.[cleanName.toLowerCase()]) {
    description = descriptions[category][cleanName.toLowerCase()];
  }

  return { title, description };
};

// Process all products
const allProducts: Product[] = Object.entries(productImages).map(([path, module]) => {
  const filename = path.split("/").pop() || "";
  const { category, subcategory } = getCategoryFromPath(path);
  const { title, description } = generateProductInfo(filename, category, subcategory);

  return {
    image: module.default,
    filename: filename,
    name: filename.replace(/\.[^/.]+$/, ""),
    category: category,
    subcategory: subcategory,
    title: title,
    description: description,
  };
});

// Get all unique categories
const allCategories = Array.from(new Set(allProducts.map(p => p.category))).sort();

// PLC subcategories
const plcSubcategories = [
  "PLC iQF",
  "PLC iQR",
  "PLC MELSEC Q Series",
  "PLC MELSEC F Series",
  "PLC MXF Series",
  "PLC MXR Series",
];

// Function to get product URL based on category, subcategory, and title
const getProductUrl = (product: Product): string => {
  const { category, subcategory, title, filename } = product;
  const titleLower = title.toLowerCase();
  const filenameLower = filename.toLowerCase();

  // PLC iQ-F
  if (subcategory === "PLC iQF") {
    return "https://www.mitsubishielectric.com/fa/products/cnt/plcf/pmerit/concept/index.html";
  }

  // PLC iQ-R sub-products
  if (subcategory === "PLC iQR") {
    // Check for specific PLC iQ-R sub-products
    if (titleLower.includes("general control cpu") || filenameLower.includes("general control cpu")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcr/pmerit/cpu/cpu.html";
    }
    if (titleLower.includes("analog modules") || filenameLower.includes("analog modules")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcr/pmerit/analog/";
    }
    if (titleLower.includes("io modules") || titleLower.includes("i/o modules") || filenameLower.includes("io modules")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcr/pmerit/io/";
    }
    if (titleLower.includes("motion control cpu") || filenameLower.includes("motion control cpu")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcr/pmerit/cpu/motion.html";
    }
    if (titleLower.includes("motion modules") || filenameLower.includes("motion modules")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcr/pmerit/motion/";
    }
    if (titleLower.includes("process control cpu") || titleLower.includes("position control cpu") || filenameLower.includes("process control cpu")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcr/pmerit/cpu/process.html";
    }
    if (titleLower.includes("safety control cpu") || filenameLower.includes("safety control cpu")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcr/pmerit/cpu/safety.html";
    }
    if (titleLower.includes("network modules") || filenameLower.includes("network modules")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcr/pmerit/network/";
    }
    // Default for PLC iQ-R (General Control CPU)
    return "https://www.mitsubishielectric.com/fa/products/cnt/plcr/pmerit/cpu/cpu.html";
  }

  // PLC MELSEC Q Series
  if (subcategory === "PLC MELSEC Q Series") {
    return "https://www.mitsubishielectric.com/fa/products/cnt/plcq/pmerit/concept/index.html";
  }

  // PLC MELSEC F Series
  if (subcategory === "PLC MELSEC F Series") {
    return "https://www.mitsubishielectric.com/fa/products/cnt/plc_fx/pmerit/contents/index.html";
  }

  // PLC MX-R Series
  if (subcategory === "PLC MXR Series") {
    return "https://www.mitsubishielectric.com/fa/products/cnt/mxc/items/mxcr/index.html";
  }

  // AC Servo
  if (category === "AC Servo") {
    return "https://www.mitsubishielectric.com/fa/products/drv/servo/";
  }

  // HMI sub-products
  if (category === "HMI") {
    if (titleLower.includes("got2000") || titleLower.includes("got 2000") || filenameLower.includes("got 2000")) {
      return "https://www.mitsubishielectric.com/fa/products/hmi/got/items/got2000/index.html";
    }
    if (titleLower.includes("got3000") || titleLower.includes("got 3000") || filenameLower.includes("got3000")) {
      return "https://www.mitsubishielectric.com/fa/products/hmi/got/items/got3000/index.html";
    }
    if (titleLower.includes("got simple") || titleLower.includes("simple") || filenameLower.includes("simple")) {
      return "https://www.mitsubishielectric.com/fa/products/hmi/got/items/got_simple/index.html";
    }
    if (titleLower.includes("softgot") || titleLower.includes("soft got") || filenameLower.includes("softgot")) {
      return "https://www.mitsubishielectric.com/fa/products/hmi/got/items/sgt/index.html";
    }
    // Default for HMI (GOT2000)
    return "https://www.mitsubishielectric.com/fa/products/hmi/got/items/got2000/index.html";
  }

  // Inverters
  if (category === "Invertors") {
    return "https://www.mitsubishielectric.com/fa/products/drv/inv/pmerit/index.html";
  }

  // Low Voltage Power Distribution
  if (category === "Low Voltage Power Distribution") {
    return "https://www.mitsubishielectric.com/fa/in_en/products/lvd/index.html";
  }

  // Robot
  if (category === "Robot") {
    return "https://www.mitsubishielectric.com/fa/products/rbt/robot/";
  }

  // Integrated HMI
  if (category === "Integrated HMI") {
    // Use HMI GOT2000 as fallback for Integrated HMI
    return "https://www.mitsubishielectric.com/fa/products/hmi/got/items/got2000/index.html";
  }

  // Software
  if (category === "Software") {
    return "https://www.mitsubishielectric.com/fa/products/software/visualisation/genesis64/index.html";
  }

  // Default fallback (should not happen, but safe fallback)
  return "https://www.mitsubishielectric.com/fa/";
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? allProducts.filter(p => p.category === selectedCategory)
    : allProducts;

  // Group products by category and subcategory
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const key = product.subcategory || product.category;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Organize PLC products with subsections
  const organizeProducts = () => {
    const organized: Array<{ name: string; isSubsection: boolean; products: Product[] }> = [];

    // Handle PLC category separately
    if (!selectedCategory || selectedCategory === "PLC") {
      const plcProducts = allProducts.filter(p => p.category === "PLC");
      
      if (plcProducts.length > 0) {
        organized.push({
          name: "PLC",
          isSubsection: false,
          products: [],
        });

        // Add PLC subsections
        plcSubcategories.forEach(subcat => {
          const subcatProducts = plcProducts.filter(p => p.subcategory === subcat);
          if (subcatProducts.length > 0) {
            organized.push({
              name: subcat,
              isSubsection: true,
              products: subcatProducts,
            });
          }
        });
      }
    }

    // Add other categories
    allCategories.forEach(category => {
      if (category !== "PLC" && (!selectedCategory || selectedCategory === category)) {
        const categoryProducts = filteredProducts.filter(p => p.category === category);
        if (categoryProducts.length > 0) {
          organized.push({
            name: category,
            isSubsection: false,
            products: categoryProducts,
          });
        }
      }
    });

    return organized;
  };

  const organizedSections = organizeProducts();

  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="pt-[calc(var(--header-height-mobile)+4rem)] pb-2 md:pt-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-0">
                Products & Solutions
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Category Filter Tabs */}
        <section className="pt-3 pb-4 border-b bg-background sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                All Products
              </Button>
              {allCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products by Section */}
        <section className="pt-4 md:pt-6 pb-20">
          <div className="container mx-auto px-4 space-y-8 md:space-y-10">
            {organizedSections.map((section, sectionIndex) => (
              <motion.div
                key={section.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <div className={`mb-4 md:mb-5 ${section.isSubsection ? "ml-8" : ""}`}>
                  <h2 className={`font-display font-bold mb-1.5 ${section.isSubsection ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"}`}>
                    {section.name}
                  </h2>
                  <div className="w-20 h-1 bg-primary rounded-full" />
                </div>

                {section.products.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.products.map((product, index) => {
                      // Check if this is a PLC iQR product
                      const isPlcIqr = product.subcategory === "PLC iQR";
                      
                      return (
                        <motion.div
                          key={`${product.filename}-${index}`}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                          <Card className="h-full hover-lift cursor-pointer group overflow-hidden flex flex-col">
                            {isPlcIqr ? (
                              // Fixed height container for PLC iQR products - responsive and consistent
                              <div className="w-full h-48 sm:h-56 md:h-64 bg-white flex items-center justify-center p-4 overflow-hidden">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  loading="lazy"
                                  className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/placeholder.svg";
                                  }}
                                />
                              </div>
                            ) : (
                              // Standard aspect ratio container for other products
                              <AspectRatio ratio={16 / 9} className="bg-white">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  loading="lazy"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/placeholder.svg";
                                  }}
                                />
                              </AspectRatio>
                            )}
                            <CardContent className="p-6 flex-1 flex flex-col">
                              <Badge variant="secondary" className="mb-4">
                                {product.subcategory || product.category}
                              </Badge>
                              
                              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                                {product.title}
                              </h3>
                              
                              <p className="text-muted-foreground mb-4 text-sm flex-1">
                                {product.description}
                              </p>

                              <Button 
                                size="sm" 
                                className="w-full"
                                asChild
                              >
                                <a
                                  href={getProductUrl(product)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Details
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ))}

            {organizedSections.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
