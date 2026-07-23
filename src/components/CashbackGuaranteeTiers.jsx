import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Upload, 
  Banknote, 
  Bike, 
  Car, 
  Truck,
  Flame,
  Check
} from 'lucide-react';

const CashbackGuaranteeTiers = ({ 
  catBikeImage, 
  catThreeWheelerImage, 
  catCarImage, 
  activePpTier, 
  setActivePpTier, 
  onUploadClick 
}) => {
  const tiers = [
    {
      id: 'two-wheeler',
      title: 'Two-Wheeler',
      sub: 'Bikes · Scooters · EVs',
      amount: '₹3,000',
      badge: 'Starter Savings',
      badgeVariant: 'secondary',
      image: catBikeImage,
      icon: Bike,
      highlight: false,
      perks: [
        'Written Showroom Quote Price Beat',
        'Direct Bank Account Transfer',
        '100% Free Verification'
      ]
    },
    {
      id: 'three-wheeler',
      title: 'Three-Wheeler',
      sub: 'Auto · Passenger · Commercial',
      amount: '₹4,000',
      badge: 'Most Popular',
      badgeVariant: 'orange',
      image: catThreeWheelerImage,
      icon: Truck,
      highlight: false,
      perks: [
        'Written Showroom Quote Price Beat',
        'Direct Bank Account Transfer',
        '100% Free Verification'
      ]
    },
    {
      id: 'four-wheeler',
      title: 'Four-Wheeler',
      sub: 'Cars · SUVs · EVs',
      amount: '₹5,000',
      badge: 'Highest Value',
      badgeVariant: 'glow',
      image: catCarImage,
      icon: Car,
      highlight: true,
      perks: [
        'Written Showroom Quote Price Beat',
        'Direct Bank Account Transfer',
        'Priority Dealership Resolution'
      ]
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2">
          <Badge variant="orange" className="px-3 py-1 text-xs uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-orange-500" />
            BuyWheels Price Promise
          </Badge>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Cashback Guarantee <span className="text-orange-500 italic">Tiers</span>
        </h2>
        
        <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
          Bring us your written showroom quotation. If BuyWheels cannot beat your price, you receive guaranteed cashback directly to your bank account upon vehicle delivery.
        </p>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12">
        {tiers.map((tier) => {
          const isSelected = activePpTier === tier.id;
          const TierIcon = tier.icon;

          return (
            <Card
              key={tier.id}
              onClick={() => setActivePpTier(tier.id)}
              className={`relative cursor-pointer flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl ${
                isSelected
                  ? 'ring-2 ring-orange-500 border-orange-500/50 shadow-orange-500/10 dark:bg-neutral-900/90'
                  : tier.highlight
                  ? 'border-orange-500/30 bg-gradient-to-b from-orange-500/5 via-background to-background dark:from-orange-500/10'
                  : 'border-neutral-200 dark:border-neutral-800 hover:border-orange-300 dark:hover:border-orange-700/50'
              }`}
            >
              {/* Highlight Glow background effect */}
              {tier.highlight && (
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/15 blur-3xl rounded-full pointer-events-none" />
              )}

              {/* Card Header & Badge */}
              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-center justify-between">
                  <Badge variant={tier.badgeVariant} className="font-semibold text-xs px-2.5 py-0.5">
                    {tier.highlight && <Sparkles className="w-3 h-3 mr-1 inline animate-pulse" />}
                    {tier.badge}
                  </Badge>
                  
                  {isSelected && (
                    <span className="flex items-center text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3 mr-1 stroke-[3]" /> Active
                    </span>
                  )}
                </div>

                {/* Vehicle Showcase Image Container */}
                <div className="relative my-4 h-40 w-full flex items-center justify-center rounded-xl bg-gradient-to-b from-neutral-50 to-neutral-100/60 dark:from-neutral-900/60 dark:to-neutral-900 border border-neutral-100 dark:border-neutral-800 p-2 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={tier.image}
                    alt={tier.title}
                    className="max-h-32 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <TierIcon className="w-5 h-5 text-orange-500" />
                    <CardTitle className="text-xl font-bold text-neutral-900 dark:text-white">
                      {tier.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-xs text-neutral-500 dark:text-neutral-400">
                    {tier.sub}
                  </CardDescription>
                </div>
              </CardHeader>

              {/* Card Content - Cashback Amount & Perks */}
              <CardContent className="space-y-6 relative z-10 flex-grow">
                {/* Cashback Box */}
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-150 dark:border-neutral-800 text-center">
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 dark:from-orange-400 dark:to-amber-400">
                    {tier.amount}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-1">
                    Guaranteed Cashback
                  </div>
                </div>

                {/* Perk List */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* Card Footer - Action Button */}
              <CardFooter className="pt-2 relative z-10">
                <Button
                  variant={isSelected ? "default" : "outline"}
                  className={`w-full font-semibold transition-all ${
                    isSelected 
                      ? "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-md shadow-orange-500/20" 
                      : "border-neutral-200 dark:border-neutral-700 hover:border-orange-400 hover:text-orange-600 dark:hover:text-orange-400"
                  }`}
                >
                  <span>{isSelected ? 'Selected Category' : 'Select Category'}</span>
                  <ArrowRight className={`w-4 h-4 ml-2 transition-transform duration-200 ${isSelected ? 'translate-x-1' : ''}`} />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Trust Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 text-xs sm:text-sm">
        <div className="flex items-center gap-3 p-2">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-neutral-900 dark:text-white">Written Price Beat Guarantee</div>
            <div className="text-neutral-500 text-xs">Present any official showroom quote</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-neutral-900 dark:text-white">Zero Hidden Charges</div>
            <div className="text-neutral-500 text-xs">100% transparent & free service</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
            <Banknote className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-neutral-900 dark:text-white">Direct Account Deposit</div>
            <div className="text-neutral-500 text-xs">Instant cashback upon delivery</div>
          </div>
        </div>
      </div>

      {/* Footer Banner CTA */}
      <div className="rounded-2xl p-6 sm:p-8 bg-neutral-900 text-white border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -left-12 -top-12 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 flex-shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              BuyWheels Assurance
              <Badge variant="orange" className="text-[10px] py-0 px-2 bg-orange-500/20 text-orange-300 border-none">
                100% Free
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
              Always on the buyer’s side · Lowest price guaranteed across all dealerships
            </p>
          </div>
        </div>

        <Button
          onClick={onUploadClick}
          className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-6 py-6 rounded-xl shadow-lg shadow-orange-500/25 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base relative z-10"
        >
          <Upload className="w-5 h-5" />
          <span>Upload Quote &amp; Save Money</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default CashbackGuaranteeTiers;
