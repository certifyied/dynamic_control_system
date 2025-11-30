# Changelog

## [Unreleased] - Website Content Updates

### Changed

#### 1. Investors Page → Clients Page
- **Route**: Changed `/investors` to `/clients` in `src/App.tsx`
- **Navigation**: Updated navigation menu item from "Investors" to "Clients" in `src/components/Navigation.tsx`
- **Page Component**: 
  - Deleted `src/pages/Investors.tsx`
  - Created `src/pages/Clients.tsx` with new client card layout
  - Client cards display images from `src/assets/Clients/` directory
  - Each card shows the image and filename (without extension) as the client name
  - Images are lazy-loaded with `loading="lazy"` attribute
  - Alt attributes use the image filename for accessibility
  - Uses the same card markup, CSS classes (`Card`, `CardContent`, `AspectRatio`), and responsive grid layout (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) as existing product pages

#### 2. Hero Banner Image
- **File**: `src/components/home/HeroSection.tsx`
- **Change**: Updated hero image import from `hero-industrial.jpg` to `hero_banner.jpg`
- **Location**: Image sourced from `src/assets/hero_banner.jpg`
- **Preserved**: All existing styling, overlay text, CTA buttons, and responsive behavior remain intact
- **Accessibility**: Maintains existing background-image implementation with CSS

#### 3. Products Page Restructure
- **File**: `src/pages/Products.tsx`
- **Sections**: Replaced old product categories (Factory Automation, Building Systems, Energy Solutions, Transportation, Home Appliances) with new sections in this exact order:
  1. PLC
  2. HMI
  3. Invertors
  4. Motion control
  5. Software
  6. MELSEC
  7. Robot
  8. Genesis
  9. Servo
- **Image Matching**: 
  - Products are automatically categorized based on filename patterns
  - PLC: files containing "plc" (excluding software)
  - HMI: files containing "hmi"
  - Invertors: files containing "inverter" or "invert"
  - Motion control: files containing "motion-control" or "motion control"
  - Software: files containing "software"
  - MELSEC: files containing "melsec" (excluding plc and software)
  - Robot: files containing "robot"
  - Genesis: files containing "genesis"
  - Servo: files containing "servo"
- **Product Cards**:
  - Maintains existing card structure (`Card`, `CardContent`, `AspectRatio`)
  - Same responsive grid layout (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
  - Images lazy-loaded with `loading="lazy"`
  - Alt attributes derived from filenames
  - Each card displays:
    - Section badge
    - Product title (section name + filename)
    - Generated product description (2-3 sentences)
    - Image filename as metadata
    - Datasheet and Details buttons
- **Search Functionality**: Updated to search across all sections and products
- **Image Source**: All images from `src/assets/products/` directory

### Technical Details

- **Image Loading**: Uses Vite's `import.meta.glob` for dynamic image imports
- **Responsive Design**: All changes maintain existing breakpoints and responsive behavior
- **Accessibility**: 
  - Alt attributes added to all images
  - Lazy loading implemented for performance
- **Performance**: Images are optimized and lazy-loaded to match existing card image sizes

### Files Changed
- `src/App.tsx` - Updated route from `/investors` to `/clients`
- `src/components/Navigation.tsx` - Updated nav link text and path
- `src/components/home/HeroSection.tsx` - Updated hero image import
- `src/pages/Clients.tsx` - New file (replaces Investors.tsx)
- `src/pages/Products.tsx` - Complete restructure with new sections
- `src/pages/Investors.tsx` - Deleted

### Revert Instructions

If any issues arise, revert by:
1. Restore `src/pages/Investors.tsx` from git history
2. Revert route in `src/App.tsx` to `/investors`
3. Revert navigation link in `src/components/Navigation.tsx`
4. Revert hero image in `src/components/home/HeroSection.tsx` to `hero-industrial.jpg`
5. Restore previous `src/pages/Products.tsx` from git history
6. Delete `src/pages/Clients.tsx`

