/**
 * Cotton Haven Australia — Products Catalog Data
 * Centralized data source for all ranges (Corporate, Healthcare, School, etc.)
 * Supports custom overrides saved in localStorage (Admin Interface updates).
 */

const DEFAULT_PRODUCTS = {
  "corporate": {
    categoryName: "Corporate Uniforms",
    products: {
      "polo": {
        name: "Corporate Polo Shirts",
        codePrefix: "CU-POL",
        description: "Premium knit polo shirts designed for everyday business-casual environments.",
        items: [
          { code: "CU-POL-210", name: "Classic 210 Pique Polo", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], colors: ["Navy", "Black", "White", "Charcoal"], fabric: "65% Polyester, 35% Cotton (210gsm)" , image: "assets/images/products/classic_pique_polo.png" },
          { code: "CU-POL-2CP", name: "Contrast Trim Pique Polo", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], colors: ["Black/White", "Navy/White", "Navy/Gold"], fabric: "65% Polyester, 35% Cotton (210gsm)" , image: "assets/images/products/contrast_pique_polo.png" },
          { code: "CU-POL-7COP", name: "Podium Cool Dry Polo", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], colors: ["Royal Blue", "Black", "Navy", "Charcoal"], fabric: "100% Polyester (160gsm, moisture-wicking)" , image: "assets/images/products/cool_dry_polo.png" },
          { code: "CU-POL-2CJ", name: "Classic Cotton Jersey Polo", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], colors: ["Black", "Navy", "White"], fabric: "100% Cotton Jersey (190gsm)" , image: "assets/images/products/cotton_jersey_polo.png" }
        ]
      },
      "shirts": {
        name: "Business Dress Shirts",
        codePrefix: "CU-SHT",
        description: "Premium business shirts featuring wrinkle-resistant finishes, custom collar designs, and elegant stitching.",
        items: [
          { code: "CU-SHT-OXF", name: "Executive Giza Cotton Oxford Shirt", sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], colors: ["Sky Blue", "White", "Charcoal"], fabric: "100% Egyptian Giza Cotton" , image: "assets/images/products/executive_oxford_shirt.png" },
          { code: "CU-SHT-POP", name: "Classic Easy Care Poplin Shirt", sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], colors: ["Light Blue", "White", "Charcoal"], fabric: "65% Polyester, 35% Cotton (Easy Care)" , image: "assets/images/products/classic_poplin_shirt.png" },
          { code: "CU-SHT-STP", name: "Professional Herringbone Stripe Shirt", sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], colors: ["Blue/White Stripe", "White"], fabric: "100% Cotton Herringbone" , image: "assets/images/products/herringbone_stripe_shirt.png" }
        ]
      },
      "blazers": {
        name: "Blazers & Suit Jackets",
        codePrefix: "CU-BLZ",
        description: "Structured, lightweight blazers for men and women. Designed for everyday comfort and professional presentation.",
        items: [
          { code: "CU-BLZ-EXE", name: "Executive Tailored Blazer", sizes: ["34", "36", "38", "40", "42", "44", "46", "48", "50", "52"], colors: ["Navy", "Charcoal", "Black"], fabric: "70% Merino Wool, 28% Polyester, 2% Elastane" , image: "assets/images/products/executive_tailored_blazer.png" },
          { code: "CU-BLZ-MDN", name: "Modern Fit Stretch Blazer", sizes: ["34", "36", "38", "40", "42", "44", "46", "48", "50", "52"], colors: ["Black", "Navy"], fabric: "65% Polyester, 33% Viscose, 2% Elastane" , image: "assets/images/products/modern_stretch_blazer.png" }
        ]
      },
      "pants": {
        name: "Corporate Dress Trousers",
        codePrefix: "CU-PAN",
        description: "Smart tailored trousers and chinos with hidden elastic waist detailing for all-day comfort.",
        items: [
          { code: "CU-PAN-CLS", name: "Classic Flat-Front Trousers", sizes: ["77", "82", "87", "92", "97", "102", "107", "112", "117", "122", "127"], colors: ["Charcoal", "Navy", "Black"], fabric: "65% Polyester, 35% Viscose" , image: "assets/images/products/classic_dress_trousers.png" },
          { code: "CU-PAN-CHN", name: "Smart Casual Stretch Chinos", sizes: ["77", "82", "87", "92", "97", "102", "107", "112", "117", "122", "127"], colors: ["Navy", "Sand", "Slate", "Black"], fabric: "97% Cotton, 3% Elastane" , image: "assets/images/products/smart_stretch_chinos.png" }
        ]
      },
      "outerwear": {
        name: "Corporate Vests & Jackets",
        codePrefix: "CU-OUT",
        description: "Vests, cardigans, and jackets designed to maintain a cohesive brand look during colder months.",
        items: [
          { code: "CU-OUT-SOF", name: "Softshell Tech Jacket", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], colors: ["Black", "Navy"], fabric: "100% Polyester with TPU Waterproof Membrane" , image: "assets/images/products/softshell_tech_jacket.png" },
          { code: "CU-OUT-PST", name: "Executive Puffer Vest", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], colors: ["Charcoal", "Navy", "Black"], fabric: "100% Nylon Shell, Polyester Fill" , image: "assets/images/products/executive_puffer_vest.png" }
        ]
      },
      "womens": {
        name: "Women's Corporate Attire",
        codePrefix: "CU-WMN",
        description: "Contemporary shirts, skirts, and dresses designed for modern corporate environments.",
        items: [
          { code: "CU-WMN-BLZ", name: "Women's Fitted Blazer", sizes: ["4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "26"], colors: ["Navy", "Black", "Charcoal"], fabric: "70% Merino Wool, 28% Polyester, 2% Elastane" , image: "assets/images/products/womens_fitted_blazer.png" },
          { code: "CU-WMN-SKR", name: "Corporate Pencil Skirt", sizes: ["4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "26"], colors: ["Black", "Navy", "Charcoal"], fabric: "65% Polyester, 33% Viscose, 2% Elastane" , image: "assets/images/products/womens_pencil_skirt.png" },
          { code: "CU-WMN-DRS", name: "Executive Shift Dress", sizes: ["4", "6", "8", "10", "12", "14", "16", "18", "20", "22"], colors: ["Navy", "Black"], fabric: "65% Polyester, 33% Viscose, 2% Elastane" , image: "assets/images/products/womens_shift_dress.png" }
        ]
      }
    }
  },
  "healthcare": {
    categoryName: "Healthcare Uniforms",
    products: {
      "scrubs": {
        name: "Premium Medical Scrubs",
        codePrefix: "HC-SCR",
        description: "High-performance medical scrubs designed for hygiene, comfort, and flexibility.",
        items: [
          { code: "HC-SCR-TOP", name: "Comfort Stretch Scrub Top", sizes: ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"], colors: ["Royal Blue", "Navy", "Teal", "Hunter Green"], fabric: "Poly-Cotton-Spandex Stretch with Silvadur™ Antimicrobial finish" , image: "assets/images/products/healthcare_scrubs.jpg" },
          { code: "HC-SCR-PAN", name: "Multi-Pocket Cargo Scrub Pants", sizes: ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"], colors: ["Royal Blue", "Navy", "Teal", "Hunter Green"], fabric: "Poly-Cotton-Spandex Stretch, elastic waistband" , image: "assets/images/products/healthcare_scrubs.jpg" }
        ]
      },
      "coats": {
        name: "Professional Lab Coats",
        codePrefix: "HC-LAB",
        description: "Classic medical lab coats with functional pocket arrays and fluid-resistant coating.",
        items: [
          { code: "HC-LAB-UNS", name: "Unisex Classic Lab Coat", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"], colors: ["White"], fabric: "65% Polyester, 35% Cotton Twill" , image: "assets/images/products/healthcare_labcoat.jpg" },
          { code: "HC-LAB-FMD", name: "Women's Tailored Lab Coat", sizes: ["XS", "S", "M", "L", "XL", "2XL"], colors: ["White"], fabric: "65% Polyester, 35% Cotton Twill" , image: "assets/images/products/healthcare_labcoat.jpg" }
        ]
      }
    }
  },
  "school": {
    categoryName: "School Uniforms",
    products: {
      "polos": {
        name: "School Polo Shirts",
        codePrefix: "SU-POL",
        description: "Durable school polo shirts designed for daily wear and active school yards.",
        items: [
          { code: "SU-POL-KID", name: "Kids Pique School Polo", sizes: ["4", "6", "8", "10", "12", "14", "16"], colors: ["Bottle Green", "Maroon", "Sky Blue", "Navy", "Gold"], fabric: "65% Polyester, 35% Cotton (220gsm)" , image: "assets/images/products/school_polo.jpg" },
          { code: "SU-POL-SEN", name: "Senior Stripe Collar Polo", sizes: ["S", "M", "L", "XL", "2XL"], colors: ["Navy/Sky", "Maroon/White", "Bottle/Gold"], fabric: "65% Polyester, 35% Cotton (220gsm)" , image: "assets/images/products/school_polo.jpg" }
        ]
      },
      "formal": {
        name: "Formal Schoolwear",
        codePrefix: "SU-FOR",
        description: "School shirts, skirts, and blazers tailored for formal dress codes.",
        items: [
          { code: "SU-SHT-WHT", name: "Long Sleeve School Shirt", sizes: ["4", "6", "8", "10", "12", "14", "16", "18", "20"], colors: ["White", "Sky Blue"], fabric: "65% Polyester, 35% Cotton Poplin" , image: "assets/images/products/school_formal.jpg" },
          { code: "SU-SKR-PLE", name: "Pleated School Skirt", sizes: ["4", "6", "8", "10", "12", "14", "16", "18"], colors: ["Navy Tartan", "Grey Tartan", "Bottle Green"], fabric: "Poly-Wool Blend" , image: "assets/images/products/school_formal.jpg" }
        ]
      }
    }
  },
  "hospitality": {
    categoryName: "Hospitality Uniforms",
    products: {
      "chefs": {
        name: "Chef Jackets & Shirts",
        codePrefix: "HP-CHF",
        description: "Professional chef shirts and jackets made with heat-resistant, breathable paneling.",
        items: [
          { code: "HP-CHF-JKT", name: "Executive Chef Jacket", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"], colors: ["White", "Black"], fabric: "100% Cotton with Coolmesh™ ventilation back panel" , image: "assets/images/products/hospitality_chef.jpg" },
          { code: "HP-CHF-SHT", name: "Short Sleeve Chef Utility Shirt", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"], colors: ["Black", "Charcoal"], fabric: "65% Polyester, 35% Cotton Poplin" , image: "assets/images/products/hospitality_chef.jpg" }
        ]
      },
      "aprons": {
        name: "Service & Bar Aprons",
        codePrefix: "HP-APR",
        description: "Highly durable aprons designed with pockets, reinforced stitching, and clean styling.",
        items: [
          { code: "HP-APR-BIB", name: "Urban Canvas Bib Apron", sizes: ["One Size"], colors: ["Tan/Brown Straps", "Black/Tan Straps", "Navy/Brown Straps"], fabric: "100% Cotton Canvas, interchangeable straps" , image: "assets/images/products/hospitality_apron.jpg" },
          { code: "HP-APR-WST", name: "Short Waist Apron", sizes: ["One Size"], colors: ["Black", "Charcoal", "Chocolate"], fabric: "65% Polyester, 35% Cotton Twill" , image: "assets/images/products/hospitality_apron.jpg" }
        ]
      }
    }
  },
  "industrial": {
    categoryName: "Industrial & Workwear",
    products: {
      "hivis": {
        name: "Hi-Vis Safety Wear",
        codePrefix: "IW-HIV",
        description: "AS/NZS compliant high-visibility safety clothing with reflective taping.",
        items: [
          { code: "IW-HIV-SHT", name: "L/S Lightweight Hi-Vis Shirt", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], colors: ["Orange/Navy", "Yellow/Navy"], fabric: "100% Cotton Drill (150gsm, ventilated)" , image: "assets/images/products/industrial_hivis.jpg" },
          { code: "IW-HIV-POL", name: "Podium Hi-Vis Polo", sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], colors: ["Orange/Navy", "Yellow/Navy"], fabric: "100% Polyester Micro knit (Moisture-wicking)" , image: "assets/images/products/industrial_hivis.jpg" }
        ]
      },
      "tough": {
        name: "Industrial Work Pants",
        codePrefix: "IW-PAN",
        description: "Heavy-duty canvas and drill cargo trousers reinforced at stress points.",
        items: [
          { code: "IW-PAN-RUG", name: "Rugged Drill Cargo Pants", sizes: ["72R", "77R", "82R", "87R", "92R", "97R", "102R", "107R", "112R"], colors: ["Navy", "Khaki", "Black"], fabric: "100% Cotton Drill (310gsm)" , image: "assets/images/products/industrial_tough.jpg" },
          { code: "IW-PAN-FLX", name: "Flex Utility Work Pants", sizes: ["72R", "77R", "82R", "87R", "92R", "97R", "102R", "107R", "112R"], colors: ["Navy", "Charcoal", "Black"], fabric: "98% Cotton Drill, 2% Elastane Stretch Canvas" , image: "assets/images/products/industrial_tough.jpg" }
        ]
      }
    }
  },
  "sportswear": {
    categoryName: "Sportswear & Teamwear",
    products: {
      "athletic": {
        name: "Athletic Tops & Shirts",
        codePrefix: "SW-ATH",
        description: "Breathable, sweat-wicking team tees and singlets for training and matches.",
        items: [
          { code: "SW-ATH-TEE", name: "Cool-Dry Athletic Tee", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"], colors: ["Royal Blue", "Red", "Navy", "White", "Black"], fabric: "100% Polyester Quick-Dry Mesh (140gsm)" , image: "assets/images/products/sportswear_athletic.png" },
          { code: "SW-ATH-SNG", name: "Active Mesh Training Singlet", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"], colors: ["Black", "Royal Blue", "Red"], fabric: "100% Polyester Mesh" , image: "assets/images/products/sportswear_athletic.png" }
        ]
      },
      "outer": {
        name: "Team Warm-Up Gear",
        codePrefix: "SW-OUT",
        description: "Track jackets and hoodies for warm-up, travel, and sidelines.",
        items: [
          { code: "SW-OUT-TRK", name: "Classic Track Jacket", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"], colors: ["Navy/White", "Black/White", "Red/Black"], fabric: "100% Polyester Tricot" , image: "assets/images/products/sportswear_outer.jpg" },
          { code: "SW-OUT-HUD", name: "Active Fleece Hoody", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"], colors: ["Charcoal Marl", "Black", "Navy"], fabric: "80% Cotton, 20% Polyester Fleece (290gsm)" , image: "assets/images/products/sportswear_outer.jpg" }
        ]
      }
    }
  },
  "promotional": {
    categoryName: "Promotional Apparel",
    products: {
      "basics": {
        name: "Promotional Tees & Hoods",
        codePrefix: "PA-BSC",
        description: "Budget-friendly, high-thread-count tees and hoodies perfect for printing and customization.",
        items: [
          { code: "PA-BSC-TEE", name: "Value Promo Cotton Tee", sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], colors: ["White", "Black", "Navy", "Royal", "Red", "Grey"], fabric: "100% Carded Cotton (160gsm)" , image: "assets/images/products/promotional_basics.jpg" },
          { code: "PA-BSC-HUD", name: "Promo Fleece Pull-Over Hoodie", sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], colors: ["Black", "Navy", "Grey Marl"], fabric: "50% Cotton, 50% Polyester Fleece" , image: "assets/images/products/promotional_basics.jpg" }
        ]
      },
      "caps": {
        name: "Promo Caps & Headwear",
        codePrefix: "PA-CAP",
        description: "Classic structured and unstructured caps featuring adjustable fasteners.",
        items: [
          { code: "PA-CAP-S5P", name: "Classic 5-Panel Trucker Cap", sizes: ["One Size"], colors: ["Black/White Mesh", "Navy/White Mesh", "All Black"], fabric: "Polyester Front, Nylon Mesh Back" },
          { code: "PA-CAP-TWC", name: "Premium Brushed Cotton Cap", sizes: ["One Size"], colors: ["Navy", "Black", "Charcoal", "Red", "White"], fabric: "100% Brushed Cotton Twill" , image: "assets/images/products/promotional_caps.jpg" }
        ]
      }
    }
  },
  "private-label": {
    categoryName: "Private Label Clothing",
    products: {
      "premium": {
        name: "Premium Label Basics",
        codePrefix: "PL-PRM",
        description: "Ultra-premium garments designed to be rebranded by custom labels, boutiques, and brands.",
        items: [
          { code: "PL-PRM-TEE", name: "Heavyweight Box-Fit Tee", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], colors: ["Vintage Black", "Off-White", "Sage Green", "Taupe"], fabric: "100% Organic Comb Cotton (220gsm, pre-shrunk)" , image: "assets/images/products/privatelabel_premium.jpg" },
          { code: "PL-PRM-HUD", name: "Premium French Terry Hoodie", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], colors: ["Vintage Black", "Off-White", "Sage Green"], fabric: "100% Organic Cotton French Terry (400gsm)" , image: "assets/images/products/privatelabel_premium.jpg" }
        ]
      }
    }
  }
};

/**
 * Retrieves the products dataset. Merges defaults with any modifications saved in localStorage.
 */
function getProductsData() {
  const customData = localStorage.getItem("cotton_haven_products");
  if (customData) {
    try {
      return JSON.parse(customData);
    } catch (e) {
      console.error("Error parsing custom products data from localStorage, using defaults.", e);
      return DEFAULT_PRODUCTS;
    }
  }
  return DEFAULT_PRODUCTS;
}

/**
 * Saves modified products data structure to localStorage.
 * @param {Object} data 
 */
function saveProductsData(data) {
  if (data) {
    localStorage.setItem("cotton_haven_products", JSON.stringify(data));
    return true;
  }
  return false;
}

/**
 * Resets products data back to factory defaults.
 */
function resetProductsData() {
  localStorage.removeItem("cotton_haven_products");
  return true;
}

/**
 * Helper to fetch data for a specific category key.
 * @param {string} categoryId 
 */
function getCategoryData(categoryId) {
  const data = getProductsData();
  return data[categoryId] || null;
}
