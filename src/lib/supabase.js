import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Use fallback placeholders if environment variables are missing during static build/run
// to prevent the application from crashing at startup with a white screen.
const supabaseUrl = rawUrl || 'https://placeholder-url.supabase.co';
const supabaseKey = rawKey || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const CAR_CATALOG = {
  'Maruti Suzuki': [
    {
      name: 'Swift',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/maruti/swift/maruti-swift-7-1767861017.png',
      variants: ['LXI', 'VXI', 'ZXI', 'ZXI+ (O)', 'VXI AMT', 'ZXI CNG']
    },
    {
      name: 'Dzire',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/maruti/dzire/maruti-dzire-0-1784199426.png',
      variants: ['LXI', 'VXI', 'ZXI', 'ZXI+ AMT', 'VXI CNG', 'ZXI CNG']
    },
    {
      name: 'Brezza',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/maruti/brezza-facelift/maruti-brezza-facelift-0-1777021932.png',
      variants: ['LXI', 'VXI', 'ZXI', 'ZXI+ Dual Tone', 'ZXI AT', 'ZXI CNG']
    },
    {
      name: 'Fronx',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/maruti/fronx/maruti-fronx-7-1766215192.png',
      variants: ['Sigma 1.2L', 'Delta 1.2L', 'Delta+ 1.2L', 'Zeta 1.0 Turbo', 'Alpha 1.0 AT']
    },
    {
      name: 'Baleno',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/maruti/baleno/maruti-baleno-4-1766214578.png',
      variants: ['Sigma', 'Delta', 'Zeta', 'Alpha', 'Delta AGS', 'Alpha AGS']
    },
    {
      name: 'Grand Vitara',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/maruti/grand-vitara/maruti-grand-vitara-8-1766738694.png',
      variants: ['Sigma', 'Delta', 'Zeta', 'Alpha', 'Zeta+ Hybrid', 'Alpha+ Hybrid AWD']
    },
    {
      name: 'Ertiga',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/maruti/ertiga/maruti-ertiga-4-1767874534.png',
      variants: ['LXI', 'VXI', 'ZXI', 'ZXI+', 'VXI CNG', 'ZXI CNG']
    },
    {
      name: 'Wagon R',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/maruti/wagon-r/maruti-wagon-r-4-1767860860.png',
      variants: ['LXI 1.0', 'VXI 1.0', 'ZXI 1.2', 'ZXI+ AGS', 'LXI CNG']
    },
    {
      name: 'Alto K10',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/maruti/alto-k10/maruti-alto-k10-10-1766734886.png',
      variants: ['STD', 'LXI', 'VXI', 'VXI+ AGS', 'VXI CNG']
    },
    {
      name: 'XL6',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/maruti/xl6/maruti-xl6-6-1766216359.png',
      variants: ['Zeta', 'Alpha', 'Alpha+', 'Zeta AT', 'Alpha+ AT']
    },
    {
      name: 'Celerio',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/maruti/celerio/maruti-celerio-7-1767875043.png',
      variants: ['LXI', 'VXI', 'ZXI', 'ZXI+ AMT', 'VXI CNG']
    },
    {
      name: 'Jimny',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/maruti/jimny/maruti-jimny-1-1767861206.png',
      variants: ['Zeta 4x4', 'Alpha 4x4', 'Alpha 4x4 AT', 'Thunder Edition']
    },
    {
      name: 'Invicto',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/maruti/invicto/maruti-invicto-5-1766739546.png',
      variants: ['Zeta+ 7-Seater', 'Zeta+ 8-Seater', 'Alpha+ 7-Seater']
    },
    {
      name: 'Eeco',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/maruti/eeco/maruti-eeco-5-1766736854.png',
      variants: ['5-Seater STD', '7-Seater STD', '5-Seater AC', '5-Seater AC CNG']
    },
    {
      name: 'S-Presso',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/maruti/s-presso/maruti-s-presso-3-1766740577.png',
      variants: ['STD', 'LXI', 'VXI', 'VXI+ AGS', 'LXI CNG']
    }
  ],
  'Tata': [
    {
      name: 'Sierra',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/sierra/tata-sierra-0-1768365444.png',
      variants: ['Smart 1.5', 'Pure 1.5', 'Creative 1.5', 'Fearless 1.5 DCA', 'Accomplished+ 1.5']
    },
    {
      name: 'Punch',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/punch/tata-punch-0-1769487768.png',
      variants: ['Pure', 'Adventure', 'Accomplished', 'Creative Flagship', 'iCNG Twin Cylinder']
    },
    {
      name: 'Nexon',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/nexon/tata-nexon-0-1784198581.png',
      variants: ['Smart', 'Pure', 'Creative', 'Fearless+ S', 'Creative DCA', 'Fearless+ Dark']
    },
    {
      name: 'Harrier',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/harrier/tata-harrier-0-1766203373.png',
      variants: ['Smart', 'Pure+', 'Adventure+', 'Fearless+ Dark AT', 'Fearless+ Sunroof']
    },
    {
      name: 'Safari',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/safari/tata-safari-0-1769770726.png',
      variants: ['Smart', 'Pure+', 'Adventure+', 'Accomplished+ Dark', 'Accomplished+ 6-Seater AT']
    },
    {
      name: 'Curvv',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/curvv/tata-curvv-0-1769674441.png',
      variants: ['Smart', 'Pure+', 'Creative S', 'Accomplished+ S DCA', 'Empowered+ A']
    },
    {
      name: 'Altroz',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/altroz/tata-altroz-0-1766141604.png',
      variants: ['XE', 'XM+', 'XZ', 'XZ+ i-Turbo', 'Racer R1', 'Racer R3']
    },
    {
      name: 'Tiago',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/tiago-facelift/tata-tiago-facelift-0-1779969867.png',
      variants: ['XE', 'XT', 'XZ+', 'XT iCNG', 'XZ+ iCNG AMT']
    },
    {
      name: 'Tigor',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/tigor/tata-tigor-0-1769767058.png',
      variants: ['XE', 'XM', 'XZ+', 'XZ+ iCNG', 'XZ+ iCNG AMT']
    },
    {
      name: 'Punch EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/punch-ev/tata-punch-ev-0-1772877841.png',
      variants: ['Smart 25', 'Smart+ 25', 'Adventure 35', 'Empowered+ 35 LR']
    },
    {
      name: 'Nexon EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/nexon-ev/tata-nexon-ev-0-1769491378.png',
      variants: ['Creative+ MR', 'Fearless+ LR', 'Empowered+ LR', 'Dark Edition LR']
    },
    {
      name: 'Sierra EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/sierra-ev/tata-sierra-ev-0-1782897309.png',
      variants: ['Standard Range', 'Long Range AWD', 'Empowered Edition']
    }
  ],
  'Mahindra': [
    {
      name: 'Scorpio-N',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/scorpio/mahindra-scorpio-3-1767930813.png',
      variants: ['Z2', 'Z4', 'Z6', 'Z8', 'Z8L 4XPLOR AT', 'Z8 Select']
    },
    {
      name: 'Thar',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/thar/mahindra-thar-8-1771924749.png',
      variants: ['AX (P) Convertible', 'LX Hard Top 4x4', 'RWD Diesel MT', 'Earth Edition 4x4', 'RWD Petrol AT']
    },
    {
      name: 'Thar Roxx (5-Door)',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/thar-roxx/mahindra-thar-roxx-3-1767849893.png',
      variants: ['MX1 RWD', 'MX3 Petrol AT', 'AX3L Diesel', 'AX5L 4x4', 'AX7L 4x4 AT']
    },
    {
      name: 'XUV700',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xuv-7xo/mahindra-xuv-7xo-0-1768365160.png',
      variants: ['MX', 'AX3', 'AX5', 'AX7', 'AX7 Luxury Pack AWD', 'Blaze Edition']
    },
    {
      name: 'XUV 3XO',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xuv-3xo/mahindra-xuv-3xo-5-1767875397.png',
      variants: ['MX1', 'MX2 Pro', 'MX3 TCMPFi', 'AX5', 'AX7 Luxury TGDi']
    },
    {
      name: 'Scorpio Classic',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/scorpio-classic/mahindra-scorpio-classic-0-1767930945.png',
      variants: ['S', 'S11 9-Seater', 'S11 7-Seater']
    },
    {
      name: 'Bolero',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/bolero/mahindra-bolero-0-1768637292.png',
      variants: ['B4', 'B6', 'B6 (O)']
    },
    {
      name: 'Bolero Neo',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/bolero-neo/mahindra-bolero-neo-0-1768637392.png',
      variants: ['N4', 'N8', 'N10', 'N10 (O) Multi-Terrain Tech']
    },
    {
      name: 'XEV 9e',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xev-9e/mahindra-xev-9e-0-1767875526.png',
      variants: ['Pack 1 59kWh', 'Pack 2 79kWh', 'Luxury Pack 79kWh']
    },
    {
      name: 'BE 6e',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/be-6e/mahindra-be-6e-4-1767931326.png',
      variants: ['Pack 1 59kWh', 'Pack 2 79kWh', 'Rall-E Edition']
    }
  ],
  'Mahindra EV': [
    {
      name: 'XEV 9e',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xev-9e/mahindra-xev-9e-0-1767875526.png',
      variants: ['Pack 1 59kWh', 'Pack 2 79kWh', 'Luxury Pack 79kWh']
    },
    {
      name: 'BE 6e',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/be-6e/mahindra-be-6e-4-1767931326.png',
      variants: ['Pack 1 59kWh', 'Pack 2 79kWh', 'Rall-E Edition']
    },
    {
      name: 'XUV400 EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xuv-3xo/mahindra-xuv-3xo-5-1767875397.png',
      variants: ['EC Pro 34.5kWh', 'EL Pro 34.5kWh', 'EL Pro 39.4kWh']
    },
    {
      name: 'BE 05',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/be-6e/mahindra-be-6e-4-1767931326.png',
      variants: ['Concept Pack 60kWh', 'Dual Motor AWD']
    }
  ],
  'Tata EV': [
    {
      name: 'Nexon EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/nexon-ev/tata-nexon-ev-0-1769491378.png',
      variants: ['Creative Medium Range', 'Fearless Long Range', 'Empowered+ Long Range']
    },
    {
      name: 'Punch EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/punch-ev/tata-punch-ev-0-1772877841.png',
      variants: ['Smart 25kWh', 'Adventure 35kWh', 'Empowered+ 35kWh']
    },
    {
      name: 'Curvv EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/curvv/tata-curvv-0-1769674441.png',
      variants: ['Creative 45kWh', 'Accomplished 55kWh', 'Empowered+ 55kWh']
    },
    {
      name: 'Tiago EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/tata/tiago-facelift/tata-tiago-facelift-0-1779969867.png',
      variants: ['XE Medium Range', 'XT Long Range', 'XZ+ Tech Lux']
    }
  ],
  'Hyundai EV': [
    {
      name: 'Ioniq 5',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/ioniq-5/hyundai-ioniq-5-7-1777884283.png',
      variants: ['RWD 72.6kWh', 'AWD 72.6kWh']
    },
    {
      name: 'Creta EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/creta-ev/hyundai-creta-ev-0-1767876338.png',
      variants: ['Executive 45kWh', 'Smart 55kWh', 'Empowered 55kWh']
    }
  ],
  'MG EV': [
    {
      name: 'Windsor EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mg/windsor-ev/mg-windsor-ev-0-1781267952.png',
      variants: ['Excite 38kWh', 'Exclusive 38kWh', 'Essence 38kWh']
    },
    {
      name: 'ZS EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mg/zs-ev/mg-zs-ev-0-1767854266.png',
      variants: ['Executive 50.3kWh', 'Excite Pro', 'Exclusive Plus']
    },
    {
      name: 'Comet EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mg/comet-ev/mg-comet-ev-0-1767868185.png',
      variants: ['Executive 17.3kWh', 'Excite FC', 'Exclusive FC']
    }
  ],
  'BMW EV': [
    {
      name: 'i4',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/bmw/3-series-gran-limousine/bmw-3-series-gran-limousine-7-1778487062.png',
      variants: ['eDrive35', 'eDrive40 M Sport']
    },
    {
      name: 'iX1',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/bmw/x1/bmw-x1-0-1766216634.png',
      variants: ['xDrive30 M Sport']
    }
  ],
  'Hyundai': [
    {
      name: 'Creta',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/creta/hyundai-creta-1-1766205711.png',
      variants: ['E', 'EX', 'S', 'S(O)', 'SX', 'SX Tech', 'SX(O)', 'SX(O) Turbo DCT', 'N Line N8', 'N Line N10']
    },
    {
      name: 'Venue',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/venue/hyundai-venue-0-1771412163.png',
      variants: ['E', 'S', 'S(O)', 'S+', 'SX', 'SX(O)', 'SX(O) DCT', 'N Line N6', 'N Line N8']
    },
    {
      name: 'Exter',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/exter/hyundai-exter-5-1776074667.png',
      variants: ['EX', 'EX(O)', 'S', 'S(O)', 'SX', 'SX Tech', 'SX(O) Connect', 'CNG MT']
    },
    {
      name: 'i20',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/i20/hyundai-i20-8-1766206046.png',
      variants: ['Era', 'Magna', 'Sportz', 'Sportz(O)', 'Asta', 'Asta (O) IVT', 'N Line N6', 'N Line N8']
    },
    {
      name: 'Verna',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/verna/hyundai-verna-0-1773131163.png',
      variants: ['EX', 'S', 'SX', 'SX IVT', 'SX Turbo', 'SX(O) 1.5 Turbo DCT', 'SX(O) IVT']
    },
    {
      name: 'Grand i10 Nios',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/grand-i10-nios/hyundai-grand-i10-nios-0-1766214369.png',
      variants: ['Era', 'Magna', 'Sportz Executive', 'Sportz', 'Asta', 'Corporate Edition', 'Kapp CNG']
    },
    {
      name: 'Aura',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/aura/hyundai-aura-7-1773214499.png',
      variants: ['E', 'S', 'SX', 'SX(O)', 'SX Corporate', 'CNG E', 'CNG S']
    },
    {
      name: 'Alcazar',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/alcazar/hyundai-alcazar-8-1766205340.png',
      variants: ['Executive', 'Prestige', 'Platinum', 'Signature 6-Seater AT', 'Signature Dual Tone']
    },
    {
      name: 'Creta Electric',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/creta-ev/hyundai-creta-ev-0-1767876338.png',
      variants: ['Executive EV', 'Smart EV', 'Empowered EV 45kWh']
    },
    {
      name: 'Ioniq 5',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/ioniq-5/hyundai-ioniq-5-7-1777884283.png',
      variants: ['RWD 72.6kWh', 'AWD Performance']
    }
  ],
  'Toyota': [
    {
      name: 'Urban Cruiser HyRyder',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/toyota/hyryder/toyota-hyryder-1-1767847105.png',
      variants: ['E NeoDrive', 'S NeoDrive', 'G NeoDrive', 'V NeoDrive', 'S Hybrid', 'G Hybrid', 'V Hybrid AWD']
    },
    {
      name: 'Innova Hycross',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/toyota/innova-hycross/toyota-innova-hycross-4-1767848854.png',
      variants: ['GX 7STR', 'GX 8STR', 'GX(O) 7STR', 'VX Hybrid', 'VX(O) Hybrid', 'ZX Hybrid', 'ZX(O) Hybrid']
    },
    {
      name: 'Fortuner',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/toyota/fortuner/toyota-fortuner-0-1767849630.png',
      variants: ['4x2 Petrol MT', '4x2 Petrol AT', '4x2 Diesel MT', '4x2 Diesel AT', '4x4 Diesel MT', '4x4 Diesel AT']
    },
    {
      name: 'Fortuner Legender',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/toyota/fortuner-legender/toyota-fortuner-legender-0-1767849483.png',
      variants: ['4x2 AT', '4x4 AT']
    },
    {
      name: 'Innova Crysta',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/toyota/innova-crysta/toyota-innova-crysta-0-1780900881.png',
      variants: ['GX 7-Seater', 'GX 8-Seater', 'VX 7-Seater', 'VX 8-Seater', 'ZX 7-Seater Diesel']
    },
    {
      name: 'Taisor',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/toyota/taisor/toyota-taisor-4-1767848418.png',
      variants: ['E 1.2', 'S 1.2', 'S+ 1.2', 'G 1.0 Turbo', 'V 1.0 Turbo AT', 'E CNG']
    },
    {
      name: 'Glanza',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/toyota/glanza/toyota-glanza-3-1767849310.png',
      variants: ['E', 'S', 'G', 'V AMT', 'S CNG', 'G CNG']
    },
    {
      name: 'Rumion',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/toyota/rumion/toyota-rumion-2-1767848606.png',
      variants: ['S MT', 'S AT', 'G MT', 'V MT', 'V AT', 'S CNG']
    },
    {
      name: 'Camry',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/toyota/camry/toyota-camry-1-1766140825.png',
      variants: ['2.5 Hybrid CVT']
    },
    {
      name: 'Hilux',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/toyota/hilux-facelift/toyota-hilux-facelift-0-1774329934.png',
      variants: ['STD MT', 'High MT', 'High AT 4x4']
    },
    {
      name: 'Land Cruiser 300',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/toyota/landcruiser/toyota-landcruiser-0-1767848728.png',
      variants: ['ZX 3.3 V6 Diesel']
    },
    {
      name: 'Vellfire',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/toyota/vellfire/toyota-vellfire-3-1767848275.png',
      variants: ['VIP Executive Lounge', 'Hi Grade']
    }
  ],
  'Kia': [
    {
      name: 'Seltos',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/kia/seltos/kia-seltos-0-1768365864.png',
      variants: ['HTE', 'HTK', 'HTK+', 'HTX', 'HTX+', 'GTX+ Turbo DCT', 'X-Line Matte']
    },
    {
      name: 'Sonet',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/kia/sonet/kia-sonet-0-1766740698.png',
      variants: ['HTE', 'HTK', 'HTK+', 'HTX', 'HTX+', 'GTX+ AT', 'X-Line Turbo']
    },
    {
      name: 'Carens',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/kia/carens/kia-carens-0-1766735122.png',
      variants: ['Premium', 'Prestige', 'Prestige Plus', 'Luxury', 'Luxury Plus iMT', 'X-Line DCT']
    }
  ],
  'Honda': [
    {
      name: 'City',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/honda/city-facelift/honda-city-facelift-0-1779451233.png',
      variants: ['SV', 'V', 'VX', 'ZX', 'V CVT', 'ZX CVT', 'e:HEV Hybrid ZX']
    },
    {
      name: 'Elevate',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/honda/elevate/honda-elevate-0-1775644182.png',
      variants: ['SV', 'V', 'VX', 'ZX', 'V CVT', 'ZX CVT', 'Apex Edition']
    },
    {
      name: 'Amaze',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/honda/amaze/honda-amaze-0-1766208026.png',
      variants: ['E', 'S', 'VX', 'S CVT', 'VX CVT', 'Elite Edition']
    },
    {
      name: 'Amaze 2nd Gen',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/honda/amaze-2021-2024/honda-amaze-2021-2024-0-1766204516.png',
      variants: ['E Petrol', 'S Petrol', 'VX Petrol CVT']
    },
    {
      name: 'ZR-V',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/honda/zr-v/honda-zr-v-0-1779448926.png',
      variants: ['2.0 e:HEV AWD']
    }
  ],
  'MG': [
    {
      name: 'Windsor EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mg/windsor-ev/mg-windsor-ev-0-1781267952.png',
      variants: ['Excite 38kWh', 'Exclusive 38kWh', 'Essence 38kWh', 'BaAS Battery Pack']
    },
    {
      name: 'Hector',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mg/hector/mg-hector-0-1769857188.png',
      variants: ['Style', 'Shine Pro', 'Smart Pro', 'Sharp Pro', 'Savvy Pro CVT', 'Blackstorm']
    },
    {
      name: 'Hector Plus',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mg/hector-plus-facelift/mg-hector-plus-facelift-0-1767854391.png',
      variants: ['Style 7-Seater', 'Shine Pro 7-Seater', 'Sharp Pro 6-Seater', 'Savvy Pro 6-Seater']
    },
    {
      name: 'Astor',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mg/astor/mg-astor-2-1767854900.png',
      variants: ['Sprint', 'Shine', 'Select', 'Smart Blackstorm', 'Savvy Pro ADAS']
    },
    {
      name: 'Comet EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mg/comet-ev/mg-comet-ev-0-1767868185.png',
      variants: ['Executive', 'Excite', 'Excite FC', 'Exclusive', 'Exclusive FC']
    },
    {
      name: 'ZS EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mg/zs-ev/mg-zs-ev-0-1767854266.png',
      variants: ['Executive', 'Excite Pro', 'Exclusive Plus', 'Essence 50.3kWh']
    },
    {
      name: 'Majestor',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mg/majestor/mg-majestor-0-1778145158.png',
      variants: ['Sharp 4x2', 'Savvy 4x4 Twin Turbo']
    },
    {
      name: 'Cyberster EV',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/mg/cyberster-ev/mg-cyberster-ev-2-1767854717.png',
      variants: ['Dual Motor AWD 77kWh']
    }
  ],
  'Skoda': [
    {
      name: 'Kylaq',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/skoda/kylaq/skoda-kylaq-7-1775204345.png',
      variants: ['Classic', 'Signature', 'Signature Plus', 'Prestige']
    },
    {
      name: 'Slavia',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/skoda/slavia/skoda-slavia-0-1767850473.png',
      variants: ['Classic', 'Signature', 'Prestige 1.5 DSG', 'Monte Carlo']
    },
    {
      name: 'Kushaq',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/skoda/kushaq/skoda-kushaq-0-1774256060.png',
      variants: ['Classic', 'Signature', 'Prestige 1.5 DSG', 'Monte Carlo Edition']
    },
    {
      name: 'Kodiaq',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/skoda/kodiaq/skoda-kodiaq-0-1767851128.png',
      variants: ['Style 2.0 TSI', 'Laurin & Klement 4x4']
    },
    {
      name: 'Kodiaq RS',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/skoda/kodiaq-rs/skoda-kodiaq-rs-0-1782120448.png',
      variants: ['2.0 TSI 4x4 DSG RS']
    },
    {
      name: 'Octavia RS',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/skoda/octavia-vrs/skoda-octavia-vrs-0-1767850604.png',
      variants: ['vRS 245 TSI']
    }
  ],
  'Volkswagen': [
    {
      name: 'Virtus',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/virtus/volkswagen-virtus-3-1767847075.png',
      variants: ['Comfortline', 'Highline', 'Topline', 'GT Line', 'GT Plus DSG', 'GT Edge Matte']
    },
    {
      name: 'Taigun',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/taigun/volkswagen-taigun-0-1777890574.png',
      variants: ['Comfortline', 'Highline', 'Topline', 'GT Line', 'GT Plus Sport', 'GT Edge']
    },
    {
      name: 'Tayron R-Line',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/tayron/volkswagen-tayron-0-1771500315.png',
      variants: ['2.0 TSI 4MOTION R-Line']
    },
    {
      name: 'Golf GTI',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/golf-gti/volkswagen-golf-gti-0-1767847472.png',
      variants: ['2.0 TSI Performance DSG']
    },
    {
      name: 'Tiguan R-Line',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/tiguan-r-line/volkswagen-tiguan-r-line-0-1767849778.png',
      variants: ['2.0 TSI 4MOTION R-Line']
    }
  ],
  'Renault': [
    {
      name: 'Triber',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/renault/triber/renault-triber-6-1765012460.png',
      variants: ['RXE', 'LXI', 'RXT', 'RXZ AMT', 'Urban Night Edition']
    },
    {
      name: 'Duster',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/renault/duster/renault-duster-1-1773734226.png',
      variants: ['RXE 1.0 Turbo', 'RXT 1.3 Turbo', 'RXZ 4x4 MT']
    },
    {
      name: 'Kiger',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/renault/kiger/renault-kiger-7-1766211181.png',
      variants: ['RXE', 'RXL', 'RXT Opt', 'RXZ Turbo CVT', 'Night Edition']
    },
    {
      name: 'Kwid',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/renault/kwid-facellift/renault-kwid-facellift-0-1783327771.png',
      variants: ['RXE 1.0', 'RXL(O)', 'RXT 1.0', 'Climber AMT']
    }
  ],
  'Nissan': [
    {
      name: 'Magnite',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/nissan/magnite/nissan-magnite-7-1767852828.png',
      variants: ['Visia', 'Acenta', 'N-Connecta', 'Tekna', 'Tekna+ Turbo CVT', 'EZ-Shift AMT']
    },
    {
      name: 'Tekton',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/nissan/tekton/nissan-tekton-7-1783586272.png',
      variants: ['XE', 'XL', 'XV Premium Turbo DCT']
    },
    {
      name: 'Gravite',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/nissan/gravite/nissan-gravite-0-1774603430.png',
      variants: ['XE 7-Seater', 'XL 7-Seater', 'XV AMT']
    },
    {
      name: 'X-Trail',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/nissan/x-trail/nissan-x-trail-3-1767852668.png',
      variants: ['1.5 VC-Turbo e-POWER 4WD']
    }
  ],
  'Citroen': [
    {
      name: 'C3 X',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/citroen/c3/citroen-c3-0-1773128524.png',
      variants: ['Live', 'Feel', 'Feel Turbo', 'Shine Turbo AT']
    },
    {
      name: 'Aircross X',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/citroen/c3-aircross/citroen-c3-aircross-0-1773130211.png',
      variants: ['You 5-Seater', 'Plus 7-Seater', 'Max Turbo AT 7-Seater']
    },
    {
      name: 'Basalt X',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/citroen/basalt/citroen-basalt-0-1767868810.png',
      variants: ['You 1.2', 'Plus 1.2 Turbo', 'Max 1.2 Turbo AT']
    },
    {
      name: 'eC3 X',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/citroen/c3-ev/citroen-c3-ev-5-1775639635.png',
      variants: ['Live EV', 'Feel EV', 'Shine EV Blu']
    },
    {
      name: 'C5 Aircross',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/citroen/c5-aircross/citroen-c5-aircross-0-1766141820.png',
      variants: ['Shine Dual Tone 2.0 Diesel']
    }
  ],
  'Jeep': [
    {
      name: 'Compass',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/jeep/compass/jeep-compass-3-1764915112.png',
      variants: ['Sport', 'Longitude', 'Night Eagle', 'Limited', 'Model S 4x4 AT']
    },
    {
      name: 'Meridian',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/jeep/meridian/jeep-meridian-3-1767933471.png',
      variants: ['Longitude 5-Seater', 'Limited Plus', 'Overland 4x4 AT 7-Seater']
    },
    {
      name: 'Wrangler',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/jeep/wrangler/jeep-wrangler-6-1773212262.png',
      variants: ['Unlimited 2.0 Petrol', 'Rubicon 4x4 AT']
    },
    {
      name: 'Grand Cherokee',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/jeep/grand-cherokee/jeep-grand-cherokee-3-1764915555.png',
      variants: ['Limited (O) 2.0 Turbo 4x4']
    }
  ],
  'BMW': [
    {
      name: '3 Series LWB',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/bmw/3-series-gran-limousine/bmw-3-series-gran-limousine-7-1778487062.png',
      variants: ['330Li M Sport', '320Ld M Sport']
    },
    {
      name: '2 Series Gran Coupe',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/bmw/2-series/bmw-2-series-0-1772877490.png',
      variants: ['220i M Sport', '220d M Sport']
    },
    {
      name: 'X1',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/bmw/x1/bmw-x1-0-1766216634.png',
      variants: ['sDrive18i M Sport', 'sDrive18d M Sport']
    },
    {
      name: 'X3',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/bmw/x3/bmw-x3-5-1766216924.png',
      variants: ['xDrive20d M Sport', 'xDrive30i M Sport']
    },
    {
      name: 'X5',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/bmw/x5/bmw-x5-0-1766217132.png',
      variants: ['xDrive40i xLine', 'xDrive30d M Sport']
    },
    {
      name: '5 Series LWB',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/bmw/5-series/bmw-5-series-0-1766209229.png',
      variants: ['530Li M Sport', '520d M Sport']
    },
    {
      name: 'M5',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/bmw/m5/bmw-m5-0-1766215775.png',
      variants: ['4.4 V8 Hybrid AWD']
    },
    {
      name: 'Z4',
      thumbnail: 'https://images.91wheels.com/assets/c_images/gallery/bmw/z4/bmw-z4-0-1766218974.png',
      variants: ['M40i Roadster']
    }
  ]
};

export async function fetchCarModels(brandName) {
  if (rawUrl && rawKey && !rawUrl.includes('placeholder')) {
    const tableCandidates = ['cars', 'car_models', 'models', 'vehicles'];

    for (const tableName of tableCandidates) {
      try {
        let query = supabase.from(tableName).select('*');
        if (brandName && brandName !== 'Other') {
          query = query.ilike('brand', `%${brandName}%`);
        }
        const { data, error } = await query;

        if (!error && data && data.length > 0) {
          return data.map(item => {
            let variants = item.variants || item.variant || [];
            if (typeof variants === 'string') {
              try {
                variants = JSON.parse(variants);
              } catch {
                variants = variants.split(',').map(v => v.trim());
              }
            }
            if (!Array.isArray(variants)) {
              variants = [variants].filter(Boolean);
            }

            return {
              id: item.id,
              brand: item.brand || brandName,
              name: item.model_name || item.name || item.model || item.title || 'Model',
              thumbnail: item.image_url || item.thumbnail || item.image || item.photo || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&auto=format&fit=crop&q=80',
              variants: variants.length > 0 ? variants : ['Base Variant', 'Mid Variant', 'Top Variant', 'Automatic', 'CNG']
            };
          });
        }
      } catch (e) {
        console.warn(`Query on Supabase table '${tableName}' notice:`, e);
      }
    }
  }

  // Fallback to built-in catalog dataset if database table is empty or pending setup
  return CAR_CATALOG[brandName] || [];
}

export const BIKE_CATALOG = {
  'Royal Enfield': [
    {
      name: 'Bullet 350',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/bullet-350/royalenfield-bullet-350-0-1769515350.png',
      variants: ['Military Red/Black', 'Standard Black', 'Black Gold Dual ABS']
    },
    {
      name: 'Hunter 350',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/hunter-350/royalenfield-hunter-350-0-1768629127.png',
      variants: ['Retro Factory', 'Dapper Grey/White', 'Rebel Blue/Red']
    },
    {
      name: 'Classic 350',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/classic-350/royalenfield-classic-350-0-1768628135.png',
      variants: ['Redditch Series', 'Halcyon Series', 'Dark Series Dual ABS', 'Chrome Series']
    },
    {
      name: 'Himalayan 450',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/himalayan-450/royalenfield-himalayan-450-0-1766235092.png',
      variants: ['Base Kaza Brown', 'Pass Slate Poppy Blue', 'Summit Hanle Black Tubeless']
    },
    {
      name: 'Guerrilla 450',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/guerrilla-450/royalenfield-guerrilla-450-0-1768628859.png',
      variants: ['Analogue Base', 'Dash Mid', 'Flash Top TFT']
    },
    {
      name: 'Continental GT 650',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/continental-gt-650/royalenfield-continental-gt-650-0-1768628549.png',
      variants: ['Rocker Red', 'British Racing Green', 'Slipstream Blue Alloy', 'Mr Clean Chrome']
    },
    {
      name: 'Interceptor 650',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/interceptor-650/royalenfield-interceptor-650-0-1768629237.png',
      variants: ['Canyon Red', 'Sunset Strip', 'Black Ray Alloy', 'Mark 2 Chrome']
    },
    {
      name: 'Meteor 350',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/meteor-350/royalenfield-meteor-350-0-1768629471.png',
      variants: ['Fireball', 'Stellar', 'Aurora Spoke', 'Supernova Windscreen']
    },
    {
      name: 'Shotgun 650',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/shotgun-650/royalenfield-shotgun-650-0-1768629631.png',
      variants: ['Sheet Metal Grey', 'Plasma Blue', 'Green Drill', 'Stencil White']
    }
  ],
  'TVS': [
    {
      name: 'Apache RTR 160 4V',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/apache-rtr-160-4v/tvs-apache-rtr-160-4v-1-1768628356.png',
      variants: ['Single Disc ABS', 'Dual Disc ABS', 'Special Edition', 'Fi SmartXonnect USD']
    },
    {
      name: 'Raider 125',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/raider-125/tvs-raider-125-7-1781174533.png',
      variants: ['Single Seat', 'Split Seat', 'SSE Marvel Edition', 'TFT SmartXonnect']
    },
    {
      name: 'Ronin',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/ronin-225/tvs-ronin-225-0-1768627395.png',
      variants: ['SS Single Channel ABS', 'DS Dual Channel ABS', 'TD Special Edition']
    },
    {
      name: 'iQube Electric',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png',
      variants: ['iQube 2.2 kWh', 'iQube 3.4 kWh', 'iQube S 3.4 kWh', 'iQube ST 5.1 kWh']
    },
    {
      name: 'Jupiter',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/jupiter/tvs-jupiter-0-1768204694.png',
      variants: ['Drum Sheet Metal', 'Drum Alloy', 'SmartXonnect Disc', 'Classic Edition']
    },
    {
      name: 'NTORQ 125',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/ntorq-125/tvs-ntorq-125-6-1766220046.png',
      variants: ['Disc', 'Race Edition', 'Super Squad Edition', 'XT TFT Screen']
    },
    {
      name: 'Apache RTR 310',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/apache-rtr-310/tvs-apache-rtr-310-7-1768627754.png',
      variants: ['Arsenal Black Base', 'Arsenal Black Quickshifter', 'Fury Yellow BTO']
    },
    {
      name: 'Apache RR 310',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/apache-rr-310/tvs-apache-rr-310-4-1768628516.png',
      variants: ['Racing Red Standard', 'Racing Red Quickshifter', 'Bomber Grey BTO']
    }
  ],
  'Bajaj': [
    {
      name: 'Pulsar 125',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/pulsar-125/bajaj-pulsar-125-0-1766145587.png',
      variants: ['Single Seat Disc', 'Split Seat Disc', 'Carbon Fibre Edition']
    },
    {
      name: 'Chetak C35',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/chetak/bajaj-chetak-7-1777549806.png',
      variants: ['C35 Premium', 'C35 TecPac Edition']
    },
    {
      name: 'Chetak C30',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/chetak-c30/bajaj-chetak-c30-7-1777550694.png',
      variants: ['C30 Urbane Standard']
    },
    {
      name: 'Pulsar 150',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/pulsar-150-dts-i/bajaj-pulsar-150-dts-i-0-1766146432.png',
      variants: ['Single Disc SD', 'Twin Disc TD']
    },
    {
      name: 'Pulsar NS125',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/pulsar-ns-125/bajaj-pulsar-ns-125-0-1766205627.png',
      variants: ['Standard CBS', 'Digital Bluetooth Console']
    },
    {
      name: 'Pulsar N160',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/pulsar-n160/bajaj-pulsar-n160-0-1766205227.png',
      variants: ['Single Channel ABS', 'Dual Channel ABS USD Fork']
    },
    {
      name: 'Pulsar NS200',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/pulsar-ns200/bajaj-pulsar-ns200-0-1768476796.png',
      variants: ['Dual Channel ABS USD Fork', 'Digital Navigation Console']
    },
    {
      name: 'Dominar 400',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/dominar-400/bajaj-dominar-400-0-1766143280.png',
      variants: ['Touring Edition Dual Channel ABS']
    },
    {
      name: 'Freedom 125 CNG',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/freedom/bajaj-freedom-0-1768475262.png',
      variants: ['NG04 Drum', 'NG04 Drum LED', 'NG04 Disc LED']
    },
    {
      name: 'Platina 100',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/platina-100/bajaj-platina-100-0-1766143931.png',
      variants: ['Drum ES Alloy']
    }
  ],
  'Hero MotoCorp': [
    {
      name: 'Splendor Plus',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/splendor-plus/heromotocorp-splendor-plus-0-1780550417.png',
      variants: ['Self Alloy i3S', 'Black and Accent', '01 Edition']
    },
    {
      name: 'Xtreme 125R',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/xtreme-125r/heromotocorp-xtreme-125r-4-1766149291.png',
      variants: ['IBS Single Disc', 'ABS Single Channel']
    },
    {
      name: 'Glamour X',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/glamour-x-125/heromotocorp-glamour-x-125-6-1766148217.png',
      variants: ['Drum', 'Disc LED']
    },
    {
      name: 'HF Deluxe',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/hf-deluxe/heromotocorp-hf-deluxe-0-1780557153.png',
      variants: ['Kick Start Spoke', 'Self Start Alloy', 'i3S Self Start']
    },
    {
      name: 'Splendor Plus Xtec',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/splendor-xtec/heromotocorp-splendor-xtec-0-1768539770.png',
      variants: ['XTEC 2.0 Digital Bluetooth']
    },
    {
      name: 'Xpulse 200 4V',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/xpulse-200-4v/heromotocorp-xpulse-200-4v-8-1766148929.png',
      variants: ['Standard ABS', 'Pro Rally Edition']
    },
    {
      name: 'Passion Plus',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/passion-plus/heromotocorp-passion-plus-0-1768480962.png',
      variants: ['Drum Alloy i3S']
    },
    {
      name: 'Karizma XMR',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/karizma-xmr/heromotocorp-karizma-xmr-0-1768480541.png',
      variants: ['210 cc Dual Channel ABS']
    },
    {
      name: 'Mavrick 440',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/mavrick-440/heromotocorp-mavrick-440-0-1768480748.png',
      variants: ['Base Spoke', 'Mid Alloy', 'Top Diamond Cut Alloy']
    }
  ],
  'Honda': [
    {
      name: 'SP 125',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/honda/sp-125/honda-sp-125-0-1768568782.png',
      variants: ['Drum', 'Disc', 'Sports Edition']
    },
    {
      name: 'Activa 6G',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/honda/activa-6g/honda-activa-6g-0-1768544628.png',
      variants: ['Standard', 'Deluxe', 'H-Smart Key']
    },
    {
      name: 'Activa EV',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/honda/activa-ev/honda-activa-ev-0-1766207593.png',
      variants: ['Activa e: Standard', 'Activa e: Smart Key']
    },
    {
      name: 'Shine 125',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/honda/shine/honda-shine-0-1769513560.png',
      variants: ['Drum OB2', 'Disc OB2']
    },
    {
      name: 'Hness CB350',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/honda/cb350-h-ness/honda-cb350-h-ness-0-1768566709.png',
      variants: ['DLX', 'DLX Pro', 'DLX Pro Chrome', 'Legacy Edition']
    },
    {
      name: 'CB350 RS',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/honda/cb350-rs/honda-cb350-rs-1-1768549399.png',
      variants: ['DLX Dual Tone', 'Hue Edition']
    },
    {
      name: 'Unicorn',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/honda/unicorn-160/honda-unicorn-160-1-1766209095.png',
      variants: ['Standard Single Channel ABS']
    },
    {
      name: 'Hornet 2.0',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/honda/hornet-2-0/honda-hornet-2-0-0-1768566990.png',
      variants: ['Standard ABS', 'Repsol Edition']
    },
    {
      name: 'Gold Wing',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/honda/gold-wing/honda-gold-wing-0-1781267117.png',
      variants: ['Tour DCT Airbag']
    }
  ],
  'Yamaha': [
    {
      name: 'R15 V4',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/r15-v4/yamaha-r15-v4-7-1766226591.png',
      variants: ['Metallic Red', 'Dark Knight', 'Racing Blue', 'Intensity White TFT']
    },
    {
      name: 'XSR155',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/xsr155/yamaha-xsr155-3-1768626203.png',
      variants: ['Matte Black', 'Heritage White']
    },
    {
      name: 'MT 15 V2',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/mt-15/yamaha-mt-15-7-1766229381.png',
      variants: ['Standard', 'Deluxe Cyan Storm', 'Monster Energy MotoGP Edition']
    },
    {
      name: 'RayZR 125 Fi-Hybrid',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/rayzr-125-fi-hybrid/yamaha-rayzr-125-fi-hybrid-7-1764746231.png',
      variants: ['Drum', 'Disc', 'Street Rally Edition']
    },
    {
      name: 'FZ-S FI V3',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/fz-fi-v3/yamaha-fz-fi-v3-7-1766230640.png',
      variants: ['Matte Red', 'Dark Matte Blue']
    },
    {
      name: 'Aerox 155',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/aerox-155/yamaha-aerox-155-0-1768626962.png',
      variants: ['Standard ABS', 'Version S Smart Key']
    },
    {
      name: 'FZ-X',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/fz-x/yamaha-fz-x-3-1768626461.png',
      variants: ['Matte Copper', 'Chrome Edition']
    }
  ],
  'KTM': [
    {
      name: '390 Duke',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/ktm/duke-390/ktm-duke-390-0-1768625946.png',
      variants: ['Electronic Orange', 'Atlantic Blue']
    },
    {
      name: '250 Duke',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/ktm/duke-250/ktm-duke-250-0-1778843464.png',
      variants: ['Ceramic White', 'Electronic Orange']
    },
    {
      name: 'Duke 200',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/ktm/duke-200/ktm-duke-200-0-1769708285.png',
      variants: ['LED Headlamp Dual ABS']
    },
    {
      name: 'RC 390',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/ktm/rc-390/ktm-rc-390-0-1768626540.png',
      variants: ['GP Edition', 'Factory Orange']
    },
    {
      name: 'RC 200',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/ktm/rc-200/ktm-rc-200-0-1768626449.png',
      variants: ['GP Edition Dual Channel ABS']
    },
    {
      name: '390 Adventure',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/ktm/390-adventure/ktm-390-adventure-0-1768625748.png',
      variants: ['X Spoke', 'Standard TFT', 'SW Rally Edition']
    }
  ],
  'Suzuki': [
    {
      name: 'Access 125',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/jupiter/tvs-jupiter-0-1768204694.png',
      variants: ['Standard Drum', 'Special Edition Disc', 'Ride Connect Bluetooth']
    },
    {
      name: 'Gixxer SF 150',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/r15-v4/yamaha-r15-v4-7-1766226591.png',
      variants: ['Standard ABS', 'Ride Connect Edition']
    },
    {
      name: 'Burgman Street 125',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/honda/activa-6g/honda-activa-6g-0-1768544628.png',
      variants: ['Standard', 'Ride Connect Edition', 'EX Auto Stop-Start']
    },
    {
      name: 'V-Strom SX',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/ktm/390-adventure/ktm-390-adventure-0-1768625748.png',
      variants: ['Champion Yellow', 'Glass Sparkle Black']
    },
    {
      name: 'Hayabusa',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/honda/gold-wing/honda-gold-wing-0-1781267117.png',
      variants: ['Standard 1340cc ABS']
    }
  ],
  'Jawa': [
    {
      name: 'Jawa 350',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/classic-350/royalenfield-classic-350-0-1768628135.png',
      variants: ['Spoke Wheel', 'Alloy Wheel Dual ABS']
    },
    {
      name: '42 Bobber',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/bullet-350/royalenfield-bullet-350-0-1769515350.png',
      variants: ['Moonstone White', 'Jasper Red', 'Black Mirror Edition']
    },
    {
      name: 'Perak',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/bullet-350/royalenfield-bullet-350-0-1769515350.png',
      variants: ['Stealth Matte Black']
    },
    {
      name: '42 FJ',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/hunter-350/royalenfield-hunter-350-0-1768629127.png',
      variants: ['Spoke', 'Alloy Dual Channel ABS']
    }
  ],
  'Yezdi': [
    {
      name: 'Roadster',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/hunter-350/royalenfield-hunter-350-0-1768629127.png',
      variants: ['Dark Smoke Grey', 'Chrome Gallant Grey', 'Trail Red']
    },
    {
      name: 'Adventure',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/himalayan-450/royalenfield-himalayan-450-0-1766235092.png',
      variants: ['Mambo Black', 'Whiteout']
    },
    {
      name: 'Scrambler',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/guerrilla-450/royalenfield-guerrilla-450-0-1768628859.png',
      variants: ['Fire Orange', 'Yelling Yellow']
    }
  ],
  'Aprilia': [
    {
      name: 'RS 457',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/r15-v4/yamaha-r15-v4-7-1766226591.png',
      variants: ['Prismatic Dark', 'Opalescent Light', 'Racing Stripes']
    },
    {
      name: 'SR 160',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/aerox-155/yamaha-aerox-155-0-1768626962.png',
      variants: ['Standard CBS', 'Carbon Edition', 'Race Edition ABS']
    }
  ],
  'Vida': [
    {
      name: 'V1 Plus',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png',
      variants: ['3.44 kWh Removable Battery', '3.44 kWh Sports Edition']
    },
    {
      name: 'V1 Pro',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png',
      variants: ['3.94 kWh Long Range Battery', '3.94 kWh Custom Pack']
    }
  ],
  'BMW Motorrad': [
    {
      name: 'G 310 R',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/ktm/duke-390/ktm-duke-390-0-1768625946.png',
      variants: ['Style Passion', 'Cosmic Black', 'Style Sport']
    },
    {
      name: 'G 310 GS',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/ktm/390-adventure/ktm-390-adventure-0-1768625748.png',
      variants: ['Rallye Edition', 'Polar White', 'KTM Triple Black']
    },
    {
      name: 'S 1000 RR',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/r15-v4/yamaha-r15-v4-7-1766226591.png',
      variants: ['Standard', 'Pro M Package', 'Pro Race']
    }
  ],
  'Ducati': [
    {
      name: 'Panigale V4',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/r15-v4/yamaha-r15-v4-7-1766226591.png',
      variants: ['Standard Red', 'Panigale V4 S', 'Panigale V4 R']
    },
    {
      name: 'Monster',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/ktm/duke-390/ktm-duke-390-0-1768625946.png',
      variants: ['Red', 'Aviator Grey', 'Monster SP']
    }
  ],
  'Harley-Davidson': [
    {
      name: 'X440',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/bullet-350/royalenfield-bullet-350-0-1769515350.png',
      variants: ['Denim Spoke', 'Vivid Alloy', 'S Diamond Cut Alloy']
    },
    {
      name: 'Nightster',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/continental-gt-650/royalenfield-continental-gt-650-0-1768628549.png',
      variants: ['Standard 975cc', 'Nightster Special']
    }
  ],
  'Kawasaki': [
    {
      name: 'Ninja 300',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/r15-v4/yamaha-r15-v4-7-1766226591.png',
      variants: ['Lime Green', 'Candy Lime Green', 'Moondust Grey']
    },
    {
      name: 'Ninja 500',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/aerox-155/yamaha-aerox-155-0-1768626962.png',
      variants: ['Standard Metallic Spark Black', 'SE KRT Edition']
    },
    {
      name: 'Z900',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/ktm/duke-390/ktm-duke-390-0-1768625946.png',
      variants: ['Metallic Matte Graphene Steel Grey', 'SE Akrapovic Edition']
    }
  ],
  'Triumph': [
    {
      name: 'Speed 400',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/hunter-350/royalenfield-hunter-350-0-1768629127.png',
      variants: ['Carnival Red', 'Caspian Blue', 'Phantom Black']
    },
    {
      name: 'Scrambler 400X',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/himalayan-450/royalenfield-himalayan-450-0-1766235092.png',
      variants: ['Matt Khaki Green', 'Carnival Red', 'Phantom Black']
    }
  ],
  'Ather': [
    {
      name: 'Ather 450X',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png',
      variants: ['2.9 kWh Battery', '3.7 kWh Battery Pro Pack', 'Apex Edition']
    },
    {
      name: 'Ather Rizta',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png',
      variants: ['S 2.9 kWh', 'Z 2.9 kWh', 'Z 3.7 kWh']
    },
    {
      name: 'Ather 450S',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png',
      variants: ['Standard 2.9 kWh', 'HR 3.7 kWh Pro Pack']
    }
  ],
  'Ola Electric': [
    {
      name: 'Ola S1 Pro Gen 2',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png',
      variants: ['4 kWh Gen 2', '4 kWh Gen 1']
    },
    {
      name: 'Ola S1 Air',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/chetak/bajaj-chetak-7-1777549806.png',
      variants: ['3 kWh Standard', '3 kWh Neon Edition']
    },
    {
      name: 'Ola S1 X',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/chetak-c30/bajaj-chetak-c30-7-1777550694.png',
      variants: ['2 kWh', '3 kWh', '4 kWh', 'S1 X+ 3 kWh']
    },
    {
      name: 'Ola Roadster',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/r15-v4/yamaha-r15-v4-7-1766226591.png',
      variants: ['2.5 kWh Base', '3.5 kWh Mid', '4.5 kWh Top', 'Roadster Pro 8 kWh', 'Roadster Pro 16 kWh']
    }
  ],
  'TVS iQube': [
    {
      name: 'iQube Electric',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png',
      variants: ['iQube 2.2 kWh', 'iQube 3.4 kWh', 'iQube S 3.4 kWh', 'iQube ST 5.1 kWh']
    },
    {
      name: 'TVS X',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png',
      variants: ['Standard 4.4 kWh']
    }
  ],
  'Chetak EV': [
    {
      name: 'Chetak C35',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/chetak/bajaj-chetak-7-1777549806.png',
      variants: ['C35 Premium', 'C35 TecPac Edition']
    },
    {
      name: 'Chetak C30',
      thumbnail: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/chetak-c30/bajaj-chetak-c30-7-1777550694.png',
      variants: ['C30 Urbane Standard']
    }
  ]
};

export async function fetchAllCarsFromSupabase() {
  if (rawUrl && rawKey && !rawUrl.includes('placeholder')) {
    const tableCandidates = ['cars', 'car_models', 'models', 'vehicles'];

    for (const tableName of tableCandidates) {
      try {
        const { data, error } = await supabase.from(tableName).select('*');

        if (!error && data && data.length > 0) {
          return data.map(item => {
            let variants = item.variants || item.variant || [];
            if (typeof variants === 'string') {
              try {
                variants = JSON.parse(variants);
              } catch {
                variants = variants.split(',').map(v => v.trim());
              }
            }
            if (!Array.isArray(variants)) {
              variants = [variants].filter(Boolean);
            }

            return {
              id: item.id,
              brand: item.brand,
              name: item.model_name || item.name || item.model || item.title || 'Model',
              thumbnail: item.image_url || item.thumbnail || item.image || item.photo || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&auto=format&fit=crop&q=80',
              variants: variants.length > 0 ? variants : ['Base Variant', 'Mid Variant', 'Top Variant', 'Automatic', 'CNG']
            };
          });
        }
      } catch (e) {
        console.warn(`Fetch all cars query on table '${tableName}' notice:`, e);
      }
    }
  }

  // Flatten CAR_CATALOG into array of all cars
  const allCars = [];
  Object.keys(CAR_CATALOG).forEach(brand => {
    CAR_CATALOG[brand].forEach(car => {
      allCars.push({
        brand,
        name: car.name,
        thumbnail: car.thumbnail,
        variants: car.variants
      });
    });
  });
  return allCars;
}

const DOCUMENT_BUCKET = 'form-documents';

const safeFileName = (name) => (name || 'file').replace(/[^a-zA-Z0-9._-]/g, '_');

function saveToLocalStorageFallback(table, payload, files = []) {
  try {
    const mockId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `fallback-${Date.now()}`;
    const documents = (files || []).map(file => ({
      name: file?.name || 'document',
      path: null,
      size: file?.size || 0,
      type: file?.type || 'application/octet-stream'
    }));
    const record = {
      id: mockId,
      ...payload,
      documents,
      created_at: new Date().toISOString(),
      _synced: false
    };

    if (typeof localStorage !== 'undefined') {
      const existingStr = localStorage.getItem('buywheels_saved_submissions');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      existing.push({ table, record });
      localStorage.setItem('buywheels_saved_submissions', JSON.stringify(existing));
    }

    return record;
  } catch (e) {
    console.warn('LocalStorage fallback write notice:', e);
    return {
      id: `mock-${Date.now()}`,
      ...payload,
      documents: [],
      created_at: new Date().toISOString()
    };
  }
}

/**
 * Upload optional attachments, then persist the complete form payload.
 * Falls back to mock/local data if Supabase environment variables are missing, placeholders, or if network error occurs.
 */
export async function saveFormSubmission(table, payload, files = []) {
  if (!rawUrl || !rawKey || rawUrl.includes('placeholder') || rawKey.includes('placeholder')) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return saveToLocalStorageFallback(table, payload, files);
  }

  try {
    const submissionId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `sub-${Date.now()}`;
    const documents = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const path = `${table}/${submissionId}/${safeFileName(file.name)}`;
        try {
          const { error: uploadError } = await supabase.storage
            .from(DOCUMENT_BUCKET)
            .upload(path, file, { contentType: file.type, upsert: false });

          if (uploadError) {
            console.warn('Document storage upload notice:', uploadError.message);
            documents.push({ name: file.name, path: null, size: file.size, type: file.type });
          } else {
            documents.push({ name: file.name, path, size: file.size, type: file.type });
          }
        } catch (err) {
          console.warn('Storage upload notice (continuing submission):', err);
          documents.push({ name: file.name, path: null, size: file.size, type: file.type });
        }
      }
    }

    const { data, error } = await supabase
      .from(table)
      .insert([{ ...payload, documents }])
      .select()
      .single();

    if (!error && data) {
      return data;
    }
    console.warn(`Supabase insert into '${table}' notice:`, error?.message || error);
  } catch (err) {
    console.warn(`Network or Supabase error submitting to '${table}', using local fallback:`, err);
  }

  return saveToLocalStorageFallback(table, payload, files);
}

export async function saveBuyerEnquiry(payload, files = []) {
  if (!rawUrl || !rawKey || rawUrl.includes('placeholder') || rawKey.includes('placeholder')) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return saveToLocalStorageFallback('buyer_enquiries', payload, files);
  }

  try {
    const submissionId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `sub-${Date.now()}`;
    const documents = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const path = `buyer_enquiries/${submissionId}/${safeFileName(file.name)}`;
        try {
          const { error: uploadError } = await supabase.storage
            .from(DOCUMENT_BUCKET)
            .upload(path, file, { contentType: file.type, upsert: false });

          if (uploadError) {
            console.warn('Document storage upload notice:', uploadError.message);
            documents.push({ name: file.name, path: null, size: file.size, type: file.type });
          } else {
            documents.push({ name: file.name, path, size: file.size, type: file.type });
          }
        } catch (err) {
          console.warn('Storage upload notice (continuing submission):', err);
          documents.push({ name: file.name, path: null, size: file.size, type: file.type });
        }
      }
    }

    const fullPayload = {
      owner_name: payload.owner_name,
      vehicle_type: payload.vehicle_type,
      brand: payload.brand,
      budget: payload.budget,
      city: payload.city,
      phone: payload.phone,
      fuel: payload.fuel ?? null,
      transmission: payload.transmission ?? null,
      documents: documents
    };

    // Try direct table insertion first
    const { data: directData, error: directError } = await supabase
      .from('buyer_enquiries')
      .insert([fullPayload])
      .select()
      .single();

    if (!directError && directData) {
      return directData;
    }

    // If error is due to missing columns (e.g. transmission or fuel not in DB schema)
    const isColumnError = directError && (
      directError.message?.includes('transmission') ||
      directError.message?.includes('fuel') ||
      directError.message?.includes('schema cache') ||
      directError.code === 'PGRST204'
    );

    if (isColumnError) {
      const basePayload = {
        owner_name: payload.owner_name,
        vehicle_type: payload.vehicle_type,
        brand: payload.brand,
        budget: payload.budget,
        city: payload.city,
        phone: payload.phone,
        documents: documents
      };

      const { data: baseData, error: baseError } = await supabase
        .from('buyer_enquiries')
        .insert([basePayload])
        .select()
        .single();

      if (!baseError && baseData) {
        return baseData;
      }
    }

    // Fallback to RPC stored procedure if present
    try {
      const { data: rpcData, error: rpcError } = await supabase.rpc('submit_buyer_enquiry', {
        p_owner_name: payload.owner_name,
        p_vehicle_type: payload.vehicle_type,
        p_brand: payload.brand,
        p_budget: payload.budget,
        p_city: payload.city,
        p_phone: payload.phone,
        p_fuel: payload.fuel ?? null,
        p_transmission: payload.transmission ?? null,
        p_documents: documents,
      });

      if (!rpcError && rpcData) {
        return Array.isArray(rpcData) ? rpcData[0] : rpcData;
      }
    } catch (rpcErr) {
      console.warn('RPC procedure execution skipped:', rpcErr);
    }

    if (directError) {
      console.warn('Supabase DB notice, saving to local fallback:', directError.message || directError);
    }
  } catch (netErr) {
    console.warn('Network or Supabase fetch error occurred during enquiry submission, switching to local fallback:', netErr);
  }

  // Graceful fallback if network error (Failed to fetch) or DB insert fails
  return saveToLocalStorageFallback('buyer_enquiries', payload, files);
}


