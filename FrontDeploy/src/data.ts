// data.ts
export interface Venue {
    id: string;
    name: string;
    locality: string;
    budget: string;
    venueType: string;
    facilities: string[];
    mealPreferences: string;
  }
  
  export const mockVenues: Venue[] = [
    {
      id: '1',
      name: 'Elegance Banquet Hall',
      locality: 'Thane West',
      budget: '1-2 Lakh',
      venueType: 'Banquet Halls',
      facilities: ['Food provided by venue', 'Alcohol allowed'],
      mealPreferences: 'Vegetarian Only',
    },
    {
      id: '2',
      name: 'Green Meadows',
      locality: 'Andheri East',
      budget: '3-4 Lakh',
      venueType: 'Wedding Lawns',
      facilities: ['Outside food allowed', 'Music allowed late'],
      mealPreferences: 'Non-vegetarian',
    },
    {
      id: '3',
      name: 'Sunset Pavilion',
      locality: 'Juhu Beach',
      budget: '4-5 Lakh',
      venueType: 'Beachside Venues',
      facilities: ['Valet parking', 'Sea view'],
      mealPreferences: 'Vegan',
    },
    {
      id: '4',
      name: 'Royal Garden',
      locality: 'Bandra West',
      budget: '5-6 Lakh',
      venueType: 'Garden Venues',
      facilities: ['Catering services', 'Live music'],
      mealPreferences: 'Vegetarian and Non-vegetarian',
    },
    {
      id: '5',
      name: 'Skyline Terrace',
      locality: 'Lower Parel',
      budget: '6-7 Lakh',
      venueType: 'Rooftop Venues',
      facilities: ['City view', 'Open bar'],
      mealPreferences: 'Non-vegetarian',
    },
    {
      id: '6',
      name: 'Classic Conference Center',
      locality: 'Navi Mumbai',
      budget: '2-3 Lakh',
      venueType: 'Conference Halls',
      facilities: ['AV equipment', 'Free WiFi'],
      mealPreferences: 'Vegetarian',
    },
    {
      id: '7',
      name: 'Regal Retreat',
      locality: 'Powai',
      budget: '7-8 Lakh',
      venueType: 'Resorts',
      facilities: ['Swimming pool', 'Spa services'],
      mealPreferences: 'Vegan and Non-vegetarian',
    },
    {
      id: '8',
      name: 'Harmony Hall',
      locality: 'Malad West',
      budget: '1.5-2.5 Lakh',
      venueType: 'Community Centers',
      facilities: ['Ample parking', 'Air conditioning'],
      mealPreferences: 'Vegetarian Only',
    },
    {
      id: '9',
      name: 'Ocean View Resort',
      locality: 'Versova',
      budget: '5-6 Lakh',
      venueType: 'Beachside Venues',
      facilities: ['Private beach', 'Water sports'],
      mealPreferences: 'Non-vegetarian',
    },
    {
      id: '10',
      name: 'Majestic Banquet',
      locality: 'Kandivali East',
      budget: '3-4 Lakh',
      venueType: 'Banquet Halls',
      facilities: ['In-house decor', 'DJ services'],
      mealPreferences: 'Vegetarian',
    }
  ];
    // Add more mock venues as needed