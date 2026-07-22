import React from 'react';
import catCarImage from '../assets/cat_car.png';
import catBikeImage from '../assets/cat_bike.png';
import catScooterImage from '../assets/cat_scooter.png';
import catEvImage from '../assets/cat_ev.png';

export default function QuickCategories({ onSelectCategory, className = '' }) {
  const categories = [
    {
      id: 'car',
      title: 'Cars',
      sub: 'Hatchback · SUV',
      img: catCarImage,
      alt: 'Cars',
      categoryKey: 'Car',
    },
    {
      id: 'bike',
      title: 'Bikes',
      sub: 'Motorcycles',
      img: catBikeImage,
      alt: 'Bikes',
      categoryKey: 'Bike / Scooter',
    },
    {
      id: 'scooter',
      title: 'Scooters',
      sub: 'Gearless · EV',
      img: catScooterImage,
      alt: 'Scooters',
      categoryKey: 'Bike / Scooter',
    },
    {
      id: 'ev',
      title: 'EVs',
      sub: 'Electric Cars & 2W',
      img: catEvImage,
      alt: 'EVs',
      categoryKey: 'EV',
    },
  ];

  return (
    <div className={`hero-quick-cats ${className}`.trim()}>
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="hero-quick-cat-item"
          onClick={() => onSelectCategory && onSelectCategory(cat.categoryKey, cat.title)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectCategory && onSelectCategory(cat.categoryKey, cat.title);
            }
          }}
        >
          <div className="hero-quick-cat-img-box">
            <img src={cat.img} alt={cat.alt} />
          </div>
          <div className="hero-quick-cat-info">
            <span className="hero-quick-cat-title">{cat.title}</span>
            <span className="hero-quick-cat-sub">{cat.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
