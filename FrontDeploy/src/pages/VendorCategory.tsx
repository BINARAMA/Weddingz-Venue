// src/pages/VendorsCategory.tsx
import React from 'react';
import VendorCard from '../components/VendorCard';
import HeroBanner from '../components/Hero';
import NavBar from '../components/navbar';
import RelatedArticles from '../components/RelatedArticles';
import InformationBanner from '../components/InformationBanner';
import Footer from '../components/Footer';
// import VendorsListByCategory from './VendorListByCategory';
import { useNavigate } from 'react-router-dom';


const VendorsCategory: React.FC = () => {

const navigate = useNavigate();

  const vendors = [
    {
      imageUrl: 'https://picsum.photos/400/300',
      name: 'Photographer',
      title:'Photographer'
    },
    {
      imageUrl: 'https://picsum.photos/400/300',
      name: 'Makeup Artists',
      redirectUrl: '/vendor/2',
    },
    {
      imageUrl: 'https://picsum.photos/400/300',
      name: 'Mehendi Artists',
      redirectUrl: '/vendor/3',
    },
    {
      imageUrl: 'https://picsum.photos/400/300',
      name: 'Decorators',
      redirectUrl: '/vendor/4',
    },
    {
      imageUrl: 'https://picsum.photos/400/300',
      name: 'Caterers',
      redirectUrl: '/vendor/5',
    },
    {
      imageUrl: 'https://picsum.photos/400/300',
      name: 'Invitation Cards',
      redirectUrl: '/vendor/6',
    },
    {
      imageUrl: 'https://picsum.photos/400/300',
      name: 'DJs',
      redirectUrl: '/vendor/7',
    },
    {
      imageUrl: 'https://picsum.photos/400/300',
      name: 'Transport',
      redirectUrl: '/vendor/8',
    },
    {
      imageUrl: 'https://picsum.photos/400/300',
      name: 'Anchor/MC',
      redirectUrl: '/vendor/9',
    },
    {
      imageUrl: 'https://picsum.photos/400/300',
      name: 'Choreographers',
      redirectUrl: '/vendor/10',
    },
    {
      imageUrl: 'https://picsum.photos/400/300',
      name: 'Band/Baaja/Ghodiwala',
      redirectUrl: '/vendor/11',
    },
  ];

  const director = (category:string) => {

    navigate(`/vendors/category/${category}`)
  }

  return (
    <div>
      <NavBar />
      <HeroBanner />
      <div className="p-28">
        <h2 className="text-2xl font-bold mb-4 text-center">Vendor Categories</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {vendors.map((vendor, index) => (
            <div onClick={() => director(vendor.name)}>
              <VendorCard
              key={index}
              imageUrl={vendor.imageUrl}
              name={vendor.name}
              title={vendor.title}
             
            //   onClick={vendor.Title}
            />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className='text-2xl font-bold mb-4 text-center' >Related Articles</h2>
        <RelatedArticles/>
      </div>
      <div>
        <InformationBanner/>
      </div>
      <Footer/>
    </div>
  );
};

export default VendorsCategory;
