import React from 'react';

interface VenuePoliciesProps {
  policies: {
    timings: string;
    morningSlot: string;
    changingRoom: {
      count: number;
      isAc: boolean;
    };
    advance: {
      amount: number;
      adjustmentPolicy: string;
    };
    taxes: {
      fnb: string;
    };
    parking: {
      valet: boolean;
      space: number;
    };
    cancellation: string;
    lodging: string;
    alcohol: {
      allowed: boolean;
      outsideAllowed: boolean;
      corkageCost: boolean;
    };
    otherPolicies: string[];
    food: string[];
    decoration: string[];
  };
}

const VenuePolicies: React.FC<VenuePoliciesProps> = ({ policies }) => {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Venue Policies</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Timings & Slots</h4>
          <p>Venue closes at {policies.timings}</p>
          <p>Morning: {policies.morningSlot}</p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Changing Room</h4>
          <p>No. of complimentary changing rooms: {policies.changingRoom.count}</p>
          <p>Changing Room A/C: {policies.changingRoom.isAc ? 'Yes' : 'No'}</p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Advance</h4>
          <p>Total booking amount: {policies.advance.amount} Rs.</p>
          <p>Advance can be adjusted against future bookings in {policies.advance.adjustmentPolicy}.</p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Taxes</h4>
          <p>Taxes F&B: {policies.taxes.fnb}</p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Parking</h4>
          <p>Valet provided by venue: {policies.parking.valet ? 'Yes' : 'No'}</p>
          <p>Parking space available for {policies.parking.space} vehicles</p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Cancellation</h4>
          <p>{policies.cancellation}</p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Lodging</h4>
          <p>{policies.lodging}</p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Alcohol</h4>
          <p>Alcohol allowed at the venue: {policies.alcohol.allowed ? 'Yes' : 'No'}</p>
          <p>Outside alcohol allowed at the venue: {policies.alcohol.outsideAllowed ? 'Yes' : 'No'}</p>
          <p>Corkage costs applicable: {policies.alcohol.corkageCost ? 'Yes' : 'No'}</p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Other Policies</h4>
          <ul className="list-disc list-inside">
            {policies.otherPolicies.map((policy, index) => (
              <li key={index}>{policy}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Food</h4>
          <ul className="list-disc list-inside">
            {policies.food.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Decoration</h4>
          <ul className="list-disc list-inside">
            {policies.decoration.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VenuePolicies;
