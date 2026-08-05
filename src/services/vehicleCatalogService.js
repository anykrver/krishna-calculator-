// ── Single Unified Vehicle Database Store & Service ─────────────────────
import { supabase } from '../lib/supabaseClient';

export const UNIFIED_VEHICLE_DATABASE = {
  'Mahindra': [
    { name: 'Scorpio-N', type: 'SUV', fuel: 'Petrol/Diesel', price: '₹13.49 - ₹24.95 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/scorpio/mahindra-scorpio-3-1767930813.png?w=220&q=50' },
    { name: 'Thar', type: 'Off-road SUV', fuel: 'Petrol/Diesel', price: '₹11.35 - ₹17.60 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/thar/mahindra-thar-8-1771924749.png?w=220&q=50' },
    { name: 'XUV700', type: 'SUV', fuel: 'Petrol/Diesel', price: '₹13.99 - ₹26.99 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xuv-7xo/mahindra-xuv-7xo-0-1768365160.png?w=220&q=50' },
    { name: 'XUV3XO', type: 'SUV', fuel: 'Petrol/Diesel', price: '₹7.49 - ₹15.49 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xuv3xo/mahindra-xuv3xo-0-1716461406.png?w=220&q=50' },
    { name: 'Bolero', type: 'SUV', fuel: 'Diesel', price: '₹9.79 - ₹11.44 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/bolero/mahindra-bolero-0-1716461406.png?w=220&q=50' },
    { name: 'BE 6e', type: 'Electric SUV', fuel: 'Electric', price: '₹18.90 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/be-6e/mahindra-be-6e-4-1767931326.png?w=220&q=50' },
    { name: 'Scorpio Classic', type: 'SUV', fuel: 'Diesel', price: '₹12.74 - ₹16.99 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/scorpio/mahindra-scorpio-0-1716461406.png?w=220&q=50' },
  ],
  'Maruti Suzuki': [
    { name: 'Swift', type: 'Hatchback', fuel: 'Petrol', price: '₹6.49 - ₹9.64 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/swift/maruti-swift-7-1767861017.png?w=220&q=50' },
    { name: 'Dzire', type: 'Sedan', fuel: 'Petrol', price: '₹6.79 - ₹10.00 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/dzire/maruti-dzire-0-1784199426.png?w=220&q=50' },
    { name: 'Fronx', type: 'SUV', fuel: 'Petrol', price: '₹7.51 - ₹13.07 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/fronx/maruti-fronx-7-1766215192.png?w=220&q=50' },
    { name: 'Brezza', type: 'SUV', fuel: 'Petrol', price: '₹8.34 - ₹14.14 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/brezza/maruti-brezza-0-1716461406.png?w=220&q=50' },
    { name: 'Baleno', type: 'Hatchback', fuel: 'Petrol', price: '₹6.61 - ₹10.12 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/baleno/maruti-baleno-4-1766214578.png?w=220&q=50' },
    { name: 'Wagon R', type: 'Hatchback', fuel: 'Petrol', price: '₹5.54 - ₹7.59 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/wagon-r/maruti-wagon-r-4-1767860860.png?w=220&q=50' },
    { name: 'Grand Vitara', type: 'SUV', fuel: 'Hybrid', price: '₹10.99 - ₹20.35 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/grand-vitara/maruti-grand-vitara-8-1766738694.png?w=220&q=50' },
    { name: 'Ertiga', type: 'MPV', fuel: 'Petrol', price: '₹8.69 - ₹13.02 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/ertiga/maruti-ertiga-4-1767874534.png?w=220&q=50' },
    { name: 'Alto K10', type: 'Hatchback', fuel: 'Petrol', price: '₹3.99 - ₹5.96 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/alto-k10/maruti-alto-k10-10-1766734886.png?w=220&q=50' },
    { name: 'Invicto', type: 'MPV', fuel: 'Hybrid', price: '₹25.21 - ₹29.01 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/invicto/maruti-invicto-5-1766739546.png?w=220&q=50' },
  ],
  'Tata': [
    { name: 'Nexon', type: 'SUV', fuel: 'Petrol/Diesel', price: '₹7.99 - ₹15.80 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/nexon/tata-nexon-0-1784198581.png?w=220&q=50' },
    { name: 'Punch', type: 'SUV', fuel: 'Petrol', price: '₹6.13 - ₹9.54 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/punch/tata-punch-0-1769487768.png?w=220&q=50' },
    { name: 'Harrier', type: 'SUV', fuel: 'Diesel', price: '₹15.49 - ₹26.44 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/harrier/tata-harrier-0-1767931818.png?w=220&q=50' },
    { name: 'Safari', type: 'SUV', fuel: 'Diesel', price: '₹16.19 - ₹27.34 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/safari/tata-safari-0-1766207185.png?w=220&q=50' },
    { name: 'Altroz', type: 'Hatchback', fuel: 'Petrol/Diesel', price: '₹6.60 - ₹10.74 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/altroz/tata-altroz-0-1766141604.png?w=220&q=50' },
    { name: 'Curvv EV', type: 'Electric SUV', fuel: 'Electric', price: '₹17.49 - ₹21.99 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/curvv-ev/tata-curvv-ev-0-1779435606.png?w=220&q=50' },
    { name: 'Punch EV', type: 'Electric SUV', fuel: 'Electric', price: '₹9.99 - ₹14.49 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/punch-ev/tata-punch-ev-0-1766207431.png?w=220&q=50' },
    { name: 'Tiago', type: 'Hatchback', fuel: 'Petrol', price: '₹5.60 - ₹8.29 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/tiago/tata-tiago-1-1767932223.png?w=220&q=50' },
  ],
  'Hyundai': [
    { name: 'Creta', type: 'SUV', fuel: 'Petrol/Diesel', price: '₹11.00 - ₹20.15 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/creta/hyundai-creta-1-1766205711.png?w=220&q=50' },
    { name: 'Venue', type: 'SUV', fuel: 'Petrol/Diesel', price: '₹7.94 - ₹13.38 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/venue/hyundai-venue-0-1771412163.png?w=220&q=50' },
    { name: 'Exter', type: 'Micro SUV', fuel: 'Petrol/CNG', price: '₹6.13 - ₹10.23 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/exter/hyundai-exter-5-1776074667.png?w=220&q=50' },
    { name: 'i20', type: 'Hatchback', fuel: 'Petrol/Diesel', price: '₹7.04 - ₹11.21 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/i20/hyundai-i20-0-1785148547.png?w=220&q=50' },
    { name: 'Verna', type: 'Sedan', fuel: 'Petrol', price: '₹10.90 - ₹17.38 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/verna/hyundai-verna-0-1773131163.png?w=220&q=50' },
    { name: 'Grand i10 Nios', type: 'Hatchback', fuel: 'Petrol/CNG', price: '₹5.92 - ₹9.12 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/grand-i10-nios/hyundai-grand-i10-nios-0-1766214369.png?w=220&q=50' },
    { name: 'Aura', type: 'Compact Sedan', fuel: 'Petrol/CNG', price: '₹6.35 - ₹9.22 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/aura/hyundai-aura-7-1773214499.png?w=220&q=50' },
    { name: 'Alcazar', type: '3-Row SUV', fuel: 'Petrol/Diesel', price: '₹14.99 - ₹21.46 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/alcazar/hyundai-alcazar-8-1766205340.png?w=220&q=50' },
  ],
  'Toyota': [
    { name: 'Fortuner', type: 'SUV', fuel: 'Diesel', price: '₹33.43 - ₹51.44 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/fortuner/toyota-fortuner-1-1776075677.png?w=220&q=50' },
    { name: 'Innova Hycross', type: 'MPV', fuel: 'Hybrid', price: '₹18.99 - ₹30.86 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/innova-hycross/toyota-innova-hycross-0-1766224163.png?w=220&q=50' },
    { name: 'Urban Cruiser Taisor', type: 'SUV', fuel: 'Petrol', price: '₹7.74 - ₹13.54 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/urban-cruiser-taisor/toyota-urban-cruiser-taisor-1-1767870717.png?w=220&q=50' },
    { name: 'Glanza', type: 'Hatchback', fuel: 'Petrol', price: '₹6.72 - ₹10.42 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/glanza/toyota-glanza-0-1766224097.png?w=220&q=50' },
    { name: 'Camry', type: 'Sedan', fuel: 'Hybrid', price: '₹48.48 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/camry/toyota-camry-0-1766223940.png?w=220&q=50' },
  ],
  'Kia': [
    { name: 'Seltos', type: 'SUV', fuel: 'Petrol/Diesel', price: '₹10.89 - ₹20.65 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/kia/seltos/kia-seltos-0-1768365864.png?w=220&q=50' },
    { name: 'Sonet', type: 'SUV', fuel: 'Petrol/Diesel', price: '₹7.99 - ₹15.89 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/kia/sonet/kia-sonet-0-1769856950.png?w=220&q=50' },
    { name: 'Carens', type: 'MPV', fuel: 'Petrol/Diesel', price: '₹10.44 - ₹19.99 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/kia/carens/kia-carens-0-1769857022.png?w=220&q=50' },
    { name: 'EV6', type: 'Electric SUV', fuel: 'Electric', price: '₹60.97 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/kia/ev6/kia-ev6-5-1766210337.png?w=220&q=50' },
  ],
  'Honda': [
    { name: 'Amaze', type: 'Compact Sedan', fuel: 'Petrol', price: '₹7.92 - ₹9.86 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/honda/amaze/honda-amaze-0-1766208026.png?w=220&q=50' },
    { name: 'Elevate', type: 'SUV', fuel: 'Petrol', price: '₹11.91 - ₹16.51 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/honda/elevate/honda-elevate-1-1775644183.png?w=220&q=50' },
    { name: 'City', type: 'Sedan', fuel: 'Petrol', price: '₹12.08 - ₹16.35 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/honda/city-facelift/honda-city-facelift-1-1779451234.png?w=220&q=50' },
  ],
  'MG': [
    { name: 'Windsor EV', type: 'Electric SUV', fuel: 'Electric', price: '₹13.50 - ₹15.50 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/windsor-ev/mg-windsor-ev-1-1781267952.png?w=220&q=50' },
    { name: 'Hector', type: 'SUV', fuel: 'Petrol/Diesel', price: '₹14.73 - ₹21.41 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/hector/mg-hector-0-1769857188.png?w=220&q=50' },
    { name: 'Astor', type: 'SUV', fuel: 'Petrol', price: '₹9.98 - ₹16.79 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/astor/mg-astor-2-1767854900.png?w=220&q=50' },
    { name: 'Comet EV', type: 'Electric Hatchback', fuel: 'Electric', price: '₹6.99 - ₹9.49 Lakh*', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/comet-ev/mg-comet-ev-0-1767868185.png?w=220&q=50' },
  ]
};

/**
 * Single Unified Service for fetching vehicles across all components.
 * Queries Supabase database first, and seamlessly falls back to UNIFIED_VEHICLE_DATABASE.
 */
export async function getUnifiedVehiclesByBrand(brandName) {
  if (!brandName) return [];

  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .ilike('brand', brandName);

      if (!error && data && data.length > 0) {
        return data.map(v => ({
          name: v.model || v.name,
          type: v.type || v.body_type || 'Vehicle',
          fuel: v.fuel || 'Petrol',
          price: v.price || 'Contact Dealer',
          img: v.image_url || v.img || ''
        }));
      }
    }
  } catch (err) {
    console.warn('Supabase database query notice (using unified fallback store):', err);
  }

  // Unified fallback database store
  return UNIFIED_VEHICLE_DATABASE[brandName] || UNIFIED_VEHICLE_DATABASE['Maruti Suzuki'];
}
