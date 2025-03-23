
// Mock Hotels
export const mockHotels = [
  {
    id: 'h1',
    name: 'Makkah Royal Clock Tower',
    location: 'Abraj Al Bait, Makkah',
    distanceToHaram: 0.1,
    price: 350,
    rating: 4.8,
    image: 'https://source.unsplash.com/random/300x200/?hotel',
    amenities: ['Wifi', 'Breakfast', 'Airport Shuttle', 'Prayer Room', 'Restaurant'],
    reviews: [
      { user: 'Ahmed', rating: 5, comment: 'Amazing view of Kaaba' },
      { user: 'Sarah', rating: 4, comment: 'Great location, a bit pricey' }
    ]
  },
  {
    id: 'h2',
    name: 'Hilton Makkah Convention Hotel',
    location: 'Jabal Omar, Makkah',
    distanceToHaram: 0.8,
    price: 220,
    rating: 4.5,
    image: 'https://source.unsplash.com/random/300x200/?hotel',
    amenities: ['Wifi', 'Breakfast', 'Gym', 'Prayer Room', 'Restaurant'],
    reviews: [
      { user: 'Mohammed', rating: 4, comment: 'Comfortable rooms, 10 min walk to Haram' },
      { user: 'Aisha', rating: 5, comment: 'Excellent service' }
    ]
  },
  {
    id: 'h3',
    name: 'Pullman ZamZam Makkah',
    location: 'Abraj Al Bait, Makkah',
    distanceToHaram: 0.2,
    price: 280,
    rating: 4.7,
    image: 'https://source.unsplash.com/random/300x200/?hotel',
    amenities: ['Wifi', 'Airport Shuttle', 'Prayer Room', 'Restaurant', 'Spa'],
    reviews: [
      { user: 'Ibrahim', rating: 5, comment: 'Perfect location and amenities' },
      { user: 'Fatima', rating: 4, comment: 'Great hotel, excellent staff' }
    ]
  },
  {
    id: 'h4',
    name: 'Swissotel Al Maqam Makkah',
    location: 'Abraj Al Bait, Makkah',
    distanceToHaram: 0.3,
    price: 240,
    rating: 4.6,
    image: 'https://source.unsplash.com/random/300x200/?hotel',
    amenities: ['Wifi', 'Breakfast', 'Prayer Room', 'Restaurant'],
    reviews: [
      { user: 'Omar', rating: 4, comment: 'Clean rooms, good food' },
      { user: 'Khadija', rating: 5, comment: 'Very close to Haram' }
    ]
  },
  {
    id: 'h5',
    name: 'Conrad Makkah',
    location: 'Jabal Omar, Makkah',
    distanceToHaram: 0.7,
    price: 250,
    rating: 4.7,
    image: 'https://source.unsplash.com/random/300x200/?hotel',
    amenities: ['Wifi', 'Breakfast', 'Gym', 'Prayer Room', 'Restaurant', 'Pool'],
    reviews: [
      { user: 'Abdullah', rating: 5, comment: 'Luxury rooms and great service' },
      { user: 'Zainab', rating: 4, comment: 'Beautiful hotel, nice staff' }
    ]
  },
  {
    id: 'h6',
    name: 'Movenpick Hotel & Residences Hajar Tower Makkah',
    location: 'Abraj Al Bait, Makkah',
    distanceToHaram: 0.4,
    price: 200,
    rating: 4.4,
    image: 'https://source.unsplash.com/random/300x200/?hotel',
    amenities: ['Wifi', 'Airport Shuttle', 'Prayer Room', 'Restaurant'],
    reviews: [
      { user: 'Yusuf', rating: 4, comment: 'Great value for the location' },
      { user: 'Amina', rating: 5, comment: 'Excellent facilities' }
    ]
  },
  {
    id: 'h7',
    name: 'Dar Al Tawhid Intercontinental Makkah',
    location: 'Central Area, Makkah',
    distanceToHaram: 0.1,
    price: 300,
    rating: 4.8,
    image: 'https://source.unsplash.com/random/300x200/?hotel',
    amenities: ['Wifi', 'Breakfast', 'Prayer Room', 'Restaurant', 'Spa'],
    reviews: [
      { user: 'Mustafa', rating: 5, comment: 'Directly facing Kaaba, amazing experience' },
      { user: 'Layla', rating: 4, comment: 'Excellent hotel with Kaaba view' }
    ]
  },
  {
    id: 'h8',
    name: 'Al Safwah Royale Orchid Hotel',
    location: 'Abraj Al Bait, Makkah',
    distanceToHaram: 0.2,
    price: 270,
    rating: 4.6,
    image: 'https://source.unsplash.com/random/300x200/?hotel',
    amenities: ['Wifi', 'Breakfast', 'Prayer Room', 'Restaurant'],
    reviews: [
      { user: 'Hassan', rating: 4, comment: 'Good hotel close to Haram' },
      { user: 'Mariam', rating: 5, comment: 'Perfect location for Umrah' }
    ]
  }
];

// Mock Flights
export const mockFlights = [
  {
    id: 'f1',
    airline: 'Saudi Airlines',
    airlineCode: 'SV 123',
    departureCity: 'London',
    arrivalCity: 'Jeddah',
    departureTime: '10:30',
    arrivalTime: '18:45',
    duration: '6h 15m',
    price: 580,
    stops: 0,
    logo: 'https://source.unsplash.com/random/20x20/?airline'
  },
  {
    id: 'f2',
    airline: 'Emirates',
    airlineCode: 'EK 456',
    departureCity: 'New York',
    arrivalCity: 'Jeddah',
    departureTime: '22:10',
    arrivalTime: '18:30',
    duration: '12h 20m',
    price: 950,
    stops: 1,
    logo: 'https://source.unsplash.com/random/20x20/?airline'
  },
  {
    id: 'f3',
    airline: 'Qatar Airways',
    airlineCode: 'QR 789',
    departureCity: 'Paris',
    arrivalCity: 'Madinah',
    departureTime: '08:15',
    arrivalTime: '16:40',
    duration: '8h 25m',
    price: 720,
    stops: 1,
    logo: 'https://source.unsplash.com/random/20x20/?airline'
  },
  {
    id: 'f4',
    airline: 'Turkish Airlines',
    airlineCode: 'TK 234',
    departureCity: 'Berlin',
    arrivalCity: 'Jeddah',
    departureTime: '11:45',
    arrivalTime: '20:30',
    duration: '8h 45m',
    price: 650,
    stops: 1,
    logo: 'https://source.unsplash.com/random/20x20/?airline'
  },
  {
    id: 'f5',
    airline: 'Etihad Airways',
    airlineCode: 'EY 567',
    departureCity: 'Toronto',
    arrivalCity: 'Jeddah',
    departureTime: '14:20',
    arrivalTime: '10:35',
    duration: '14h 15m',
    price: 980,
    stops: 1,
    logo: 'https://source.unsplash.com/random/20x20/?airline'
  },
  {
    id: 'f6',
    airline: 'Saudi Airlines',
    airlineCode: 'SV 890',
    departureCity: 'Jakarta',
    arrivalCity: 'Madinah',
    departureTime: '00:30',
    arrivalTime: '06:15',
    duration: '9h 45m',
    price: 750,
    stops: 0,
    logo: 'https://source.unsplash.com/random/20x20/?airline'
  },
  {
    id: 'f7',
    airline: 'Emirates',
    airlineCode: 'EK 123',
    departureCity: 'Cairo',
    arrivalCity: 'Jeddah',
    departureTime: '09:10',
    arrivalTime: '11:30',
    duration: '2h 20m',
    price: 320,
    stops: 0,
    logo: 'https://source.unsplash.com/random/20x20/?airline'
  },
  {
    id: 'f8',
    airline: 'Qatar Airways',
    airlineCode: 'QR 456',
    departureCity: 'Kuala Lumpur',
    arrivalCity: 'Jeddah',
    departureTime: '20:45',
    arrivalTime: '00:15',
    duration: '9h 30m',
    price: 780,
    stops: 1,
    logo: 'https://source.unsplash.com/random/20x20/?airline'
  }
];

// Mock Airlines
export const mockAirlines = [
  'Saudi Airlines',
  'Emirates',
  'Qatar Airways',
  'Turkish Airlines',
  'Etihad Airways',
  'Gulf Air',
  'Kuwait Airways',
  'Oman Air'
];

// Mock Cities
export const mockCities = [
  'Jeddah',
  'Madinah',
  'London',
  'New York',
  'Paris',
  'Berlin',
  'Toronto',
  'Jakarta',
  'Cairo',
  'Kuala Lumpur',
  'Dubai',
  'Istanbul',
  'Doha',
  'Abu Dhabi',
  'Riyadh'
];

// Mock Packages
export const mockPackages = [
  {
    id: 'p1',
    title: 'Deluxe Umrah Package - 10 Days',
    provider: 'Al-Barakat Travel',
    providerLogo: 'https://source.unsplash.com/random/20x20/?logo',
    rating: 4.8,
    price: 2500,
    duration: '10 days, 9 nights',
    amenities: ['5-Star Hotels', 'Private Transportation', 'Guided Tours', 'Meals Included', 'Visa Processing'],
    accommodation: {
      hotelName: 'Makkah Royal Clock Tower & Madinah Hilton',
      location: 'Makkah & Madinah',
      distanceToHaram: 0.1,
      stars: 5
    },
    meals: 'Full Board (3 meals daily)',
    transport: 'Private Air-Conditioned Vehicles',
    guideLanguages: ['English', 'Arabic', 'Urdu', 'French'],
    inclusions: [
      'Return Flights',
      'Visa Processing',
      'Airport Transfers',
      '5 nights in Makkah, 4 nights in Madinah',
      'Daily Meals',
      'Guided Umrah',
      'Ziyarah Tours in Makkah & Madinah',
      '24/7 Support'
    ],
    exclusions: [
      'Personal Expenses',
      'Travel Insurance',
      'Qurbani/Sacrifice'
    ],
    image: 'https://source.unsplash.com/random/300x200/?kaaba',
    reviews: [
      { user: 'Abdullah', rating: 5, comment: 'Excellent service, made our Umrah journey smooth' },
      { user: 'Fatima', rating: 4.5, comment: 'Great package, hotels were perfect' }
    ]
  },
  {
    id: 'p2',
    title: 'Standard Umrah Package - 14 Days',
    provider: 'Ihsan Travels',
    providerLogo: 'https://source.unsplash.com/random/20x20/?logo',
    rating: 4.6,
    price: 1800,
    duration: '14 days, 13 nights',
    amenities: ['4-Star Hotels', 'Shared Transportation', 'Guided Tours', 'Breakfast Included', 'Visa Processing'],
    accommodation: {
      hotelName: 'Swissotel Makkah & Madinah Movenpick',
      location: 'Makkah & Madinah',
      distanceToHaram: 0.5,
      stars: 4
    },
    meals: 'Breakfast Only',
    transport: 'Shared Air-Conditioned Vehicles',
    guideLanguages: ['English', 'Arabic', 'Urdu'],
    inclusions: [
      'Return Flights',
      'Visa Processing',
      'Airport Transfers',
      '7 nights in Makkah, 6 nights in Madinah',
      'Daily Breakfast',
      'Guided Umrah',
      'Ziyarah Tours in Makkah & Madinah'
    ],
    exclusions: [
      'Lunch & Dinner',
      'Personal Expenses',
      'Travel Insurance',
      'Qurbani/Sacrifice'
    ],
    image: 'https://source.unsplash.com/random/300x200/?mosque',
    reviews: [
      { user: 'Mohammed', rating: 4, comment: 'Good value for money, decent hotels' },
      { user: 'Aisha', rating: 5, comment: 'Excellent guides, made our journey spiritual' }
    ]
  },
  {
    id: 'p3',
    title: 'Premium Umrah Package - 7 Days',
    provider: 'Barakah Umrah Services',
    providerLogo: 'https://source.unsplash.com/random/20x20/?logo',
    rating: 4.9,
    price: 3200,
    duration: '7 days, 6 nights',
    amenities: ['5-Star Luxury Hotels', 'Private VIP Transportation', 'Private Guides', 'All Meals Included', 'Express Visa'],
    accommodation: {
      hotelName: 'Fairmont Makkah & Oberoi Madinah',
      location: 'Makkah & Madinah',
      distanceToHaram: 0.1,
      stars: 5
    },
    meals: 'Full Board (Premium Restaurants)',
    transport: 'Private Luxury Vehicles',
    guideLanguages: ['English', 'Arabic', 'French', 'Turkish', 'Urdu', 'Malay'],
    inclusions: [
      'Business Class Flights',
      'Express Visa Processing',
      'VIP Airport Transfers',
      '4 nights in Makkah, 2 nights in Madinah',
      'Gourmet Meals',
      'Private Umrah Guide',
      'Exclusive Ziyarah Tours',
      'VIP Access where possible',
      '24/7 Concierge Service'
    ],
    exclusions: [
      'Personal Expenses',
      'Qurbani/Sacrifice'
    ],
    image: 'https://source.unsplash.com/random/300x200/?mecca',
    reviews: [
      { user: 'Ibrahim', rating: 5, comment: 'Truly VIP experience, worth every penny' },
      { user: 'Zainab', rating: 5, comment: 'Exceptional service throughout' }
    ]
  },
  {
    id: 'p4',
    title: 'Budget Umrah Package - 12 Days',
    provider: 'Al-Rahma Travels',
    providerLogo: 'https://source.unsplash.com/random/20x20/?logo',
    rating: 4.3,
    price: 1200,
    duration: '12 days, 11 nights',
    amenities: ['3-Star Hotels', 'Shared Transportation', 'Group Guided Tours', 'Visa Processing'],
    accommodation: {
      hotelName: 'Al Tayseer Makkah & Andalus Madinah',
      location: 'Makkah & Madinah',
      distanceToHaram: 1.2,
      stars: 3
    },
    meals: 'No Meals Included',
    transport: 'Shared Bus Transportation',
    guideLanguages: ['English', 'Arabic', 'Urdu'],
    inclusions: [
      'Economy Flights',
      'Visa Processing',
      'Airport to Hotel Transfers',
      '6 nights in Makkah, 5 nights in Madinah',
      'Group Umrah Guidance',
      'Basic Ziyarah Tours'
    ],
    exclusions: [
      'All Meals',
      'Personal Expenses',
      'Travel Insurance',
      'Additional Tours',
      'Qurbani/Sacrifice'
    ],
    image: 'https://source.unsplash.com/random/300x200/?madinah',
    reviews: [
      { user: 'Ahmed', rating: 4, comment: 'Good basic package, hotels a bit far but fair price' },
      { user: 'Mariam', rating: 4.5, comment: 'Great for budget travelers, transport was reliable' }
    ]
  },
  {
    id: 'p5',
    title: 'Family Umrah Package - 15 Days',
    provider: 'Family Hajj & Umrah',
    providerLogo: 'https://source.unsplash.com/random/20x20/?logo',
    rating: 4.7,
    price: 2100,
    duration: '15 days, 14 nights',
    amenities: ['4-Star Family Rooms', 'Private Family Transportation', 'Child-Friendly Tours', 'Half Board Meals', 'Visa Processing'],
    accommodation: {
      hotelName: 'Hilton Suites Makkah & Madinah Marriott',
      location: 'Makkah & Madinah',
      distanceToHaram: 0.6,
      stars: 4
    },
    meals: 'Half Board (Breakfast & Dinner)',
    transport: 'Private Family Vehicles',
    guideLanguages: ['English', 'Arabic', 'Urdu', 'Turkish'],
    inclusions: [
      'Return Flights',
      'Visa Processing',
      'Airport Transfers',
      'Family Suites (8 nights in Makkah, 6 nights in Madinah)',
      'Breakfast & Dinner',
      'Family-Oriented Umrah Guide',
      'Kid-Friendly Ziyarah Tours',
      'Special Children\'s Programs'
    ],
    exclusions: [
      'Lunch',
      'Personal Expenses',
      'Travel Insurance',
      'Qurbani/Sacrifice'
    ],
    image: 'https://source.unsplash.com/random/300x200/?family',
    reviews: [
      { user: 'Hassan', rating: 5, comment: 'Perfect for families with children, very accommodating' },
      { user: 'Amina', rating: 4, comment: 'Children had a great educational experience' }
    ]
  }
];

// Mock Weather Data
export const mockWeatherData = [
  {
    city: 'Makkah',
    country: 'Saudi Arabia',
    current: {
      temp: 38,
      feelsLike: 40,
      humidity: 25,
      windSpeed: 12,
      description: 'Clear Sky',
      icon: 'sunny'
    },
    forecast: [
      { date: 'Mar 24', day: 'Today', tempMax: 38, tempMin: 26, description: 'Sunny', icon: 'sunny' },
      { date: 'Mar 25', day: 'Tue', tempMax: 39, tempMin: 27, description: 'Clear', icon: 'sunny' },
      { date: 'Mar 26', day: 'Wed', tempMax: 37, tempMin: 25, description: 'Sunny', icon: 'sunny' },
      { date: 'Mar 27', day: 'Thu', tempMax: 36, tempMin: 24, description: 'Partly Cloudy', icon: 'partly-cloudy' },
      { date: 'Mar 28', day: 'Fri', tempMax: 35, tempMin: 24, description: 'Clear', icon: 'sunny' }
    ],
    clothing: {
      season: 'Summer (Hot)',
      recommendations: [
        'Lightweight, breathable cotton clothing',
        'Head covering for sun protection (caps or traditional headdress)',
        'Comfortable walking shoes with good ventilation',
        'Light colored clothing to reflect heat',
        'Sunglasses and sunscreen',
        'Umbrella for sun protection',
        'Light jacket for air-conditioned places'
      ],
      tips: [
        'Stay hydrated by drinking plenty of water',
        'The marble floors of the Haram can get extremely hot, wear socks or appropriate footwear',
        'Use an umbrella or sun hat during peak sun hours',
        'Rest during the hottest part of the day (12pm-3pm)',
        'Carry a small towel to wipe sweat',
        'Use cooling sprays or misting fans'
      ]
    }
  },
  {
    city: 'Madinah',
    country: 'Saudi Arabia',
    current: {
      temp: 36,
      feelsLike: 38,
      humidity: 30,
      windSpeed: 10,
      description: 'Mostly Clear',
      icon: 'sunny'
    },
    forecast: [
      { date: 'Mar 24', day: 'Today', tempMax: 36, tempMin: 24, description: 'Clear', icon: 'sunny' },
      { date: 'Mar 25', day: 'Tue', tempMax: 37, tempMin: 25, description: 'Sunny', icon: 'sunny' },
      { date: 'Mar 26', day: 'Wed', tempMax: 36, tempMin: 24, description: 'Partly Cloudy', icon: 'partly-cloudy' },
      { date: 'Mar 27', day: 'Thu', tempMax: 34, tempMin: 23, description: 'Clear', icon: 'sunny' },
      { date: 'Mar 28', day: 'Fri', tempMax: 35, tempMin: 23, description: 'Sunny', icon: 'sunny' }
    ],
    clothing: {
      season: 'Summer (Hot)',
      recommendations: [
        'Lightweight, breathable cotton clothing',
        'Head covering for sun protection',
        'Comfortable walking shoes with good ventilation',
        'Light colored clothing to reflect heat',
        'Sunglasses and sunscreen',
        'Light jacket for evening or air-conditioned places'
      ],
      tips: [
        'Stay hydrated by drinking plenty of water',
        'Minimize outdoor activities during peak sun hours',
        'Use umbrellas for sun protection',
        'Carry a small towel to wipe sweat',
        'Rest frequently in shaded areas',
        'Use cooling sprays or misting fans'
      ]
    }
  },
  {
    city: 'Jeddah',
    country: 'Saudi Arabia',
    current: {
      temp: 34,
      feelsLike: 37,
      humidity: 65,
      windSpeed: 15,
      description: 'Partly Cloudy',
      icon: 'partly-cloudy'
    },
    forecast: [
      { date: 'Mar 24', day: 'Today', tempMax: 34, tempMin: 26, description: 'Partly Cloudy', icon: 'partly-cloudy' },
      { date: 'Mar 25', day: 'Tue', tempMax: 33, tempMin: 27, description: 'Mostly Sunny', icon: 'sunny' },
      { date: 'Mar 26', day: 'Wed', tempMax: 32, tempMin: 25, description: 'Humid', icon: 'partly-cloudy' },
      { date: 'Mar 27', day: 'Thu', tempMax: 33, tempMin: 26, description: 'Partly Cloudy', icon: 'partly-cloudy' },
      { date: 'Mar 28', day: 'Fri', tempMax: 34, tempMin: 27, description: 'Mostly Sunny', icon: 'sunny' }
    ],
    clothing: {
      season: 'Summer (Hot & Humid)',
      recommendations: [
        'Very lightweight, moisture-wicking fabrics',
        'Head covering for sun protection',
        'Comfortable sandals or breathable shoes',
        'Light colored clothing to reflect heat',
        'Waterproof sunscreen',
        'Swimwear if staying near the beach',
        'Light jacket for air-conditioned places'
      ],
      tips: [
        'The humidity will make it feel hotter than the actual temperature',
        'Change clothes more frequently due to humidity',
        'Drink more water to compensate for sweating',
        'Avoid heavy physical exertion outdoors',
        'Use anti-perspirant and powder to stay comfortable',
        'Keep electronics protected from humidity'
      ]
    }
  }
];

// Mock Arabic Phrases
export const mockPhrases = [
  {
    id: 'phrase1',
    category: 'greetings',
    english: 'Peace be upon you',
    arabic: 'السلام عليكم',
    transliteration: 'As-salamu alaykum',
    useful: true
  },
  {
    id: 'phrase2',
    category: 'greetings',
    english: 'And peace be upon you too',
    arabic: 'وعليكم السلام',
    transliteration: 'Wa alaykum as-salam',
    useful: true
  },
  {
    id: 'phrase3',
    category: 'greetings',
    english: 'How are you?',
    arabic: 'كيف حالك؟',
    transliteration: 'Kayfa haluk?',
    useful: true
  },
  {
    id: 'phrase4',
    category: 'greetings',
    english: 'I am fine, praise be to Allah',
    arabic: 'أنا بخير الحمد لله',
    transliteration: 'Ana bikhair alhamdulillah',
    useful: true
  },
  {
    id: 'phrase5',
    category: 'religious',
    english: 'In the name of Allah',
    arabic: 'بسم الله',
    transliteration: 'Bismillah',
    useful: true
  },
  {
    id: 'phrase6',
    category: 'religious',
    english: 'Praise be to Allah',
    arabic: 'الحمد لله',
    transliteration: 'Alhamdulillah',
    useful: true
  },
  {
    id: 'phrase7',
    category: 'religious',
    english: 'If Allah wills',
    arabic: 'إن شاء الله',
    transliteration: 'Insha Allah',
    useful: true
  },
  {
    id: 'phrase8',
    category: 'religious',
    english: 'Where is the prayer area?',
    arabic: 'أين منطقة الصلاة؟',
    transliteration: 'Ayna mantiqat as-salah?',
    useful: true
  },
  {
    id: 'phrase9',
    category: 'transportation',
    english: 'How much to the Haram?',
    arabic: 'كم إلى الحرم؟',
    transliteration: 'Kam ilal Haram?',
    useful: true
  },
  {
    id: 'phrase10',
    category: 'transportation',
    english: 'I want to go to Madinah',
    arabic: 'أريد أن أذهب إلى المدينة',
    transliteration: 'Ureedu an athaba ila al-Madinah',
    useful: false
  },
  {
    id: 'phrase11',
    category: 'transportation',
    english: 'How much is the taxi fare?',
    arabic: 'كم أجرة التاكسي؟',
    transliteration: 'Kam ujrat at-taxi?',
    useful: true
  },
  {
    id: 'phrase12',
    category: 'transportation',
    english: 'Please use the meter',
    arabic: 'من فضلك استخدم العداد',
    transliteration: 'Min fadlik istakhdam al-addad',
    useful: false
  },
  {
    id: 'phrase13',
    category: 'accommodation',
    english: 'I have a reservation',
    arabic: 'لدي حجز',
    transliteration: 'Ladayya hajz',
    useful: false
  },
  {
    id: 'phrase14',
    category: 'accommodation',
    english: 'Is breakfast included?',
    arabic: 'هل الإفطار مشمول؟',
    transliteration: 'Hal al-iftar mashmul?',
    useful: false
  },
  {
    id: 'phrase15',
    category: 'accommodation',
    english: 'I need clean towels, please',
    arabic: 'أحتاج مناشف نظيفة، من فضلك',
    transliteration: 'Ahtaj manashif nazeefa, min fadlik',
    useful: false
  },
  {
    id: 'phrase16',
    category: 'food',
    english: 'I would like to order food',
    arabic: 'أود أن أطلب طعاماً',
    transliteration: 'Awaddu an atluba ta\'aman',
    useful: false
  },
  {
    id: 'phrase17',
    category: 'food',
    english: 'The bill, please',
    arabic: 'الحساب، من فضلك',
    transliteration: 'Al-hisab, min fadlik',
    useful: true
  },
  {
    id: 'phrase18',
    category: 'food',
    english: 'Is this halal?',
    arabic: 'هل هذا حلال؟',
    transliteration: 'Hal hatha halal?',
    useful: true
  },
  {
    id: 'phrase19',
    category: 'shopping',
    english: 'How much does this cost?',
    arabic: 'كم يكلف هذا؟',
    transliteration: 'Kam yukallifu hatha?',
    useful: true
  },
  {
    id: 'phrase20',
    category: 'shopping',
    english: 'That\'s too expensive',
    arabic: 'هذا مكلف جداً',
    transliteration: 'Hatha mukallif jiddan',
    useful: true
  },
  {
    id: 'phrase21',
    category: 'shopping',
    english: 'Can you lower the price?',
    arabic: 'هل يمكنك تخفيض السعر؟',
    transliteration: 'Hal yumkinuka takhfeed as-si\'r?',
    useful: true
  },
  {
    id: 'phrase22',
    category: 'conversation',
    english: 'I don\'t speak Arabic',
    arabic: 'أنا لا أتكلم العربية',
    transliteration: 'Ana la atakallam al-arabiya',
    useful: true
  },
  {
    id: 'phrase23',
    category: 'conversation',
    english: 'Do you speak English?',
    arabic: 'هل تتكلم الإنجليزية؟',
    transliteration: 'Hal tatakallam al-injliziya?',
    useful: true
  },
  {
    id: 'phrase24',
    category: 'conversation',
    english: 'I understand',
    arabic: 'أنا أفهم',
    transliteration: 'Ana afham',
    useful: false
  },
  {
    id: 'phrase25',
    category: 'emergency',
    english: 'I need help',
    arabic: 'أحتاج مساعدة',
    transliteration: 'Ahtaj musa\'ada',
    useful: true
  },
  {
    id: 'phrase26',
    category: 'emergency',
    english: 'Call an ambulance',
    arabic: 'اتصل بالإسعاف',
    transliteration: 'Ittasil bil-is\'af',
    useful: true
  },
  {
    id: 'phrase27',
    category: 'emergency',
    english: 'I lost my passport',
    arabic: 'فقدت جواز سفري',
    transliteration: 'Faqadtu jawaza safari',
    useful: false
  },
  {
    id: 'phrase28',
    category: 'emergency',
    english: 'Where is the nearest hospital?',
    arabic: 'أين أقرب مستشفى؟',
    transliteration: 'Ayna aqrab mustashfa?',
    useful: false
  }
];
