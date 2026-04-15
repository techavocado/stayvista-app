const mongoose = require('mongoose');
const ObjectId = (id) => new mongoose.Types.ObjectId(id);

 const sampleListings = [ {
    _id: ObjectId('69db881148c27c87be54329f'),
    title: 'Cozy Beachfront Cottage',
    description: 'Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    price: 1500,
    location: 'Malibu',
    country: 'United States',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ -118.68942327797413, 34.03559120559928 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432a0'),
    title: 'Modern Loft in Downtown',
    description: 'Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    price: 1200,
    location: 'New York City',
    country: 'United States',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ -74.00601547211409, 40.7127281077059 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432a1'),
    title: 'Mountain Retreat',
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
    },
    price: 1000,
    location: 'california',
    country: 'United States',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ -118.75599704682827, 36.70146317295155 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432a2'),
    title: 'Historic Villa in Tuscany',
    description: 'Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
    },
    price: 2500,
    location: 'Florence',
    country: 'Italy',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ -79.76716607809067, 34.19844374687004 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432a3'),
    title: 'Secluded Treehouse Getaway',
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    price: 800,
    location: 'Portland',
    country: 'United States',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ -122.67419412732124, 45.52024728220982 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432a4'),
    title: 'Beachfront Paradise',
    description: 'Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    price: 2000,
    location: 'Cancun',
    country: 'Mexico',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ -86.84257630258799, 21.152746957637344 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432a5'),
    title: 'Rustic Cabin by the Lake',
    description: 'Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
    },
    price: 900,
    location: 'Lake Tahoe',
    country: 'United States',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ -120.03346061578594, 39.09608811013475 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432a6'),
    title: 'Luxury Penthouse with City Views',
    description: 'Indulge in luxury living with panoramic city views from this stunning penthouse apartment.',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
    },
    price: 3500,
    location: 'Los Angeles',
    country: 'United States',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ -118.24276607483625, 34.05369110515695 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432a7'),
    title: 'Ski-In/Ski-Out Chalet',
    description: 'Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
    },
    price: 3000,
    location: 'Verbier',
    country: 'Switzerland',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ 7.228676341474056, 46.096101264532436 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432a8'),
    title: 'Safari Lodge in the Serengeti',
    description: 'Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
    },
    price: 4000,
    location: 'Serengeti National Park',
    country: 'Tanzania',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ 34.78616897000029, -2.338018899916165 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432a9'),
    title: 'Historic Canal House',
    description: "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    price: 1800,
    location: 'Amsterdam',
    country: 'Netherlands',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ 4.89245317876339, 52.373079696010734 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432aa'),
    title: 'Private Island Retreat',
    description: 'Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
    },
    price: 10000,
    location: 'Fiji',
    country: 'Fiji',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ 179.01227351278067, -18.12396947025067 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432ab'),
    title: 'Charming Cottage in the Cotswolds',
    description: 'Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    price: 1200,
    location: 'Cotswolds',
    country: 'United Kingdom',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ -82.61868952075895, 28.07881025823654 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432ac'),
    title: 'Historic Brownstone in Boston',
    description: 'Step back in time in this elegant historic brownstone located in the heart of Boston.',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
    },
    price: 2200,
    location: 'Boston',
    country: 'United States',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ -71.05783056467772, 42.358833784280414 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432ad'),
    title: 'Beachfront Bungalow in Bali',
    description: 'Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
    },
    price: 1800,
    location: 'Bali',
    country: 'Indonesia',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ 115.19192028790712, -8.227130238884806 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432ae'),
    title: 'Mountain View Cabin in Banff',
    description: 'Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
    },
    price: 1500,
    location: 'Banff',
    country: 'Canada',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ -116.12371834517921, 51.543023777574064 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432af'),
    title: 'Art Deco Apartment in Miami',
    description: 'Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.',
    image: {
      filename: 'listingimage',
      url: 'https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
    },
    price: 1600,
    location: 'Miami',
    country: 'United States',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ -80.19359741359949, 25.774156703131922 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432b0'),
    title: 'Tropical Villa in Phuket',
    description: 'Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
    },
    price: 3000,
    location: 'Phuket',
    country: 'Thailand',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ 98.3888354655113, 7.883519951641633 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432b1'),
    title: 'Historic Castle in Scotland',
    description: 'Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
    },
    price: 4000,
    location: 'Scottish Highlands',
    country: 'United Kingdom',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ -5.000000037252903, 56.80000005256766 ]
    }
  },
  {
    _id: ObjectId('69db881148c27c87be5432b2'),
    title: 'Desert Oasis in Dubai',
    description: 'Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.',
    image: {
      filename: 'listingimage',
      url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
    },
    price: 5000,
    location: 'Dubai',
    country: 'United Arab Emirates',
    reviews: [],
    owner: ObjectId('69df2a5458bdefd80aa88ee9'),
    __v: 0,
    geometry: {
      type: 'Point',
      coordinates: [ 55.28958477079868, 25.229634139099623 ]
    }
  }
]

module.exports = { data2: sampleListings };