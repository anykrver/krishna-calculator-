# Design Specification: Brand & Model Page Form Overhaul

This document defines the UI/UX redesign of the brand and model page forms to align with the minimal, clean design pattern established in the "Choose Your Location" (`AreaSearchModal.jsx`) component.

## 1. Core Design Guidelines (Global Design Rules)

To maintain design consistency across the BuyWheels platform:
- **Typography:** Use the standard body font (Nunito) with strict weight hierarchies (Font weights: 500/600 for labels, 700/800 for buttons/headers).
- **Brand Colors:** Use BuyWheels primary orange theme tokens:
  - Selected border: `#FF6A00`
  - Selected light bg: `#FF6A00/10` (or `rgba(255, 106, 0, 0.08)`)
  - Selected solid bg: `#FF6A00` (text white)
  - Hover state border: `#ff7e1a/50` (or gray-300 depending on background)
  - Base border: `#e5e7eb` (gray-200)
  - Base bg: `#f9fafb` (gray-50) or `#ffffff`
- **Spacing & Layout:**
  - Card grids should use responsive auto-fit columns.
  - Interactive elements must support micro-animations (e.g. `transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1)`, scale down on active tap/press).
  - Explicit border-radius of `12px` (rounded-xl) for buttons/pills/cards to match the existing modal architecture.

---

## 2. Redesign Specification: Form Elements

We are replacing the basic HTML `<select>` dropdowns in the enquiry forms with visual, interactive component-based selectors.

### A. "Select Model" Redesign (Visual Card Grid)
Instead of a dropdown, models will be displayed in a responsive grid of card buttons.

- **Layout:** Grid with 2 columns on mobile/small screens, and 3 columns on larger layouts (matching the Choose Your Location city grid).
- **Card Content:**
  - Model Name (bold, `14px`)
  - Ex-Showroom starting price (e.g. `₹10.69 L`) in small orange or gray text.
  - *Optional:* A tiny badge or text indicating body style/fuel (e.g., "SUV (Petrol)").
- **States:**
  - *Unselected:* Border `#e5e7eb` (gray-200), background `#ffffff`, text dark-gray. Hover border `#d1d5db` (gray-300), background `#fafafa`.
  - *Selected:* Border `#FF6A00` (solid orange), background `rgba(255, 106, 0, 0.08)`, text `#FF6A00` (bold), subtle shadow, ring outline.

```jsx
// Card style mock:
style={{
  padding: '12px 14px',
  borderRadius: '12px',
  border: isSelected ? '2px solid #FF6A00' : '1.5px solid #e5e7eb',
  background: isSelected ? 'rgba(255, 106, 0, 0.08)' : '#fff',
  color: isSelected ? '#FF6A00' : '#1e1d1c',
  cursor: 'pointer',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'all 0.2s ease',
  boxShadow: isSelected ? '0 4px 12px rgba(255, 106, 0, 0.1)' : 'none',
}}
```

### B. "Select Variant" Redesign (Interactive Pill Selector)
Instead of a dropdown, variants will be displayed as pill buttons wrapped in a flex-wrap container, just like the Choose Your Location area/locality pills.

- **Layout:** Flex-wrap layout (`display: 'flex', flexWrap: 'wrap', gap: '8px'`).
- **Pill Content:**
  - Variant Name (e.g. `1.0L TSI Ambition MT`)
  - Variant Price tag inline or subtle separator (e.g. `₹12.39 L`)
  - Optional badge for variant fuel (e.g., Petrol / Diesel / CNG / EV).
- **States:**
  - *Unselected:* Border `#e5e7eb` (gray-200), background `#f9fafb` (gray-50), text `#374151` (dark-gray). Hover border `rgba(255, 106, 0, 0.5)`, background `rgba(255, 106, 0, 0.04)`, text `#FF6A00`.
  - *Selected:* Border `#FF6A00` (solid orange), background `#FF6A00` (solid orange), text `#ffffff` (white), font-weight bold, shadow.

```jsx
// Pill style mock:
style={{
  padding: '8px 12px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: 600,
  border: isSelected ? '1.5px solid #FF6A00' : '1.5px solid #e5e7eb',
  background: isSelected ? '#FF6A00' : '#f9fafb',
  color: isSelected ? '#fff' : '#374151',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
}}
```

---

## 3. Targeted Forms for Changes

### 1. `src/pages/BrandPage.jsx`
- **Modal Enquiry Form:**
  - "Select Model": Change from `<select>` to the visual card grid.
  - "Select Variant": Change from `<select>` to the interactive pill list.

### 2. `src/pages/ModelPage.jsx`
- **On-Page Enquiry Section:**
  - "Select Variant": Change from `<select>` to the interactive pill list. (Note: Since we are already on a specific model, we do not need to choose a model, but we should make sure the variant selection matches the new design!)
- **Modal Enquiry Form:**
  - "Select Model": Change from `<select>` to the visual card grid (when the brand has multiple models).
  - "Select Variant": Change from `<select>` to the interactive pill list.

---

## 4. Verification & Testing

1. **Brand Modal Test:** Open `/brand/:slug/enquiry` or click "Get Free Quotes" on any brand page. Confirm that the model and variant choices display as cards and pills, with beautiful select/active styles.
2. **Model Modal Test:** Open `/brand/:slug/:model/enquiry` or click "Get Best Price". Confirm that if multiple models exist, the grid displays. Confirm that variants are rendered as modern pills.
3. **Model On-Page Test:** Scroll to the enquiry section on the Model page. Confirm the variant selection displays as a beautiful pill container.
4. **Form Submit Integration:** Ensure the values selected in the new grid/pills correctly populate state variables (`selectedModel` and `selectedVariant`) so that form submissions still work exactly as intended, saving correct details to Supabase / local confirmations.
