const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Vendor = require('./models/Vendor');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, { family: 4, serverSelectionTimeoutMS: 5000 });
        console.log('MongoDB Connected correctly...');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();

        // 1. Clear Database
        await Order.deleteMany();
        await Cart.deleteMany();
        await Product.deleteMany();
        await Vendor.deleteMany();
        await User.deleteMany();

        console.log('Data Cleared!');

        // 2. Create Base Users
        const createdUsers = await User.insertMany([
            {
                name: 'System Admin',
                email: 'admin@cinematicgallery.com',
                password: 'password123',
                role: 'admin'
            },
            {
                name: 'Elias Thorne',
                email: 'vendor@cinematicgallery.com',
                password: 'password123',
                role: 'vendor'
            },
            {
                name: 'Alex Collector',
                email: 'customer@example.com',
                password: 'password123',
                role: 'customer'
            }
        ]);

        const adminUser = createdUsers[0];
        const vendorUser = createdUsers[1];

        // 3. Create Vendor Profile
        const createdVendor = await Vendor.create({
            userId: vendorUser._id,
            storeName: 'The Noir Collection',
            storeDescription: 'Curated premium cinematic artifacts and prints.',
        });

        // 4. Create Premium Products
        const sampleProducts = [
            {
                vendorId: createdVendor._id,
                name: 'LEICA NOCTILUX-M 50mm f/0.95 ASPH.',
                description: 'Silver Anodized Finish | 0.95 Aperture. A legendary lens known for its unique depth of field and soft rendering. Perfect for cinematic portraits and low-light environmental shots.',
                price: 12495.00,
                stock: 3,
                category: 'Camera Gear',
                images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuB_AE7z7Qoeq9CatuFptwK_3idBTfomwPnnyK_L2HU-WkUOOvfS_uWfC5DH3HePc4mKM2tZBuEpsIRr87pp65d6GXCjVlXIbcgrYqAjBN2t5zF2HPvdcZX0nigIH6wU57Ri5S9BK9-D5MoHcx_WhElYjz2q7NqvSlDT3aAtLaOquaZ2cpW2GB83xKPBZlBOGha36V9JQNQlb-VJIB0MSt6bD6f9yUan1fvPLExo5WH0AAWMg50WelDTjy6NTVp-g7MNpjzRa0-weCQ']
            },
            {
                vendorId: createdVendor._id,
                name: 'ILFORD HP5 PLUS 400',
                description: '120 Medium Format | 5 Pack. The classic high-speed black and white film perfect for creating moody and dramatic tones across varied lighting scenarios.',
                price: 45.00,
                stock: 120,
                category: 'Film Media',
                images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuD-m1oXjNG_ORgY2QGaU-fkwyHGaNT3sV7D8cQH1R7T36qF6Pe6ADRTRpzWfsYDiliVOIJm_wiZEoKDVSxuIDgH_4zQG5MopndsCZzVVCrQ-bpphUnqlAwhoLlXyqk-E_Pq599BvIu0UHhkaL8JCW7DMUepWvxBZlhSSOYIh9ivTfTsO4ycuaiGeMQcfZDhXGI2JfLYwq6p_2hTQYdTZPCULhOUpeSHU4P-wvEN_u9kIzYrC7u_4HiDBLbhRq242WRcFqALarqaopw']
            },
            {
                vendorId: createdVendor._id,
                name: 'Metropolis Shadows Print',
                description: 'Archival Pigment Print • 24x36". A limited edition monochrome architectural photograph depicting harsh light and sharp geometrical shadows.',
                price: 1250.00,
                stock: 10,
                category: 'Art Prints',
                images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAUACRh8YahRVUWYgAG98chBwEt7tj1i5OOBPZt5c3DZp-VtbHVUd55Etwc-2taLohEw9itj9vNNfa39KNSm3r8h_Htz01uq8Qur6R6RhsVjJ_G-sS189YuOjXhD4FkjJpaX_lUVq-kKIH8dflBHAL6_Hd8CRSSfzxmHFNyaDsxQ6c94wXEel0zinx_OMj6kjwv1udwLqh_jK4QPmv3SDMdCgikT6ZDFKwb1q_Cr175yn_TDg7cxgADC9QHFym7qWL3ulU-NsdE0qA']
            },
            {
                vendorId: createdVendor._id,
                name: 'Neon Rain Photo Book',
                description: 'Silver Gelatin • First Edition. A 200-page photobook highlighting long exposure cinematic cyberpunk aesthetics.',
                price: 850.00,
                stock: 50,
                category: 'Publications',
                images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDrmnYFWtJJXfltCp4lwk_WjSNJFR939VFRErxSX8Clbx09hoQU9awmJmJq1Y3tMI3KmhPVESAxdw5i0zCDY01arBD1h9_Pj_gm8w89JwbbLQTyYT-Zt6ZrZGmpDn3RDp0NbQnoViuAdr5Xj0S9U4QnkPs47w9it9JmlWpT4_jv2N-fjWHWPQULmooV7lv1uI12RAjhVdGbdwsTGjB2xBAz9N5drwXf_jFEcPXSUkfPK9ApOCsBAqd22MpL2RNNZqB7x897xgpjsWU']
            },
            {
                vendorId: createdVendor._id,
                name: 'Silver Chrome Avant-Garde Jacket',
                description: 'Synthetic Metallic Thread. Protective, lightweight outerwear featuring reflective cinematic fabrics that react purely to neon and flash.',
                price: 3200.00,
                stock: 5,
                category: 'Apparel',
                images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuD66RYf9pDQExof92FqxckcQZGbHQtHUcYYi4SaNhqrlimttuJtUUndxZaeVe2D960jQouVuvTzLJLMxv9n293UQ_PG6adaZBnXVshUxloyEZTn3ZQlqVy84ea_iYRVtzc22NWg2EhLs0fLSy6e0M-beLOlloM74c6uPmzK7Pg2uyZbNQgL2yKD79siJii7BN6UBpB2bQEK_wNe_baGtRX3_O519t_0LbF5YSs4DIHGR_Yry3wqOxQ8qx7p51iQFnQNeAhPNgG2EMM']
            }
        ];

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
