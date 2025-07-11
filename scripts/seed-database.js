const { PrismaClient } = require('../lib/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🧹 Clearing existing data...');
  await prisma.orderStatusHistory.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.designRevision.deleteMany();
  await prisma.designFile.deleteMany();
  await prisma.project.deleteMany();
  await prisma.contactInquiry.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.productMaterial.deleteMany();
  await prisma.productFeature.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.setting.deleteMany();

  // Create admin users
  console.log('👤 Creating admin users...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.adminUser.create({
    data: {
      email: 'admin@burningbushdesign.com',
      username: 'admin',
      password: adminPassword,
      name: 'Admin User',
      role: 'SUPER_ADMIN'
    }
  });

  const staffPassword = await bcrypt.hash('staff123', 10);
  const staffUser = await prisma.adminUser.create({
    data: {
      email: 'staff@burningbush.com',
      username: 'staff',
      password: staffPassword,
      name: 'Staff User',
      role: 'STAFF'
    }
  });

  // Create categories
  console.log('📂 Creating categories...');
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'T-Shirts',
        slug: 't-shirts',
        description: 'Custom designed t-shirts for all occasions',
        icon: '👕',
        sortOrder: 1
      }
    }),
    prisma.category.create({
      data: {
        name: 'Hoodies',
        slug: 'hoodies',
        description: 'Comfortable and stylish custom hoodies',
        icon: '🧥',
        sortOrder: 2
      }
    }),
    prisma.category.create({
      data: {
        name: 'Hats',
        slug: 'hats',
        description: 'Custom embroidered and printed hats',
        icon: '🧢',
        sortOrder: 3
      }
    }),
    prisma.category.create({
      data: {
        name: 'Stickers',
        slug: 'stickers',
        description: 'High-quality vinyl stickers and decals',
        icon: '🏷️',
        sortOrder: 4
      }
    })
  ]);

  // Create products
  console.log('🛍️ Creating products...');
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Classic Cotton T-Shirt',
        slug: 'classic-cotton-tshirt',
        description: 'Premium 100% cotton t-shirt perfect for custom designs',
        price: 25.00,
        originalPrice: 30.00,
        sku: 'TSH-001',
        categoryId: categories[0].id,
        isActive: true,
        isFeatured: true,
        inStock: true,
        stockQuantity: 100,
        minOrderQty: 1,
        createdById: adminUser.id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Premium Hoodie',
        slug: 'premium-hoodie',
        description: 'Warm and comfortable hoodie with custom embroidery',
        price: 45.00,
        originalPrice: 55.00,
        sku: 'HOD-001',
        categoryId: categories[1].id,
        isActive: true,
        isFeatured: true,
        inStock: true,
        stockQuantity: 50,
        minOrderQty: 1,
        createdById: adminUser.id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Embroidered Baseball Cap',
        slug: 'embroidered-baseball-cap',
        description: 'Classic baseball cap with custom embroidery',
        price: 18.00,
        originalPrice: 22.00,
        sku: 'CAP-001',
        categoryId: categories[2].id,
        isActive: true,
        isFeatured: false,
        inStock: true,
        stockQuantity: 75,
        minOrderQty: 1,
        createdById: adminUser.id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Vinyl Sticker Pack',
        slug: 'vinyl-sticker-pack',
        description: 'Set of 10 high-quality vinyl stickers',
        price: 12.00,
        originalPrice: 15.00,
        sku: 'STK-001',
        categoryId: categories[3].id,
        isActive: true,
        isFeatured: false,
        inStock: true,
        stockQuantity: 200,
        minOrderQty: 1,
        createdById: adminUser.id
      }
    })
  ]);

  // Create product images
  console.log('🖼️ Creating product images...');
  await Promise.all([
    prisma.productImage.create({
      data: {
        productId: products[0].id,
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'White cotton t-shirt',
        isPrimary: true,
        sortOrder: 1
      }
    }),
    prisma.productImage.create({
      data: {
        productId: products[0].id,
        url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Black cotton t-shirt',
        isPrimary: false,
        sortOrder: 2
      }
    }),
    prisma.productImage.create({
      data: {
        productId: products[1].id,
        url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Gray premium hoodie',
        isPrimary: true,
        sortOrder: 1
      }
    }),
    prisma.productImage.create({
      data: {
        productId: products[2].id,
        url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Black embroidered baseball cap',
        isPrimary: true,
        sortOrder: 1
      }
    }),
    prisma.productImage.create({
      data: {
        productId: products[3].id,
        url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Vinyl sticker pack',
        isPrimary: true,
        sortOrder: 1
      }
    })
  ]);

  // Create product variants
  console.log('🎨 Creating product variants...');
  await Promise.all([
    // T-shirt sizes
    prisma.productVariant.create({
      data: {
        productId: products[0].id,
        name: 'Small',
        value: 'S',
        type: 'SIZE',
        price: 0,
        isAvailable: true,
        sortOrder: 1
      }
    }),
    prisma.productVariant.create({
      data: {
        productId: products[0].id,
        name: 'Medium',
        value: 'M',
        type: 'SIZE',
        price: 0,
        isAvailable: true,
        sortOrder: 2
      }
    }),
    prisma.productVariant.create({
      data: {
        productId: products[0].id,
        name: 'Large',
        value: 'L',
        type: 'SIZE',
        price: 0,
        isAvailable: true,
        sortOrder: 3
      }
    }),
    prisma.productVariant.create({
      data: {
        productId: products[0].id,
        name: 'White',
        value: '#FFFFFF',
        type: 'COLOR',
        price: 0,
        isAvailable: true,
        sortOrder: 1
      }
    }),
    prisma.productVariant.create({
      data: {
        productId: products[0].id,
        name: 'Black',
        value: '#000000',
        type: 'COLOR',
        price: 0,
        isAvailable: true,
        sortOrder: 2
      }
    }),
    // Hoodie sizes
    prisma.productVariant.create({
      data: {
        productId: products[1].id,
        name: 'Medium',
        value: 'M',
        type: 'SIZE',
        price: 0,
        isAvailable: true,
        sortOrder: 1
      }
    }),
    prisma.productVariant.create({
      data: {
        productId: products[1].id,
        name: 'Large',
        value: 'L',
        type: 'SIZE',
        price: 0,
        isAvailable: true,
        sortOrder: 2
      }
    }),
    prisma.productVariant.create({
      data: {
        productId: products[1].id,
        name: 'Gray',
        value: '#808080',
        type: 'COLOR',
        price: 0,
        isAvailable: true,
        sortOrder: 1
      }
    })
  ]);

  // Create product features
  console.log('✨ Creating product features...');
  await Promise.all([
    prisma.productFeature.create({
      data: {
        productId: products[0].id,
        feature: '100% Premium Cotton'
      }
    }),
    prisma.productFeature.create({
      data: {
        productId: products[0].id,
        feature: 'Pre-shrunk fabric'
      }
    }),
    prisma.productFeature.create({
      data: {
        productId: products[0].id,
        feature: 'Machine washable'
      }
    }),
    prisma.productFeature.create({
      data: {
        productId: products[1].id,
        feature: 'Fleece-lined interior'
      }
    }),
    prisma.productFeature.create({
      data: {
        productId: products[1].id,
        feature: 'Kangaroo pocket'
      }
    }),
    prisma.productFeature.create({
      data: {
        productId: products[1].id,
        feature: 'Adjustable drawstring'
      }
    })
  ]);

  // Create product materials
  console.log('🧵 Creating product materials...');
  await Promise.all([
    prisma.productMaterial.create({
      data: {
        productId: products[0].id,
        material: '100% Cotton'
      }
    }),
    prisma.productMaterial.create({
      data: {
        productId: products[1].id,
        material: 'Cotton/Polyester Blend'
      }
    }),
    prisma.productMaterial.create({
      data: {
        productId: products[2].id,
        material: 'Polyester'
      }
    }),
    prisma.productMaterial.create({
      data: {
        productId: products[3].id,
        material: 'Vinyl'
      }
    })
  ]);

  // Create customers
  console.log('👥 Creating customers...');
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1-555-0123',
        company: 'Tech Startup Inc.',
        address: {
          street: '123 Main St',
          city: 'Austin',
          state: 'TX',
          zipCode: '78701',
          country: 'USA'
        },
        notes: 'Prefers rush orders',
        isActive: true
      }
    }),
    prisma.customer.create({
      data: {
        email: 'jane.smith@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+1-555-0456',
        company: 'Design Studio',
        address: {
          street: '456 Oak Ave',
          city: 'Portland',
          state: 'OR',
          zipCode: '97201',
          country: 'USA'
        },
        notes: 'Bulk order customer',
        isActive: true
      }
    }),
    prisma.customer.create({
      data: {
        email: 'mike.wilson@example.com',
        firstName: 'Mike',
        lastName: 'Wilson',
        phone: '+1-555-0789',
        company: 'Local Restaurant',
        address: {
          street: '789 Pine St',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          country: 'USA'
        },
        notes: 'Regular customer',
        isActive: true
      }
    })
  ]);

  // Create orders
  console.log('📦 Creating orders...');
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-001',
        customerId: customers[0].id,
        status: 'CONFIRMED',
        subtotal: 75.00,
        tax: 6.00,
        shipping: 8.00,
        total: 89.00,
        paymentStatus: 'PAID',
        shippingAddress: {
          street: '123 Main St',
          city: 'Austin',
          state: 'TX',
          zipCode: '78701',
          country: 'USA'
        },
        billingAddress: {
          street: '123 Main St',
          city: 'Austin',
          state: 'TX',
          zipCode: '78701',
          country: 'USA'
        },
        notes: 'Rush order for event',
        internalNotes: 'Customer requested expedited shipping',
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        updatedById: adminUser.id
      }
    }),
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-002',
        customerId: customers[1].id,
        status: 'IN_DESIGN',
        subtotal: 120.00,
        tax: 9.60,
        shipping: 0.00,
        total: 129.60,
        paymentStatus: 'PARTIALLY_PAID',
        shippingAddress: {
          street: '456 Oak Ave',
          city: 'Portland',
          state: 'OR',
          zipCode: '97201',
          country: 'USA'
        },
        billingAddress: {
          street: '456 Oak Ave',
          city: 'Portland',
          state: 'OR',
          zipCode: '97201',
          country: 'USA'
        },
        notes: 'Custom design required',
        internalNotes: 'Design in progress, customer approved concept',
        estimatedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        updatedById: staffUser.id
      }
    }),
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-003',
        customerId: customers[2].id,
        status: 'PENDING',
        subtotal: 45.00,
        tax: 3.60,
        shipping: 5.00,
        total: 53.60,
        paymentStatus: 'PENDING',
        shippingAddress: {
          street: '789 Pine St',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          country: 'USA'
        },
        billingAddress: {
          street: '789 Pine St',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          country: 'USA'
        },
        notes: 'Standard order',
        internalNotes: 'Awaiting payment confirmation',
        estimatedDelivery: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        updatedById: adminUser.id
      }
    })
  ]);

  // Create order items
  console.log('📋 Creating order items...');
  await Promise.all([
    prisma.orderItem.create({
      data: {
        orderId: orders[0].id,
        productId: products[0].id,
        quantity: 2,
        unitPrice: 25.00,
        totalPrice: 50.00,
        customizations: {
          size: 'L',
          color: 'Black',
          design: 'Custom logo'
        },
        notes: 'Rush order'
      }
    }),
    prisma.orderItem.create({
      data: {
        orderId: orders[0].id,
        productId: products[2].id,
        quantity: 1,
        unitPrice: 18.00,
        totalPrice: 18.00,
        customizations: {
          embroidery: 'Company name'
        },
        notes: 'Matching cap'
      }
    }),
    prisma.orderItem.create({
      data: {
        orderId: orders[0].id,
        productId: products[3].id,
        quantity: 1,
        unitPrice: 12.00,
        totalPrice: 12.00,
        customizations: {
          design: 'Event stickers'
        },
        notes: 'Promotional materials'
      }
    }),
    prisma.orderItem.create({
      data: {
        orderId: orders[1].id,
        productId: products[1].id,
        quantity: 2,
        unitPrice: 45.00,
        totalPrice: 90.00,
        customizations: {
          size: 'L',
          color: 'Gray',
          design: 'Custom artwork'
        },
        notes: 'Design in progress'
      }
    }),
    prisma.orderItem.create({
      data: {
        orderId: orders[1].id,
        productId: products[0].id,
        quantity: 1,
        unitPrice: 25.00,
        totalPrice: 25.00,
        customizations: {
          size: 'M',
          color: 'White',
          design: 'Matching design'
        },
        notes: 'Part of set'
      }
    }),
    prisma.orderItem.create({
      data: {
        orderId: orders[2].id,
        productId: products[1].id,
        quantity: 1,
        unitPrice: 45.00,
        totalPrice: 45.00,
        customizations: {
          size: 'M',
          color: 'Gray',
          design: 'Simple logo'
        },
        notes: 'Standard order'
      }
    })
  ]);

  // Create order status history
  console.log('📊 Creating order status history...');
  await Promise.all([
    prisma.orderStatusHistory.create({
      data: {
        orderId: orders[0].id,
        status: 'PENDING',
        notes: 'Order placed'
      }
    }),
    prisma.orderStatusHistory.create({
      data: {
        orderId: orders[0].id,
        status: 'CONFIRMED',
        notes: 'Payment received, order confirmed'
      }
    }),
    prisma.orderStatusHistory.create({
      data: {
        orderId: orders[1].id,
        status: 'PENDING',
        notes: 'Order placed'
      }
    }),
    prisma.orderStatusHistory.create({
      data: {
        orderId: orders[1].id,
        status: 'CONFIRMED',
        notes: 'Payment received'
      }
    }),
    prisma.orderStatusHistory.create({
      data: {
        orderId: orders[1].id,
        status: 'IN_DESIGN',
        notes: 'Custom design started'
      }
    }),
    prisma.orderStatusHistory.create({
      data: {
        orderId: orders[2].id,
        status: 'PENDING',
        notes: 'Order placed, awaiting payment'
      }
    })
  ]);

  // Create projects
  console.log('🎨 Creating projects...');
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        customerId: customers[0].id,
        orderId: orders[0].id,
        productId: products[0].id,
        title: 'Tech Startup Logo T-Shirt',
        description: 'Custom t-shirt design featuring company logo and tagline',
        projectType: 'Corporate Branding',
        timeline: '1 week',
        budget: '$500-1000',
        status: 'COMPLETED',
        priority: 'HIGH',
        requirements: {
          colors: ['Black', 'White'],
          style: 'Modern and professional',
          elements: ['Company logo', 'Tagline', 'Clean typography']
        },
        notes: 'Rush order for company event',
        internalNotes: 'Design approved, production completed',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        completedAt: new Date(),
        createdById: adminUser.id
      }
    }),
    prisma.project.create({
      data: {
        customerId: customers[1].id,
        orderId: orders[1].id,
        productId: products[1].id,
        title: 'Artistic Hoodie Collection',
        description: 'Custom hoodie design with artistic elements',
        projectType: 'Fashion Design',
        timeline: '2 weeks',
        budget: '$800-1200',
        status: 'IN_PROGRESS',
        priority: 'NORMAL',
        requirements: {
          colors: ['Gray', 'Black'],
          style: 'Artistic and creative',
          elements: ['Abstract patterns', 'Typography', 'Mixed media']
        },
        notes: 'Design for fashion line',
        internalNotes: 'Initial concept approved, working on final design',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        createdById: staffUser.id
      }
    })
  ]);

  // Create design files
  console.log('📁 Creating design files...');
  await Promise.all([
    prisma.designFile.create({
      data: {
        projectId: projects[0].id,
        fileName: 'logo-design-final.ai',
        originalName: 'logo-design-final.ai',
        fileSize: 2048576,
        mimeType: 'application/postscript',
        url: '/uploads/designs/logo-design-final.ai',
        fileType: 'FINAL',
        isActive: true
      }
    }),
    prisma.designFile.create({
      data: {
        projectId: projects[0].id,
        fileName: 'tshirt-mockup.jpg',
        originalName: 'tshirt-mockup.jpg',
        fileSize: 512000,
        mimeType: 'image/jpeg',
        url: '/uploads/designs/tshirt-mockup.jpg',
        fileType: 'PROOF',
        isActive: true
      }
    }),
    prisma.designFile.create({
      data: {
        projectId: projects[1].id,
        fileName: 'hoodie-concept.jpg',
        originalName: 'hoodie-concept.jpg',
        fileSize: 768000,
        mimeType: 'image/jpeg',
        url: '/uploads/designs/hoodie-concept.jpg',
        fileType: 'REFERENCE',
        isActive: true
      }
    })
  ]);

  // Create design revisions
  console.log('📝 Creating design revisions...');
  await Promise.all([
    prisma.designRevision.create({
      data: {
        projectId: projects[0].id,
        revisionNumber: 1,
        description: 'Initial logo design',
        changes: 'Created basic logo concept with company colors'
      }
    }),
    prisma.designRevision.create({
      data: {
        projectId: projects[0].id,
        revisionNumber: 2,
        description: 'Final logo design',
        changes: 'Refined typography and spacing, added tagline'
      }
    }),
    prisma.designRevision.create({
      data: {
        projectId: projects[1].id,
        revisionNumber: 1,
        description: 'Initial concept',
        changes: 'Created artistic concept with abstract patterns'
      }
    })
  ]);

  // Create contact inquiries
  console.log('📞 Creating contact inquiries...');
  await Promise.all([
    prisma.contactInquiry.create({
      data: {
        customerId: customers[0].id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1-555-0123',
        projectType: 'Corporate Branding',
        message: 'Interested in custom t-shirts for our company event. Need 50 pieces with our logo.',
        timeline: '2 weeks',
        budget: '$1000-1500',
        status: 'CONVERTED',
        priority: 'HIGH',
        assignedTo: adminUser.id,
        notes: 'Converted to order ORD-2024-001',
        followUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      }
    }),
    prisma.contactInquiry.create({
      data: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+1-555-0321',
        projectType: 'Event Merchandise',
        message: 'Looking for custom hoodies for a music festival. Need 200 pieces with custom artwork.',
        timeline: '1 month',
        budget: '$3000-5000',
        status: 'QUOTED',
        priority: 'NORMAL',
        assignedTo: staffUser.id,
        notes: 'Quote sent, awaiting response',
        followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    }),
    prisma.contactInquiry.create({
      data: {
        name: 'David Brown',
        email: 'david.brown@example.com',
        phone: '+1-555-0654',
        projectType: 'Personal Design',
        message: 'Want to create a custom t-shirt design for my band. Looking for something unique and edgy.',
        timeline: '3 weeks',
        budget: '$200-400',
        status: 'NEW',
        priority: 'LOW',
        notes: 'New inquiry, needs follow-up',
        followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      }
    })
  ]);

  // Create settings
  console.log('⚙️ Creating settings...');
  await Promise.all([
    prisma.setting.create({
      data: {
        key: 'company_name',
        value: 'Burning Bush Design',
        type: 'STRING',
        group: 'general',
        isPublic: true
      }
    }),
    prisma.setting.create({
      data: {
        key: 'company_email',
        value: 'info@burningbush.com',
        type: 'STRING',
        group: 'contact',
        isPublic: true
      }
    }),
    prisma.setting.create({
      data: {
        key: 'company_phone',
        value: '+1-555-0123',
        type: 'STRING',
        group: 'contact',
        isPublic: true
      }
    }),
    prisma.setting.create({
      data: {
        key: 'shipping_cost',
        value: '8.00',
        type: 'NUMBER',
        group: 'pricing',
        isPublic: true
      }
    }),
    prisma.setting.create({
      data: {
        key: 'tax_rate',
        value: '0.08',
        type: 'NUMBER',
        group: 'pricing',
        isPublic: false
      }
    }),
    prisma.setting.create({
      data: {
        key: 'min_order_amount',
        value: '25.00',
        type: 'NUMBER',
        group: 'pricing',
        isPublic: true
      }
    })
  ]);

  // Create team stores
  console.log('🏪 Creating team stores...');
  const teamStores = await Promise.all([
    prisma.teamStore.create({
      data: {
        name: 'Local Soccer Club',
        slug: 'local-soccer-club',
        description: 'Official merchandise for the Local Soccer Club. Support your team with custom jerseys, hats, and more!',
        logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center',
        banner: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop&crop=center',
        website: 'https://localsoccerclub.com',
        email: 'info@localsoccerclub.com',
        phone: '(555) 123-4567',
        address: '123 Soccer Field Dr, Sports City, SC 12345',
        status: 'ACTIVE',
        isActive: true,
        launchedAt: new Date(),
        createdById: adminUser.id
      }
    }),
    prisma.teamStore.create({
      data: {
        name: 'Tech Startup Inc',
        slug: 'tech-startup-inc',
        description: 'Custom merchandise for our innovative tech team. Quality gear for quality people!',
        logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center',
        banner: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=400&fit=crop&crop=center',
        website: 'https://techstartup.com',
        email: 'merch@techstartup.com',
        phone: '(555) 987-6543',
        address: '456 Innovation Ave, Tech City, TC 54321',
        status: 'APPROVED',
        isActive: true,
        launchedAt: new Date(),
        createdById: adminUser.id
      }
    })
  ]);

  // Create team store inquiries
  console.log('📞 Creating team store inquiries...');
  await Promise.all([
    prisma.teamStoreInquiry.create({
      data: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '(555) 987-6543',
        organization: 'Tech Startup Inc',
        website: 'https://techstartup.com',
        description: 'We\'re looking to create custom merchandise for our team of 50 employees. We need branded t-shirts, hoodies, and water bottles. Our company colors are blue and white.',
        logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center',
        design: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center',
        status: 'NEW',
        priority: 'NORMAL'
      }
    }),
    prisma.teamStoreInquiry.create({
      data: {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        phone: '(555) 456-7890',
        organization: 'Fitness Club Plus',
        website: 'https://fitnessclubplus.com',
        description: 'Need custom workout gear for our gym members. Looking for moisture-wicking shirts and comfortable shorts with our logo.',
        logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center',
        design: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
        status: 'CONTACTED',
        priority: 'HIGH'
      }
    })
  ]);

  // Add products to team stores
  console.log('🛍️ Adding products to team stores...');
  for (const teamStore of teamStores) {
    for (const product of products.slice(0, 2)) {
      await prisma.teamStoreProduct.create({
        data: {
          teamStoreId: teamStore.id,
          productId: product.id,
          isActive: true
        }
      });
    }
  }

  console.log('✅ Database seeding completed successfully!');
  console.log(`📊 Created:`);
  console.log(`   - ${categories.length} categories`);
  console.log(`   - ${products.length} products`);
  console.log(`   - ${customers.length} customers`);
  console.log(`   - ${orders.length} orders`);
  console.log(`   - ${projects.length} projects`);
  console.log(`   - ${await prisma.contactInquiry.count()} contact inquiries`);
  console.log(`   - ${teamStores.length} team stores`);
  console.log(`   - ${await prisma.teamStoreInquiry.count()} team store inquiries`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 