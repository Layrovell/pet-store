const imagesFullList = [
  'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1520087619250-584c0cbd35e8?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1469899324414-c72bfb4d4161?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1566265664519-8d9d4de5965d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1694822211417-e3535443d89d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1514917073844-2f691ae526c0?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1548724582-1216ec5351ce?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1432148792624-b7571bfb2c1e?q=80&w=1582&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1442986100521-97940e075c81?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1493301829654-31b2d0f38fd7?q=80&w=1544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1467839024528-ac3042ac0ae7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1491629378451-b740fed22d86?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export const products = [
  {
    id: 0,
    name: 'green kitty',
    description: 'Description for red kitty product',
    status: 'available',
    price: 125,
    createdat: '2024-04-26T11:39:56.070Z',
    images: [
      'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1520087619250-584c0cbd35e8?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1469899324414-c72bfb4d4161?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1566265664519-8d9d4de5965d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    categoryId: 1,
    attributes: {
      weight: '20',
      age: '5',
      color: 'green',
    },
  },
  {
    id: 1,
    name: 'red parrot',
    description: 'Description for red parrot product',
    status: 'available',
    price: 135,
    createdat: '2024-04-26T11:39:56.070Z',
    categoryId: 2,
    attributes: {
      weight: '30',
      lifespan: '50',
      color: 'red',
    },
  },
  {
    id: 2,
    name: 'white dog',
    description: 'Description for white dog product',
    status: 'available',
    price: 156,
    createdat: '2024-04-26T11:39:56.070Z',
    categoryId: 3,
    attributes: {
      weight: '60',
      lifespan: '16',
      color: 'white',
    },
  },
  {
    id: 3,
    name: 'ara',
    description: 'Description for ara product',
    status: 'available',
    price: 565,
    createdat: '2024-04-26T11:39:56.070Z',
    categoryId: 2,
    attributes: {
      weight: '50',
      price: '500',
      color: 'red',
    },
  },
  {
    id: 4,
    name: 'hamster',
    description: 'Description for hamster product',
    status: 'available',
    price: 315,
    createdat: '2024-04-26T11:39:56.070Z',
    categoryId: 1,
    attributes: {
      weight: '3',
      height: '5',
      color: 'brown',
    },
  },
  {
    id: 5,
    name: 'mouse',
    description: 'Description for mouse product',
    status: 'available',
    price: 145,
    createdat: '2024-04-26T11:39:56.070Z',
    categoryId: 1,
    attributes: {
      weight: '5',
      lifespan: '23',
      color: 'white',
    },
  },
  {
    id: 6,
    name: 'red parrot',
    description: 'Description for red parrot product',
    status: 'available',
    price: 15,
    createdat: '2024-04-26T11:39:56.070Z',
    categoryId: 1,
    attributes: {
      weight: '50',
      price: '500',
      color: 'red',
    },
  },
  {
    id: 7,
    name: 'red parrot',
    description: 'Description for red parrot product',
    status: 'available',
    price: 15,
    createdat: '2024-04-26T11:39:56.070Z',
    categoryId: 1,
    attributes: {
      weight: '50',
      price: '500',
      color: 'red',
    },
  },
];

export const getRandomImages = () => {
  const shuffled = imagesFullList.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
};

export const getMockedProducts = () => {
  return products.map((p) => {
    const random = getRandomImages();
    return {
      ...p,
      images: random,
    };
  });
};
