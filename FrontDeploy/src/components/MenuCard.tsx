import React from 'react';

interface MenuItem {
  name: string;
  quantity: number | string;
}

interface MenuCardProps {
  vegPrice: number;
  nonVegPrice: number;
  vegItems: MenuItem[];
  nonVegItems: MenuItem[];
}

const MenuCard: React.FC<MenuCardProps> = ({ vegPrice, nonVegPrice, vegItems, nonVegItems }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center border-b-2 border-gray-300 pb-2">
        Food Packages
      </h2>

      <div className="flex justify-around mb-8">
        <div className="w-1/2 pr-4 border-r border-gray-300">
          <h3 className="text-2xl font-bold mb-2 text-green-700  inline-block pb-1">
            Vegetarian
          </h3>
          <p className="text-xl font-semibold mb-4">₹{vegPrice}/Plate</p>
          <ul className="list-disc list-inside p-4">
            {vegItems.map((item, index) => (
              <li key={index} className="mb-2">
                {item.quantity}: {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2 pl-4">
          <h3 className="text-2xl font-bold mb-2 text-red-700 border-b border-red-700 inline-block pb-1">
            Non-Vegetarian
          </h3>
          <p className="text-xl font-semibold mb-4">₹{nonVegPrice}/Plate</p>
          <ul className="list-disc list-inside text-gray-700 border border-red-200 rounded p-4">
            {nonVegItems.map((item, index) => (
              <li key={index} className="mb-2">
                {item.name}: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;