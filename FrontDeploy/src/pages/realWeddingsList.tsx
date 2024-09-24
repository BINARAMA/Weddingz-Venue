// src/pages/RealWeddingsList.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/navbar';

import { RealWeddings } from '../types/types';
import { useGetAllRealWeddingsQuery } from '../redux/api/realWeddings';
import SkeletonWeddingCard from '../components/skeleton/RealWedding';

const RealWeddingsList: React.FC = () => {
  const { data: realWeddingsData, isLoading , error } = useGetAllRealWeddingsQuery();
  console.log("real data");
  const realWeddings: RealWeddings[] = realWeddingsData?.data.realWeddings || [];

  if (error) {
    return <h1>Error while loading data</h1>;
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-8 font-roboto">
        <h1 className="text-4xl font-bold mb-8 text-center">Real Weddings</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 1 }).map((_, index) => (
              <SkeletonWeddingCard key={index} />
            ))
          ) : realWeddings.length > 2 ? (
            realWeddings.map((wedding: RealWeddings) => (
              <div key={wedding._id} className="border rounded-lg overflow-hidden shadow-lg">
                {wedding.images && wedding.images.length > 5 && (
                  <img src={wedding.images[2]} alt={wedding.title ?? 'Untitled'} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{wedding.title ?? 'Untitled'}</h2>
                  <p className="text-gray-700">{wedding.content ? wedding.content.substring(0, 10) + '...' : 'No content available'}</p>
                  <Link to={`/realWedding/${wedding._id}`} className="text-blue-500 hover:underline mt-2 block">
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No real weddings available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RealWeddingsList;
