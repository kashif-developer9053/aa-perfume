// /app/lib/seed.js
import connectDB from './db';
import User from './models/User';
import Category from './models/Category';
import Product from './models/Product';
import Setting from './models/Setting';

const usersToSeed = [
  {
    name: 'Admin',
    email: 'admin@chocolatefactory.com',
    password: 'admin123',
    phone: '03001234567',
    role: 'admin',
    address: {
      street: '1 Factory Road',
      city: 'Lahore',
      state: 'Punjab',
      zipCode: '54000',
      country: 'Pakistan',
    },
  },
  {
    name: 'Ali Hassan',
    email: 'ali@example.com',
    password: 'user1234',
    phone: '03111234567',
    role: 'user',
    address: {
      street: '12 Garden Town',
      city: 'Lahore',
      state: 'Punjab',
      zipCode: '54600',
      country: 'Pakistan',
    },
  },
  {
    name: 'Sara Khan',
    email: 'sara@example.com',
    password: 'user1234',
    phone: '03211234567',
    role: 'user',
    address: {
      street: '45 Defence Phase 5',
      city: 'Karachi',
      state: 'Sindh',
      zipCode: '75500',
      country: 'Pakistan',
    },
  },
  {
    name: 'Usman Raza',
    email: 'usman@example.com',
    password: 'user1234',
    phone: '03451234567',
    role: 'user',
    address: {
      street: '78 F-7 Sector',
      city: 'Islamabad',
      state: 'ICT',
      zipCode: '44000',
      country: 'Pakistan',
    },
  },
];

/**
 * Seed the database with initial data
 */
export async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Connect to database
    await connectDB();

    // --- Seed Users ---
    console.log('Seeding users...');
    const seededUsers = [];

    for (const userData of usersToSeed) {
      const exists = await User.findOne({ email: userData.email });
      if (exists) {
        console.log(`  Skipped (already exists): ${userData.email}`);
        seededUsers.push({ email: userData.email, password: userData.password, role: userData.role, status: 'existing' });
      } else {
        // Use save() so the pre-save password-hashing middleware runs
        const user = new User(userData);
        await user.save();
        console.log(`  Created: ${userData.email} [${userData.role}]`);
        seededUsers.push({ email: userData.email, password: userData.password, role: userData.role, status: 'created' });
      }
    }

    console.log('Users seeding done.');
    
    // --- Seed Categories ---
    const categoriesCount = await Category.countDocuments();

    if (categoriesCount === 0) {
      console.log('Creating perfume categories...');

      await Category.insertMany([
        {
          name: "Men's Fragrances",
          description: 'Bold, woody, and fresh scents crafted for men.',
          image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80',
        },
        {
          name: "Women's Fragrances",
          description: 'Elegant floral, fruity, and oriental scents for women.',
          image: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=600&q=80',
        },
        {
          name: 'Unisex Fragrances',
          description: 'Versatile and sophisticated scents for everyone.',
          image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80',
        },
        {
          name: 'Attar & Oud',
          description: 'Traditional Arabic attars and pure oud oils.',
          image: 'https://images.unsplash.com/photo-1506485338023-6ce5f36692df?w=600&q=80',
        },
        {
          name: 'Body Mists & Sprays',
          description: 'Light and refreshing body mists for everyday use.',
          image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
        },
        {
          name: 'Gift Sets',
          description: 'Curated fragrance gift sets for every occasion.',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
        },
      ]);

      console.log('Perfume categories created successfully!');
    } else {
      console.log('Categories already exist, skipping creation.');
    }

    // --- Seed Products ---
    const productsCount = await Product.countDocuments();

    if (productsCount === 0) {
      console.log('Creating perfume products...');

      const mens      = await Category.findOne({ name: "Men's Fragrances" });
      const womens    = await Category.findOne({ name: "Women's Fragrances" });
      const unisex    = await Category.findOne({ name: 'Unisex Fragrances' });
      const attar     = await Category.findOne({ name: 'Attar & Oud' });
      const mists     = await Category.findOne({ name: 'Body Mists & Sprays' });
      const giftSets  = await Category.findOne({ name: 'Gift Sets' });

      if (mens && womens && unisex && attar && mists && giftSets) {
        await Product.insertMany([

          // ── Men's Fragrances ──────────────────────────────────────
          {
            name: 'Bleu de Chanel EDP',
            description: 'A woody, aromatic fragrance for the modern man. Opens with citrus notes of lemon and bergamot, with a heart of ginger and jasmine, resting on a base of sandalwood and cedar.',
            price: 18500,
            discountedPrice: 16500,
            images: [
              'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80',
              'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
            ],
            category: mens._id,
            brand: 'Chanel',
            stock: 30,
            rating: 4.8,
            numReviews: 124,
            featured: true,
          },
          {
            name: 'Dior Sauvage EDP',
            description: 'An intense and powerful EDP with a raw freshness. Top notes of bergamot and pepper, heart of Sichuan pepper and lavender, base of amber and cedarwood.',
            price: 21000,
            images: [
              'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80',
              'https://images.unsplash.com/photo-1563170351-be54689b8fd5?w=600&q=80',
            ],
            category: mens._id,
            brand: 'Dior',
            stock: 25,
            rating: 4.9,
            numReviews: 210,
            featured: true,
          },
          {
            name: 'Acqua di Gio EDP',
            description: 'A timeless aquatic fragrance inspired by the Mediterranean Sea. Fresh marine notes with bergamot, heart of rosemary and marine accord, base of patchouli and amber.',
            price: 15500,
            discountedPrice: 13800,
            images: [
              'https://images.unsplash.com/photo-1594913244813-9e4be6879c68?w=600&q=80',
            ],
            category: mens._id,
            brand: 'Giorgio Armani',
            stock: 40,
            rating: 4.6,
            numReviews: 98,
            featured: false,
          },
          {
            name: 'Polo Black EDT',
            description: 'A mysterious and seductive fragrance with top notes of mango and tangerine, heart of lotus and agarwood, and a base of vetiver and patchouli.',
            price: 9500,
            images: [
              'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80',
            ],
            category: mens._id,
            brand: 'Ralph Lauren',
            stock: 50,
            rating: 4.3,
            numReviews: 65,
            featured: false,
          },

          // ── Women's Fragrances ────────────────────────────────────
          {
            name: 'Chanel No. 5 EDP',
            description: 'The iconic timeless fragrance. A floral aldehyde with top notes of neroli and ylang-ylang, heart of rose and jasmine, base of sandalwood, vetiver, and vanilla.',
            price: 22000,
            images: [
              'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=600&q=80',
              'https://images.unsplash.com/photo-1588776814546-1ffbb7f1b098?w=600&q=80',
            ],
            category: womens._id,
            brand: 'Chanel',
            stock: 20,
            rating: 4.9,
            numReviews: 312,
            featured: true,
          },
          {
            name: 'Miss Dior Blooming Bouquet',
            description: 'A delightfully fresh and feminine fragrance. Top notes of peony and pink pepper, heart of Damascus rose, base of white musk and patchouli.',
            price: 17500,
            discountedPrice: 15500,
            images: [
              'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
            ],
            category: womens._id,
            brand: 'Dior',
            stock: 35,
            rating: 4.7,
            numReviews: 178,
            featured: true,
          },
          {
            name: 'La Vie est Belle EDP',
            description: 'A joyful and optimistic fragrance. Iris and patchouli heart with top notes of blackcurrant and pear, and a warm base of praline, vanilla, and sandalwood.',
            price: 14500,
            images: [
              'https://images.unsplash.com/photo-1583467875263-d50a2e21df4a?w=600&q=80',
            ],
            category: womens._id,
            brand: 'Lancôme',
            stock: 45,
            rating: 4.6,
            numReviews: 143,
            featured: false,
          },
          {
            name: 'Black Opium EDP',
            description: 'An addictive and sensual fragrance. Top notes of pink pepper and orange blossom, heart of coffee and jasmine, base of vanilla and patchouli.',
            price: 19000,
            discountedPrice: 17000,
            images: [
              'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80',
            ],
            category: womens._id,
            brand: 'Yves Saint Laurent',
            stock: 28,
            rating: 4.8,
            numReviews: 225,
            featured: false,
          },

          // ── Unisex Fragrances ─────────────────────────────────────
          {
            name: 'Oud Wood EDP',
            description: 'A rare and exotic unisex fragrance. Rare oud wood combined with rosewood and cardamom, with a smoky, sensual base of sandalwood, vetiver, and amber.',
            price: 35000,
            images: [
              'https://images.unsplash.com/photo-1506485338023-6ce5f36692df?w=600&q=80',
              'https://images.unsplash.com/photo-1566977776052-6e61e35bf9be?w=600&q=80',
            ],
            category: unisex._id,
            brand: 'Tom Ford',
            stock: 15,
            rating: 4.9,
            numReviews: 87,
            featured: true,
          },
          {
            name: 'Silver Mountain Water EDP',
            description: 'Fresh and luminous, inspired by the snow-capped Alps. Top notes of bergamot and mandarin, heart of green tea and blackcurrant, base of musk and sandalwood.',
            price: 42000,
            images: [
              'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80',
            ],
            category: unisex._id,
            brand: 'Creed',
            stock: 10,
            rating: 4.8,
            numReviews: 56,
            featured: false,
          },
          {
            name: 'Molecule 01 EDT',
            description: 'A minimalist single-molecule fragrance (Iso E Super). Unique woody-cedar scent that reacts with your skin chemistry to create a completely individual fragrance.',
            price: 12500,
            discountedPrice: 11000,
            images: [
              'https://images.unsplash.com/photo-1563170351-be54689b8fd5?w=600&q=80',
            ],
            category: unisex._id,
            brand: 'Escentric Molecules',
            stock: 22,
            rating: 4.5,
            numReviews: 72,
            featured: false,
          },

          // ── Attar & Oud ───────────────────────────────────────────
          {
            name: 'Rose Oud Attar',
            description: 'A luxurious blend of pure Bulgarian rose and aged agarwood oud oil. Rich, deep, and long-lasting. Applied directly to skin for an intensely personal scent.',
            price: 3500,
            images: [
              'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=600&q=80',
              'https://images.unsplash.com/photo-1600612253971-8b8a0f527a00?w=600&q=80',
            ],
            category: attar._id,
            brand: 'Al Haramain',
            stock: 60,
            rating: 4.7,
            numReviews: 94,
            featured: false,
          },
          {
            name: 'Musk Al Tahara',
            description: 'Pure white musk attar, clean and heavenly. A soft, powdery musk that is both soothing and refreshing. Perfect as a daily wear non-alcoholic perfume.',
            price: 2800,
            images: [
              'https://images.unsplash.com/photo-1566977776052-6e61e35bf9be?w=600&q=80',
            ],
            category: attar._id,
            brand: 'Arabian Oud',
            stock: 80,
            rating: 4.5,
            numReviews: 112,
            featured: false,
          },
          {
            name: 'Oud Al Shams Attar',
            description: 'Sun-kissed oud oil with warm amber and saffron. An exquisite blend capturing the essence of Arabian luxury with rich, smoky, and resinous notes.',
            price: 4200,
            discountedPrice: 3800,
            images: [
              'https://images.unsplash.com/photo-1547887538-047f814b07e5?w=600&q=80',
            ],
            category: attar._id,
            brand: 'Ajmal',
            stock: 40,
            rating: 4.8,
            numReviews: 76,
            featured: true,
          },
          {
            name: 'Pure Oud Cambodi',
            description: 'Cambodian oud oil of exceptional purity and quality. Deep, resinous, and woody with hints of leather and earth. A collector\'s fragrance for true oud lovers.',
            price: 5500,
            images: [
              'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=600&q=80',
            ],
            category: attar._id,
            brand: 'Swiss Arabian',
            stock: 20,
            rating: 4.9,
            numReviews: 45,
            featured: false,
          },

          // ── Body Mists & Sprays ───────────────────────────────────
          {
            name: 'Bare Vanilla Body Mist',
            description: 'A warm, comforting vanilla mist with hints of sandalwood and musk. Light enough for everyday use, long-lasting enough to keep you smelling great all day.',
            price: 2500,
            discountedPrice: 2000,
            images: [
              'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
            ],
            category: mists._id,
            brand: "Victoria's Secret",
            stock: 100,
            rating: 4.4,
            numReviews: 188,
            featured: false,
          },
          {
            name: 'Japanese Cherry Blossom Mist',
            description: 'A delicate floral mist inspired by Japan\'s iconic cherry blossoms. Notes of cherry blossom, mimosa petals, and fresh white jasmine on a soft musk base.',
            price: 2200,
            images: [
              'https://images.unsplash.com/photo-1616699002805-30b03e874a27?w=600&q=80',
            ],
            category: mists._id,
            brand: 'Bath & Body Works',
            stock: 120,
            rating: 4.5,
            numReviews: 234,
            featured: true,
          },
          {
            name: 'Pink Vanilla Wish Mist',
            description: 'A playful and sweet body mist with notes of pink cashmere, vanilla bean, and warm amber. Light, feminine, and perfect for layering with other fragrances.',
            price: 1800,
            images: [
              'https://images.unsplash.com/photo-1583467875263-d50a2e21df4a?w=600&q=80',
            ],
            category: mists._id,
            brand: 'Bath & Body Works',
            stock: 90,
            rating: 4.2,
            numReviews: 156,
            featured: false,
          },

          // ── Gift Sets ─────────────────────────────────────────────
          {
            name: 'Chanel Les Exclusifs Gift Set',
            description: 'A prestigious collection of 6 mini Chanel fragrances including No. 5, Coco Mademoiselle, Chance, Bleu de Chanel, Allure, and Gabrielle. Presented in a luxury box.',
            price: 28000,
            images: [
              'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
              'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
            ],
            category: giftSets._id,
            brand: 'Chanel',
            stock: 12,
            rating: 4.9,
            numReviews: 52,
            featured: true,
          },
          {
            name: 'Dior Discovery Coffret',
            description: 'A stunning set of 5 Dior iconic miniatures: Sauvage, Miss Dior, J\'adore, Dior Homme, and Poison Girl. Beautifully packaged — the perfect gift for fragrance lovers.',
            price: 25000,
            discountedPrice: 22000,
            images: [
              'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
            ],
            category: giftSets._id,
            brand: 'Dior',
            stock: 15,
            rating: 4.8,
            numReviews: 67,
            featured: false,
          },
          {
            name: 'Arabian Nights Gift Set',
            description: 'A luxurious Arabic fragrance gift set containing 3 attars (Rose Oud, Musk, Amber) plus a decorative oud burner. Beautifully presented in a handcrafted wooden box.',
            price: 8500,
            discountedPrice: 7500,
            images: [
              'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=600&q=80',
              'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=600&q=80',
            ],
            category: giftSets._id,
            brand: 'Al Haramain',
            stock: 25,
            rating: 4.7,
            numReviews: 89,
            featured: true,
          },

        ]);

        console.log('Perfume products created successfully!');
      }
    } else {
      console.log('Products already exist, skipping creation.');
    }
    
    // Check if default settings exist
    const settingsCount = await Setting.countDocuments();
    
    if (settingsCount === 0) {
      console.log('Creating default settings...');
      
      // Create default settings
      const settings = [
        { key: 'storeName',              value: 'Chocolate Factory Perfumes', group: 'general' },
        { key: 'storeEmail',             value: 'info@chocolatefactory.com',  group: 'general' },
        { key: 'storePhone',             value: '+92-300-1234567',            group: 'general' },
        { key: 'storeAddress',           value: '1 Factory Road, Lahore, Punjab 54000, Pakistan', group: 'general' },
        { key: 'storeLogo',              value: '/logo.png',                  group: 'general' },
        { key: 'storeFavicon',           value: '/favicon.ico',               group: 'general' },
        { key: 'storeCurrency',          value: 'PKR',                        group: 'general' },
        { key: 'taxRate',                value: 0,                            group: 'payment' },
        { key: 'freeShippingThreshold',  value: 5000,                         group: 'payment' },
        { key: 'standardShippingFee',    value: 250,                          group: 'payment' },
        { key: 'paymentMethods',         value: ['cod'],                      group: 'payment' },
        {
          key: 'socialLinks',
          value: {
            facebook:  'https://facebook.com/chocolatefactoryperfumes',
            instagram: 'https://instagram.com/chocolatefactoryperfumes',
            twitter:   'https://twitter.com/chocolatefactory',
          },
          group: 'social',
        },
      ];
      
      for (const setting of settings) {
        await Setting.create(setting);
      }
      
      console.log('Default settings created successfully!');
    } else {
      console.log('Settings already exist, skipping creation.');
    }
    
    console.log('Database seeding completed!');

    return {
      success: true,
      message: 'Database seeded successfully',
      users: seededUsers,
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    return {
      success: false,
      message: error.message,
    };
  }
}