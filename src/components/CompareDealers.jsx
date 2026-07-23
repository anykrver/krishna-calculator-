import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  TrendingDown, 
  Tag,
  Star,
  Award,
  Zap
} from 'lucide-react';

const COMPARISON_VEHICLES = [
  {
    id: 'creta',
    name: 'Hyundai Creta (SX)',
    segment: 'SUV',
    exShowroom: '₹14,80,000',
    dealers: [
      {
        id: 'd1',
        name: 'Ranchi Motors',
        location: 'Main Road, Ranchi',
        rating: '4.8',
        dealType: 'Good Deal',
        badgeVariant: 'secondary',
        discount: '₹22,000',
        finalPrice: '₹14,58,000',
        deliveryTime: '7 Days',
        popular: false,
        benefits: [
          '3-Year Extended Warranty',
          'Free Basic Accessories Kit',
          'Fast 7-Day Showroom Delivery',
          'Standard Dealer Support'
        ]
      },
      {
        id: 'd2',
        name: 'Jamshedpur Wheels',
        location: 'Bistupur, Jamshedpur',
        rating: '4.9',
        dealType: 'BEST DEAL',
        badgeVariant: 'glow',
        discount: '₹55,000',
        finalPrice: '₹14,25,000',
        deliveryTime: 'Immediate Stock',
        popular: true,
        benefits: [
          'Direct Cash Discount of ₹55,000',
          'Free 1-Year Zero-Dep Insurance',
          'Free Premium Chrome & Mats Kit',
          'Immediate Ready Delivery',
          '24/7 VIP Priority Support'
        ]
      },
      {
        id: 'd3',
        name: 'Dhanbad Auto Hub',
        location: 'Bank More, Dhanbad',
        rating: '4.7',
        dealType: 'Competitive',
        badgeVariant: 'outline',
        discount: '₹30,000',
        finalPrice: '₹14,50,000',
        deliveryTime: '10 Days',
        popular: false,
        benefits: [
          'Exchange Bonus up to ₹20,000',
          'Free First 3 Services',
          'Road-Side Assistance (RSA)',
          '10-Day Delivery Commitment'
        ]
      }
    ]
  },
  {
    id: 'swift',
    name: 'Maruti Swift (VXI)',
    segment: 'Hatchback',
    exShowroom: '₹7,30,000',
    dealers: [
      {
        id: 'd1',
        name: 'Ranchi Suzuki',
        location: 'Kanke Road, Ranchi',
        rating: '4.7',
        dealType: 'Good Deal',
        badgeVariant: 'secondary',
        discount: '₹12,000',
        finalPrice: '₹7,18,000',
        deliveryTime: '5 Days',
        popular: false,
        benefits: [
          '2-Year Extended Warranty',
          'Standard Accessories Kit',
          '5-Day Fast Delivery'
        ]
      },
      {
        id: 'd2',
        name: 'Steel City Maruti',
        location: 'Sakchi, Jamshedpur',
        rating: '4.9',
        dealType: 'BEST DEAL',
        badgeVariant: 'glow',
        discount: '₹35,000',
        finalPrice: '₹6,95,000',
        deliveryTime: 'Immediate Stock',
        popular: true,
        benefits: [
          'Direct Cash Discount of ₹35,000',
          'Free RTO Registration Support',
          'Free Mudflaps & Seat Covers',
          'Immediate Ready Stock'
        ]
      },
      {
        id: 'd3',
        name: 'Coalfield Maruti',
        location: 'Dhanbad Main Road',
        rating: '4.6',
        dealType: 'Competitive',
        badgeVariant: 'outline',
        discount: '₹18,000',
        finalPrice: '₹7,12,000',
        deliveryTime: '7 Days',
        popular: false,
        benefits: [
          'Exchange Bonus up to ₹10,000',
          'Free 2 Years RSA Package',
          '7-Day Delivery Guarantee'
        ]
      }
    ]
  },
  {
    id: 'nexon_ev',
    name: 'Tata Nexon EV (Empowered)',
    segment: 'Electric SUV',
    exShowroom: '₹14,49,000',
    dealers: [
      {
        id: 'd1',
        name: 'GreenDrive Tata',
        location: 'Bariatu, Ranchi',
        rating: '4.9',
        dealType: 'BEST DEAL',
        badgeVariant: 'glow',
        discount: '₹60,000',
        finalPrice: '₹13,89,000',
        deliveryTime: '3 Days',
        popular: true,
        benefits: [
          'Free 7.2kW Fast Home Charger',
          '₹60,000 Direct EV Subsidy Discount',
          '8 Years / 1,60,000 km Battery Warranty',
          'Priority EV Service Bay'
        ]
      },
      {
        id: 'd2',
        name: 'Jamshedpur Motors Tata',
        location: 'Kadma, Jamshedpur',
        rating: '4.8',
        dealType: 'Great Value',
        badgeVariant: 'orange',
        discount: '₹40,000',
        finalPrice: '₹14,09,000',
        deliveryTime: '7 Days',
        popular: false,
        benefits: [
          'Free Home Charger Installation',
          'Free 3 Years Maintenance Pack',
          '7-Day Delivery Commitment'
        ]
      }
    ]
  },
  {
    id: 'activa',
    name: 'Honda Activa 6G (DLX)',
    segment: 'Scooter',
    exShowroom: '₹76,500',
    dealers: [
      {
        id: 'd1',
        name: 'Ranchi Honda',
        location: 'Lalpur, Ranchi',
        rating: '4.8',
        dealType: 'Good Deal',
        badgeVariant: 'secondary',
        discount: '₹2,500',
        finalPrice: '₹74,000',
        deliveryTime: 'Same Day',
        popular: false,
        benefits: [
          'Free Helmet & Body Guard',
          'Free Teflon Coating',
          'Same Day Delivery'
        ]
      },
      {
        id: 'd2',
        name: 'Jamshedpur Honda',
        location: 'Dimna Road, Jamshedpur',
        rating: '4.9',
        dealType: 'BEST DEAL',
        badgeVariant: 'glow',
        discount: '₹5,500',
        finalPrice: '₹71,000',
        deliveryTime: 'Same Day',
        popular: true,
        benefits: [
          'Direct Savings of ₹5,500',
          'Free Premium Helmet & Footrest',
          'Free 5 Years Extended Warranty',
          'Instant Registration & Delivery'
        ]
      }
    ]
  }
];

const CompareDealers = ({ onClaimOfferClick }) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState('creta');

  const currentVehicle = COMPARISON_VEHICLES.find(v => v.id === selectedVehicleId) || COMPARISON_VEHICLES[0];

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2">
          <Badge variant="orange" className="px-3 py-1 text-xs uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 mr-1.5 text-orange-500" />
            Live Showroom Bidding
          </Badge>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Compare <span className="text-orange-500 italic">Dealers</span>
        </h2>

        <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
          Watch verified local dealerships compete for your business. Compare cash discounts, warranty perks, and delivery timelines to lock in the ultimate price.
        </p>
      </div>

      {/* Vehicle Tabs Selector */}
      <Tabs defaultValue="creta" value={selectedVehicleId} onValueChange={setSelectedVehicleId} className="w-full mb-8">
        <div className="w-full overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible flex justify-start sm:justify-center">
          <TabsList className="inline-flex min-w-max sm:min-w-0 flex-nowrap justify-start sm:justify-center gap-1.5 h-auto p-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
            {COMPARISON_VEHICLES.map((vehicle) => (
              <TabsTrigger
                key={vehicle.id}
                value={vehicle.id}
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg shadow-orange-500/20 whitespace-nowrap"
              >
                {vehicle.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Selected Vehicle Headline Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 mb-8 rounded-2xl bg-neutral-900 text-white border border-neutral-800 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold flex items-center gap-2">
                {currentVehicle.name}
                <Badge variant="outline" className="text-[10px] text-neutral-300 border-neutral-700">
                  {currentVehicle.segment}
                </Badge>
              </div>
              <div className="text-xs text-neutral-400">
                Showroom Base Price: <span className="font-semibold text-white">{currentVehicle.exShowroom}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold bg-orange-500/10 text-orange-300 border border-orange-500/20 px-3.5 py-1.5 rounded-full">
            <TrendingDown className="w-4 h-4 text-orange-400" />
            Max Savings: <span className="font-black text-orange-400">Up to ₹60,000 Off</span>
          </div>
        </div>

        {/* Dealer Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {currentVehicle.dealers.map((dealer) => (
            <Card
              key={dealer.id}
              className={`relative flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl ${
                dealer.popular
                  ? 'ring-2 ring-orange-500 border-orange-500/60 shadow-orange-500/15 bg-gradient-to-b from-orange-500/5 via-background to-background'
                  : 'border-neutral-200 dark:border-neutral-800 hover:border-orange-300 dark:hover:border-orange-700/50'
              }`}
            >
              {/* Highlight Background Glow */}
              {dealer.popular && (
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full pointer-events-none" />
              )}

              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant={dealer.badgeVariant} className="font-bold text-xs">
                    {dealer.popular && <Sparkles className="w-3 h-3 mr-1 inline animate-pulse" />}
                    {dealer.dealType}
                  </Badge>

                  <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    <span>{dealer.rating}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                    {dealer.name}
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  </CardTitle>

                  <CardDescription className="text-xs flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                    <MapPin className="w-3 h-3 text-neutral-400" />
                    {dealer.location}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-5 relative z-10 flex-grow">
                {/* Price & Savings Box */}
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase text-neutral-500">Direct Savings</span>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" /> -{dealer.discount}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-xs text-neutral-500">Effective On-Road:</span>
                    <span className="text-2xl font-black text-neutral-900 dark:text-white">
                      {dealer.finalPrice}
                    </span>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-200/60 dark:border-neutral-800">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-orange-500" /> Delivery:
                    </span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                      {dealer.deliveryTime}
                    </span>
                  </div>
                </div>

                {/* Dealer Benefits List */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase text-neutral-400 tracking-wider">
                    Included Benefits:
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                    {dealer.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="pt-2 relative z-10">
                <Button
                  onClick={onClaimOfferClick}
                  variant={dealer.popular ? "default" : "outline"}
                  className={`w-full font-bold transition-all ${
                    dealer.popular
                      ? "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-md shadow-orange-500/20"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-orange-400 hover:text-orange-600 dark:hover:text-orange-400"
                  }`}
                >
                  <span>Claim {dealer.name.split(' ')[0]} Offer</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Tabs>

      {/* Bottom Guarantee Banner */}
      <div className="mt-8 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-orange-500" />
          <span>All offers verified directly from authorized partner showrooms across Jharkhand</span>
        </div>
        <span className="font-semibold text-neutral-700 dark:text-neutral-300 hidden sm:inline">
          100% Free · No Hidden Fees
        </span>
      </div>
    </div>
  );
};

export default CompareDealers;
