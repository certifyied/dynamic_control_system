import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCanonical } from "@/hooks/useCanonical";
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

  // Generate description based on category, subcategory, and specific product title
  const getProductDescription = (productTitle: string, category: string, productCleanName: string, productFilename: string, subcategory?: string): string => {
    const titleUpper = productTitle.toUpperCase();
    const titleLower = productTitle.toLowerCase();
    const cleanNameLower = productCleanName.toLowerCase();
    const filenameLower = productFilename.toLowerCase();

    // PLC iQ-F Series specific products
    if (subcategory === "PLC iQF") {
      if (titleUpper.includes("FX5S") || filenameLower.includes("fx5s")) {
        return "Mitsubishi Electric in Kochi provides the iQ-F series PLC, a compact and versatile automation solution featuring high-speed processing and extensive I/O capabilities, while also supporting reliable Mitsubishi VFD purchase in Kochi for mid-range automation applications.";
      }
      if ((titleUpper.includes("FX5U") && !titleUpper.includes("FX5UC") && !titleUpper.includes("FX5UJ")) || (filenameLower.includes("fx5u") && !filenameLower.includes("fx5uc") && !filenameLower.includes("fx5uj"))) {
        return "The FX5U PLC iQ-F Series from Mitsubishi Electric delivers compact, high-speed, and cost-effective control for small and medium automation systems. It ensures reliable performance, easy expansion, and smooth integration. For Mitsubishi PLC Purchase in India, FX5U is a smart and scalable solution for modern industries.";
      }
      if (titleUpper.includes("FX5UC") || filenameLower.includes("fx5uc")) {
        return "Mitsubishi Electric in Kochi presents the iQ-F series PLC, a compact and versatile solution with high-speed processing and broad I/O support for mid-range automation needs.";
      }
      if (titleUpper.includes("FX5UJ") || filenameLower.includes("fx5uj")) {
        return "The compact and versatile iQ-F series PLC from Mitsubishi Electric in Kochi delivers high-speed processing and extensive I/O capabilities, ideal for mid-range automation applications.";
      }
      return "Mitsubishi Electric in Kochi offers the iQ-F series PLC, a compact and versatile solution with high-speed processing and wide I/O capabilities for mid-range automation needs.";
    }

    // PLC iQ-R Series specific products
    if (subcategory === "PLC iQR") {
      if (titleUpper.includes("ANALOG MODULES") || cleanNameLower.includes("analog") || filenameLower.includes("analog")) {
        return "The iQ-R Series offers modular design, powerful CPUs, and precision analog modules for complex automation projects. It supports high-speed processing and flexible expansion. Businesses choosing Mitsubishi PLC Purchase in India prefer iQ-R for large-scale and mission-critical applications.";
      }
      if (titleUpper.includes("GENERAL CONTROL CPU") || cleanNameLower.includes("general control cpu") || filenameLower.includes("general control cpu")) {
        return "The advanced iQ-R series PLC from Mitsubishi Electric in Kochi features a modular architecture that supports complex control systems through high-performance CPUs and a wide range of module options, along with dependable support for Mitsubishi VFD purchase in Kochi.";
      }
      if (titleUpper.includes("IO MODULES") || titleUpper.includes("I/O MODULES") || cleanNameLower.includes("io modules") || filenameLower.includes("io modules")) {
        return "The advanced iQ-R series PLC from Mitsubishi Electric in Kochi features a modular architecture, delivering high-performance CPUs and extensive module options to support complex control systems.";
      }
      if (titleUpper.includes("MOTION CONTROL CPU") || cleanNameLower.includes("motion control cpu") || filenameLower.includes("motion control cpu")) {
        return "The advanced iQ-R series PLC from Mitsubishi Electric in Kochi provides modular architecture, high-performance CPUs, and extensive module options to efficiently manage complex control systems.";
      }
      if (titleUpper.includes("MOTION MODULES") || cleanNameLower.includes("motion modules") || filenameLower.includes("motion modules")) {
        return "The advanced iQ-R series PLC from Mitsubishi Electric in Kochi offers a modular architecture, high-performance CPUs, and extensive module options, ideal for managing complex control systems.";
      }
      if (titleUpper.includes("PROCESS CONTROL CPU") || titleUpper.includes("POSITION CONTROL CPU") || cleanNameLower.includes("process control cpu") || filenameLower.includes("process control cpu")) {
        return "The advanced iQ-R series PLC from Mitsubishi Electric in Kochi offers a modular architecture, high-performance CPUs, and an extensive range of modules to support complex control systems, along with reliable options for Mitsubishi VFD purchase in Kochi.";
      }
      if (titleUpper.includes("SAFETY CONTROL CPU") || cleanNameLower.includes("safety control cpu") || filenameLower.includes("safety control cpu")) {
        return "The advanced iQ-R series PLC from Mitsubishi Electric in Kochi offers modular architecture, high-performance CPUs, and extensive module options, designed to support complex control systems.";
      }
      return "The advanced iQ-R series PLC from Mitsubishi Electric in Kochi features a modular architecture, supporting complex control systems with high-performance CPUs and a wide range of module options.";
    }

    // PLC MELSEC Q Series specific products
    if (subcategory === "PLC MELSEC Q Series") {
      if (titleUpper.includes("ANALOG MODULES") || cleanNameLower.includes("analog") || filenameLower.includes("analog")) {
        return "The high-performance MELSEC Q Series PLC from Mitsubishi Electric in Kochi is designed for large-scale automation systems, offering advanced networking and motion control capabilities.";
      }
      if (titleUpper.includes("CPU MODULES") || cleanNameLower.includes("cpu") || filenameLower.includes("cpu")) {
        return "The high-performance MELSEC Q Series PLC from Mitsubishi Electric in Kochi is designed for large-scale automation systems, offering advanced networking and motion control capabilities, along with dependable options for Mitsubishi VFD purchase in Kochi.";
      }
      if (titleUpper.includes("MOTION MODULES") || cleanNameLower.includes("motion") || filenameLower.includes("motion")) {
        return "The MELSEC Q Series is built for advanced motion control and high-speed networking. It delivers accurate synchronization and real-time control. For reliable Mitsubishi PLC Purchase in India, the Q Series is ideal for demanding manufacturing environments.";
      }
      if (titleUpper.includes("NETWORK MODULES") || cleanNameLower.includes("network") || filenameLower.includes("network")) {
        return "The high-performance MELSEC Q Series PLC from Mitsubishi Electric in Kochi is designed for large-scale automation systems, offering advanced networking and motion control capabilities including SCADA programming in Kochi, where reliability, scalability, and real-time control are critical.";
      }
      return "The high-performance MELSEC Q Series PLC from Mitsubishi Electric in Kochi is designed for large-scale automation systems, offering advanced networking and motion control capabilities including SCADA programming in Kochi, where reliability, scalability, and real-time control are critical.";
    }

    // PLC MELSEC F Series specific products
    if (subcategory === "PLC MELSEC F Series") {
      if (titleUpper.includes("FX3S") || cleanNameLower.includes("fx3s") || filenameLower.includes("fx3s")) {
        return "The cost-effective MELSEC F Series PLC from Mitsubishi Electric in Kochi delivers reliable control for small to medium-scale automation applications, featuring a compact and efficient design.";
      }
      if (titleUpper.includes("FX3U") || cleanNameLower.includes("fx3u") || filenameLower.includes("fx3u")) {
        return "The FX3U PLC provides dependable and compact automation control with fast processing and flexible configuration. Companies planning Mitsubishi PLC Purchase in India select FX3U for cost-effective and stable operations.";
      }
      return "The cost-effective MELSEC F Series PLC from Mitsubishi Electric in Kochi delivers reliable control for small to medium-scale automation applications, featuring a compact and efficient design.";
    }

    // PLC MXF Series
    if (subcategory === "PLC MXF Series") {
      return "The cost-effective MELSEC F Series PLC from Mitsubishi Electric in Kochi delivers reliable control for small to medium-scale automation applications, featuring a compact and efficient design.";
    }

    // PLC MXR Series
    if (subcategory === "PLC MXR Series") {
      return "The scalable MXR Series PLC from Mitsubishi Electric in Kochi offers flexible configuration options and robust performance to meet diverse automation requirements.";
    }

    // AC Servo specific products
    if (category === "AC Servo") {

      // 🔥 Check JET first (more specific)
      if (titleUpper.includes("JET") || cleanNameLower.includes("jet") || filenameLower.includes("jet")) {
        return "The JET Series AC Servo ensures precise positioning, smooth motion, and energy-efficient performance. It is perfect for robotics and packaging systems. For enhanced automation with Mitsubishi PLC Purchase in India, JET Series offers seamless compatibility.";
      }

      if (titleUpper.includes("J4") || cleanNameLower.includes("j4") || filenameLower.includes("j4")) {
        return "The high-performance AC servo motor system from Mitsubishi Electric in Kochi delivers exceptional torque control and precise positioning for advanced automation applications.";
      }

      if (titleUpper.includes("JE") || cleanNameLower.includes("je") || filenameLower.includes("je")) {
        return "The high-performance AC servo motor system from Mitsubishi Electric in Kochi delivers exceptional torque control and precise positioning for advanced automation applications.";
      }

      return "The JET Series AC Servo ensures precise positioning, smooth motion, and energy-efficient performance. It is perfect for robotics and packaging systems. For enhanced automation with Mitsubishi PLC Purchase in India, JET Series offers seamless compatibility.";
    }
    // HMI specific products
    if (category === "HMI" || category === "Integrated HMI") {
      if (titleUpper.includes("GOT 2000") || titleUpper.includes("GOT2000") || cleanNameLower.includes("got 2000") || cleanNameLower.includes("got2000") || filenameLower.includes("got 2000") || filenameLower.includes("got2000")) {
        return "The GOT 2000 HMI features an advanced touchscreen for real-time monitoring and easy operator control. It improves productivity and visualization. Businesses opting for Mitsubishi PLC Purchase in India integrate GOT 2000 for efficient automation management.";
      }
      if (titleUpper.includes("GOT 3000") || titleUpper.includes("GOT3000") || cleanNameLower.includes("got 3000") || cleanNameLower.includes("got3000") || filenameLower.includes("got 3000") || filenameLower.includes("got3000")) {
        return "The Human-Machine Interface from Mitsubishi Electric in Kochi features an intuitive touchscreen display that enables seamless operator interaction and real-time system monitoring, while also supporting Mitsubishi VFD purchase in Kochi.";
      }
      if (titleUpper.includes("SIMPLE") || cleanNameLower.includes("simple") || filenameLower.includes("simple")) {
        return "The Human-Machine Interface from Mitsubishi Electric in Kochi features an intuitive touchscreen display, enabling seamless operator interaction and real-time system monitoring.";
      }
      if (titleUpper.includes("SOFTGOT") || titleUpper.includes("SOFT GOT") || cleanNameLower.includes("softgot") || filenameLower.includes("softgot")) {
        return "The Human-Machine Interface from Mitsubishi Electric in Kochi features an intuitive touchscreen display, enabling seamless operator interaction and real-time system monitoring.";
      }
      if (titleUpper.includes("GOC 35") || titleUpper.includes("GOC35") || cleanNameLower.includes("goc 35") || filenameLower.includes("goc 35")) {
        return "The GOC 35 HMI provides user-friendly control and clear system monitoring. It supports reliable communication with PLC systems. For smooth integration during Mitsubishi PLC Purchase in India, GOC 35 is a practical choice.";
      }
      if (titleUpper.includes("GOC 43") || titleUpper.includes("GOC43") || cleanNameLower.includes("goc 43") || filenameLower.includes("goc 43")) {
        return "The Human-Machine Interface from Mitsubishi Electric in Kochi features an intuitive touchscreen display, enabling seamless operator interaction and real-time system monitoring.";
      }
      return "The Human-Machine Interface from Mitsubishi Electric in Kochi features an intuitive touchscreen display, enabling seamless operator interaction and real-time system monitoring.";
    }

    // Inverters specific products
    if (category === "Invertors") {
      if (titleUpper.includes("FR-D700") || cleanNameLower.includes("fr-d700") || filenameLower.includes("fr-d700")) {
        return "The S FR-D700 inverter offers accurate motor speed control and energy savings for industrial machines. It is compact and easy to install. Industries considering Mitsubishi PLC Purchase in India use FR-D700 for improved motor efficiency.";
      }
      if (titleUpper.includes("FR-D800") || cleanNameLower.includes("fr-d800") || filenameLower.includes("fr-d800")) {
        return "The variable frequency drive from Mitsubishi Electric in Kochi delivers precise motor control, improved energy efficiency, and smooth operation across a wide range of industrial applications.";
      }
      if (titleUpper.includes("FR-E800") || cleanNameLower.includes("fr-e800") || filenameLower.includes("fr-e800")) {
        return "The variable frequency drive from Mitsubishi Electric in Kochi provides precise motor control, enhanced energy efficiency, and smooth operation across a wide range of industrial applications, supporting reliable Mitsubishi VFD purchase in Kochi.";
      }
      if (titleUpper.includes("FR-CS") || cleanNameLower.includes("fr-cs") || filenameLower.includes("fr-cs")) {
        return "The variable frequency drive from Mitsubishi Electric in Kochi delivers precise motor control, improved energy efficiency, and smooth operation across a wide range of industrial applications.";
      }
      if (titleUpper.includes("FR-800") || cleanNameLower.includes("fr800") || cleanNameLower.includes("fr-800") || filenameLower.includes("fr800") || filenameLower.includes("fr-800")) {
        return "The variable frequency drive from Mitsubishi Electric in Kochi delivers precise motor control, improved energy efficiency, and smooth operation across a wide range of industrial applications.";
      }
      return "The variable frequency drive from Mitsubishi Electric in Kochi delivers precise motor control, improved energy efficiency, and smooth operation across a wide range of industrial applications.";
    }

    // Low Voltage Power Distribution
    if (category === "Low Voltage Power Distribution") {
      if (titleUpper.includes("ACB") || cleanNameLower.includes("acb") || filenameLower.includes("acb")) {
        return "Mitsubishi ACB solutions ensure safe and efficient low-voltage power protection. They prevent overloads and short circuits in industrial systems. For secure operations with Mitsubishi PLC Purchase in India, ACB systems add reliability";
      }
      if (titleUpper.includes("ELCB") || cleanNameLower.includes("elcb") || filenameLower.includes("elcb")) {
        return "Low-voltage power distribution products from Mitsubishi Electric in Kochi, such as circuit breakers and protection devices, ensure safe, reliable, and efficient electrical systems, while also supporting Mitsubishi VFD purchase in Kochi.";
      }
      if (titleUpper.includes("ME96") || cleanNameLower.includes("me96") || filenameLower.includes("me96")) {
        return "Low-voltage power distribution products from Mitsubishi Electric in Kochi, including circuit breakers and protection devices, deliver safe, reliable, and efficient electrical systems, while also supporting Mitsubishi VFD purchase in Kochi.";
      }
      if (titleUpper.includes("MCB") || titleUpper.includes("MCCB") || titleUpper.includes("MPCB") || titleUpper.includes("OVERLOAD RELAY") || cleanNameLower.includes("mcb") || cleanNameLower.includes("mccb") || cleanNameLower.includes("mpcb") || cleanNameLower.includes("overload") || filenameLower.includes("mcb") || filenameLower.includes("mccb") || filenameLower.includes("mpcb") || filenameLower.includes("overload")) {
        return "Mitsubishi Overload Relays protect motors from overheating and electrical damage. They improve safety and equipment life. During Mitsubishi PLC Purchase in India, overload relays ensure better power management.";
      }
      return "Low-voltage power distribution products from Mitsubishi Electric in Kochi, including circuit breakers and protection devices, ensure safe, reliable, and efficient electrical systems.";
    }

    // Robot specific products
    if (category === "Robot") {
      if (titleUpper.includes("VERTICAL") || cleanNameLower.includes("vertical") || filenameLower.includes("vertical")) {
        return "The industrial robot system from Mitsubishi Electric in Kochi is designed for precision automation, assembly, and material handling applications, delivering high repeatability and consistent performance.";
      }
      if (titleUpper.includes("COLLABORATIVE") || cleanNameLower.includes("collaborative") || filenameLower.includes("collaborative")) {
        return "The industrial robot system from Mitsubishi Electric in Kochi is engineered for precision automation, assembly, and material handling applications, delivering high repeatability and consistent performance, while also supporting Mitsubishi VFD purchase in Kochi.";
      }
      if (titleUpper.includes("HORIZONTAL") || titleUpper.includes("MELFA SMART") || cleanNameLower.includes("horizontal") || cleanNameLower.includes("melfa") || filenameLower.includes("horizontal") || filenameLower.includes("melfa")) {
        return "Horizontal industrial robots deliver high-speed, precise automation for assembly and material handling. They enhance productivity and accuracy. Companies investing in Mitsubishi PLC Purchase in India integrate robots for smart manufacturing.";
      }
      return "The industrial robot system from Mitsubishi Electric in Kochi is designed for precision automation, assembly, and material handling applications, delivering high repeatability and consistent performance.";
    }

    // Software specific the products
    if (category === "Software") {
      if (titleUpper.includes("GT WORKS 3") || cleanNameLower.includes("gt works 3") || filenameLower.includes("gt works 3")) {
        return "The engineering and visualization software suite from Mitsubishi Electric in Kochi enables efficient system design, programming, monitoring, and configuration of automation systems.";
      }
      if (titleUpper.includes("FR-CONFIGURATOR") || cleanNameLower.includes("fr-configurator") || filenameLower.includes("fr-configurator")) {
        return "The engineering and visualization software suite from Mitsubishi Electric in Kochi supports efficient system design, programming, monitoring, and configuration of automation systems, while also enabling reliable Mitsubishi VFD purchase in Kochi.";
      }
      if (titleUpper.includes("GX WORKS 2") || titleUpper.includes("GX WORKS 3") || titleUpper.includes("MR CONFIGURATOR") || titleUpper.includes("GENESIS 64") || titleUpper.includes("VIRTUALIZATION") || cleanNameLower.includes("gx works") || cleanNameLower.includes("mr configurator") || cleanNameLower.includes("genesis") || cleanNameLower.includes("virtualization") || filenameLower.includes("gx works") || filenameLower.includes("mr configurator") || filenameLower.includes("genesis") || filenameLower.includes("virtualization")) {
        return "3D MELSOFT software supports system design, simulation, and PLC programming with advanced visualization tools. It reduces commissioning time and improves accuracy. For complete automation solutions with Mitsubishi PLC Purchase in India, 3D MELSOFT adds powerful engineering support.";
      }
      return "The engineering and visualization software suite from Mitsubishi Electric in Kochi enables efficient system design, programming, monitoring, and configuration of automation systems.";
    }

    // Default fallback
    return "Industrial automation solution from Mitsubishi Electric in Kochi designed for reliability and performance.";
  };

  const description = getProductDescription(title, category, cleanName, nameWithoutExt, subcategory);

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
  const titleUpper = title.toUpperCase();
  const filenameLower = filename.toLowerCase();

  // AC SERVO
  if (category === "AC Servo") {
    if (titleUpper.includes("J4") || filenameLower.includes("j4")) {
      return "https://www.mitsubishielectric.com/fa/in_en/products/drv/servo/items/mr_j4/index.html";
    }
    if (titleUpper.includes("JE") || filenameLower.includes("je")) {
      return "https://www.mitsubishielectric.com/fa/in_en/products/drv/servo/items/mr_je/index.html";
    }
    if (titleUpper.includes("JET") || filenameLower.includes("jet")) {
      return "https://www.mitsubishielectric.com/fa/in_en/products/drv/servo/items/mr_jet/index.html";
    }
    return "https://www.mitsubishielectric.com/fa/products/drv/servo/";
  }

  // SOFTWARE
  if (category === "Software") {
    if (titleUpper.includes("FR-CONFIGURATOR") || titleLower.includes("fr-configurator") || filenameLower.includes("fr-configurator")) {
      return "https://www.mitsubishielectric.com/fa/products/drv/inv/smerit/fr_config/index.html";
    }
    if (titleUpper.includes("GT WORKS 3") || titleLower.includes("gt works 3") || filenameLower.includes("gt works 3")) {
      return "https://www.mitsubishielectric.com/fa/products/hmi/got/smerit/gt_works3/index.html";
    }
    if (titleUpper.includes("GX WORKS 2") || titleLower.includes("gx works 2") || filenameLower.includes("gx works 2")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plceng/smerit/gx_works2/";
    }
    if (titleUpper.includes("GX WORKS 3") || titleLower.includes("gx works 3") || filenameLower.includes("gx works 3")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plceng/smerit/gx_works3/";
    }
    if (titleUpper.includes("MR-CONFIGURATOR") || titleUpper.includes("MR CONFIGURATOR") || titleLower.includes("mr-configurator") || titleLower.includes("mr configurator") || filenameLower.includes("mr configurator")) {
      return "https://www.mitsubishielectric.com/fa/products/drv/servo/smerit/mr2/index.html";
    }
    if (titleUpper.includes("GENESIS 64") || titleLower.includes("genesis 64") || filenameLower.includes("genesis")) {
      return "https://www.mitsubishielectric.com/fa/products/software/visualisation/genesis64/index.html";
    }
    if (titleUpper.includes("VIRTUALIZATION 3D") || titleUpper.includes("3D MELSOFT") || titleLower.includes("virtualization 3d") || titleLower.includes("3d melsoft") || filenameLower.includes("3d")) {
      return "https://www.mitsubishielectric.com/fa/products/software/simulation-tools/gemini/";
    }
    if (titleUpper.includes("MELSOFT RT") || titleUpper.includes("RT TOOLBOX") || titleLower.includes("melsoft rt") || titleLower.includes("rt toolbox") || filenameLower.includes("rt")) {
      return "https://www.mitsubishielectric.com/fa/products/rbt/robot/smerit/rt3/";
    }
    if (titleUpper.includes("MX SHEET") || titleLower.includes("mx sheet") || filenameLower.includes("mx sheet")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plceng/smerit/mx_sheet/";
    }
    return "https://www.mitsubishielectric.com/fa/products/software/visualisation/genesis64/index.html";
  }

  // HMI
  if (category === "HMI") {
    if (titleUpper.includes("GOT 2000") || titleUpper.includes("GOT2000") || filenameLower.includes("got 2000") || filenameLower.includes("got2000")) {
      return "https://www.mitsubishielectric.com/fa/products/hmi/got/items/got2000/index.html";
    }
    if (titleUpper.includes("GOT 3000") || titleUpper.includes("GOT3000") || filenameLower.includes("got 3000") || filenameLower.includes("got3000")) {
      return "https://www.mitsubishielectric.com/fa/products/hmi/got/items/got3000/";
    }
    if (titleUpper.includes("GOT SIMPLE") || titleUpper.includes("SIMPLE") || filenameLower.includes("simple")) {
      return "https://www.mitsubishielectric.com/fa/in_en/products/hmi/got/items/got_simple/index.html";
    }
    if (titleUpper.includes("SOFTGOT") || titleUpper.includes("SOFT GOT") || filenameLower.includes("softgot")) {
      return "https://www.mitsubishielectric.com/fa/in_en/products/hmi/got/items/sgt/index.html";
    }
    return "https://www.mitsubishielectric.com/fa/products/hmi/got/items/got2000/index.html";
  }

  // INTEGRATED HMI
  if (category === "Integrated HMI") {
    if (titleUpper.includes("GOC 35") || titleUpper.includes("GOC35") || filenameLower.includes("goc 35") || filenameLower.includes("goc35")) {
      return "https://mitsubishielectric.in/fa/fa-goc-plc-hmi.html";
    }
    if (titleUpper.includes("GOC 43") || titleUpper.includes("GOC43") || filenameLower.includes("goc 43") || filenameLower.includes("goc43")) {
      return "https://mitsubishielectric.in/fa/GOC43/";
    }
    return "https://mitsubishielectric.in/fa/fa-goc-plc-hmi.html";
  }

  // INVERTERS
  if (category === "Invertors") {
    if (titleUpper.includes("FR-A800") || titleUpper.includes("FR-A 800") || filenameLower.includes("fr-a800") || filenameLower.includes("fr800") || filenameLower.includes("fr-800")) {
      return "https://www.mitsubishielectric.com/fa/products/drv/inv/items/fr_a/index.html";
    }
    if (titleUpper.includes("FR-CS") || filenameLower.includes("fr-cs")) {
      return "https://www.mitsubishielectric.com/fa/in_en/products/drv/inv/items/fr_cs/index.html";
    }
    if (titleUpper.includes("FR-D700") || filenameLower.includes("fr-d700")) {
      return "https://www.mitsubishielectric.com/fa/products/drv/inv/pmerit/fr_d/d707.html";
    }
    if (titleUpper.includes("FR-D800") || filenameLower.includes("fr-d800")) {
      return "https://www.mitsubishielectric.com/fa/products/drv/inv/pmerit/fr_d/d800/";
    }
    if (titleUpper.includes("FR-E800") || filenameLower.includes("fr-e800")) {
      return "https://www.mitsubishielectric.com/fa/in_en/products/drv/inv/items/fr_e/index.html";
    }
    return "https://www.mitsubishielectric.com/fa/products/drv/inv/pmerit/index.html";
  }

  // PLC – iQ-F
  if (subcategory === "PLC iQF") {
    if (titleUpper.includes("FX5S") || filenameLower.includes("fx5s")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcf/pmerit/concept/built_in_function.html";
    }
    if (titleUpper.includes("FX5U") && !titleUpper.includes("FX5UC") && !titleUpper.includes("FX5UJ") || (filenameLower.includes("fx5u") && !filenameLower.includes("fx5uc") && !filenameLower.includes("fx5uj"))) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcf/pmerit/cpu/";
    }
    if (titleUpper.includes("FX5UC") || filenameLower.includes("fx5uc")) {
      return "https://www.mitsubishielectric.com/fa/in_en/products/cnt/plcf/items/index.html";
    }
    if (titleUpper.includes("FX5UJ") || filenameLower.includes("fx5uj")) {
      return "https://www.mitsubishielectric.com/fa/products/faspec/detail.page?kisyu=/plcf&formNm=FX5-_M-E-_FX5UJ-60MT%2FES_3446";
    }
    return "https://www.mitsubishielectric.com/fa/products/cnt/plcf/pmerit/concept/index.html";
  }

  // PLC – iQ-R
  if (subcategory === "PLC iQR") {
    if (titleUpper.includes("ANALOG MODULES") || filenameLower.includes("analog")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcr/pmerit/analog/";
    }
    if (titleUpper.includes("GENERAL CONTROL CPU") || filenameLower.includes("general control cpu")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcr/pmerit/cpu/cpu.html";
    }
    if (titleUpper.includes("IO MODULES") || titleUpper.includes("I/O MODULES") || filenameLower.includes("io modules")) {
      return "https://mitsubishielectric.in/fa/fa-modular-io.html";
    }
    if (titleUpper.includes("MOTION CONTROL CPU") || titleUpper.includes("MOTION MODULES") || filenameLower.includes("motion control cpu") || filenameLower.includes("motion modules")) {
      return "https://www.mitsubishielectric.com/fa/in_en/products/cnt/ssc/index.html";
    }
    if (titleUpper.includes("PROCESS CONTROL CPU") || filenameLower.includes("process control cpu")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcr/pmerit/cpu/process.html";
    }
    if (titleUpper.includes("SAFETY CONTROL CPU") || filenameLower.includes("safety control cpu")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcr/pmerit/cpu/safety.html";
    }
    return "https://www.mitsubishielectric.com/fa/products/cnt/plcr/pmerit/cpu/cpu.html";
  }

  // PLC MELSEC F SERIES
  if (subcategory === "PLC MELSEC F Series") {
    if (titleUpper.includes("FX3S") || filenameLower.includes("fx3s")) {
      return "https://dl.mitsubishielectric.com/dl/fa/document/manual/plc_fx/jy997d48601/jy997d48601g.pdf";
    }
    if (titleUpper.includes("FX3U") || filenameLower.includes("fx3u")) {
      return "https://dl.mitsubishielectric.com/dl/fa/document/manual/plc_fx/jy997d16601/jy997d16601r.pdf";
    }
    return "https://www.mitsubishielectric.com/fa/products/cnt/plc_fx/pmerit/contents/index.html";
  }

  // PLC MELSEC Q SERIES
  if (subcategory === "PLC MELSEC Q Series") {
    if (titleUpper.includes("ANALOG MODULES") || filenameLower.includes("analog")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcq/pmerit/analog/";
    }
    if (titleUpper.includes("CPU MODULES") || filenameLower.includes("cpu modules")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcq/pmerit/cpu/";
    }
    if (titleUpper.includes("MOTION MODULES") || filenameLower.includes("motion modules")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcq/pmerit/motion/";
    }
    if (titleUpper.includes("NETWORK MODULES") || filenameLower.includes("network modules")) {
      return "https://www.mitsubishielectric.com/fa/products/cnt/plcq/pmerit/network/";
    }
    return "https://www.mitsubishielectric.com/fa/products/cnt/plcq/pmerit/concept/index.html";
  }

  // PLC MX SERIES
  if (subcategory === "PLC MXF Series") {
    return "https://www.mitsubishielectric.com/fa/products/cnt/mxc/items/mxcf/index.html";
  }
  if (subcategory === "PLC MXR Series") {
    return "https://www.mitsubishielectric.com/fa/products/cnt/mxc/items/mxcf/index.html";
  }

  // ROBOTS
  if (category === "Robot") {
    if (titleUpper.includes("VERTICAL") || filenameLower.includes("vertical")) {
      return "https://www.mitsubishielectric.com/fa/products/rbt/robot/items/vertical/index.html";
    }
    if (titleUpper.includes("COLLABORATIVE") || filenameLower.includes("collaborative")) {
      return "https://www.mitsubishielectric.com/fa/products/rbt/assista/items/assista/index.html";
    }
    if (titleUpper.includes("HORIZONTAL") || filenameLower.includes("horizontal")) {
      return "https://www.mitsubishielectric.com/fa/products/rbt/robot/items/horizontal/index.html";
    }
    if (titleUpper.includes("MELFA SMART") || filenameLower.includes("melfa smart") || filenameLower.includes("melfa")) {
      return "https://www.mitsubishielectric.com/fa/products/rbt/robot/items/frplus/index.html";
    }
    return "https://www.mitsubishielectric.com/fa/products/rbt/robot/";
  }

  // LOW VOLTAGE POWER DISTRIBUTION
  if (category === "Low Voltage Power Distribution") {
    if (titleUpper.includes("MCB") || filenameLower.includes("mcb")) {
      return "https://emea.mitsubishielectric.com/fa/products/lv_distri/lvc-breakers/mcb";
    }
    if (titleUpper.includes("MCCB") || filenameLower.includes("mccb")) {
      return "https://emea.mitsubishielectric.com/fa/products/lv_distri/lvc-breakers/mccb";
    }
    if (titleUpper.includes("ACB") || filenameLower.includes("acb")) {
      return "https://emea.mitsubishielectric.com/fa/products/lv_distri/lvc-breakers/acb";
    }
    if (titleUpper.includes("ELCB") || filenameLower.includes("elcb")) {
      return "https://emea.mitsubishielectric.com/fa/products/lv_distri/lvc-breakers/elcb";
    }
    if (titleUpper.includes("OVERLOAD RELAY") || filenameLower.includes("overload")) {
      return "https://mitsubishi-electric-eshop.mee.com/mee/FA_IA/en/EUR/Catalogue/LVS/Motor-Control/Overload-Protection-Relays";
    }
    if (titleUpper.includes("MPCB") || filenameLower.includes("mpcb")) {
      return "https://www.mitsubishielectric.com/fa/products/lvd/lvsw/items/mms/index.html";
    }
    if (titleUpper.includes("ME96") || filenameLower.includes("me96")) {
      return "https://dl.mitsubishielectric.com/dl/fa/document/manual/pmd/ib63c46/ib63c46b.pdf";
    }
    return "https://www.mitsubishielectric.com/fa/in_en/products/lvd/index.html";
  }

  // Default fallback
  return "https://www.mitsubishielectric.com/fa/";
};

const Products = () => {
  useCanonical();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Update SEO metadata for Products page
  useEffect(() => {
    // Update document title
    document.title = "Industrial Automation Products | Mitsubishi VFD Purchase in Kochi – Dynamic Control Systems";

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore industrial automation products and Mitsubishi VFD purchase in Kochi with top Mitsubishi VFD drives, PLCs, HMI, and SCADA solutions. Contact us for a quote."
      );
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        "content",
        "Industrial Automation Products | Mitsubishi VFD Purchase in Kochi – Dynamic Control Systems"
      );
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute(
        "content",
        "Explore industrial automation products and Mitsubishi VFD purchase in Kochi with top Mitsubishi VFD drives, PLCs, HMI, and SCADA solutions. Contact us for a quote."
      );
    }

    // Cleanup function to restore default meta tags when component unmounts
    return () => {
      document.title = "SCADA Programming in Kochi";
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          "Dynamic Control Systems delivers reliable industrial automation and SCADA programming in Kochi with Mitsubishi Electric solutions for diverse industries."
        );
      }
      if (ogTitle) {
        ogTitle.setAttribute(
          "content",
          "SCADA Programming in Kochi"
        );
      }
      if (ogDescription) {
        ogDescription.setAttribute(
          "content",
          "Dynamic Control Systems delivers reliable industrial automation and SCADA programming in Kochi with Mitsubishi Electric solutions for diverse industries."
        );
      }
    };
  }, []);

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
