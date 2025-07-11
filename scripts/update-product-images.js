const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function updateProductImages() {
  console.log('🖼️ Updating product images to use placeholder URLs...');

  try {
    // Update each product image with appropriate Unsplash URLs
    const imageUpdates = [
      // T-shirt images
      {
        where: { url: '/images/products/tshirt-white.jpg' },
        data: { 
          url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt: 'White cotton t-shirt'
        }
      },
      {
        where: { url: '/images/products/tshirt-black.jpg' },
        data: { 
          url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt: 'Black cotton t-shirt'
        }
      },
      // Hoodie image
      {
        where: { url: '/images/products/hoodie-gray.jpg' },
        data: { 
          url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt: 'Gray premium hoodie'
        }
      },
      // Cap image
      {
        where: { url: '/images/products/cap-black.jpg' },
        data: { 
          url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt: 'Black embroidered baseball cap'
        }
      },
      // Stickers image
      {
        where: { url: '/images/products/stickers-pack.jpg' },
        data: { 
          url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt: 'Vinyl sticker pack'
        }
      }
    ];

    // Update each image
    for (const update of imageUpdates) {
      const result = await prisma.productImage.updateMany(update);
      console.log(`✅ Updated ${result.count} image(s) for ${update.where.url}`);
    }

    console.log('🎉 Product images updated successfully!');
    
    // Show current images
    const images = await prisma.productImage.findMany({
      include: {
        product: {
          select: { name: true }
        }
      }
    });

    console.log('\n📸 Current product images:');
    images.forEach(image => {
      console.log(`  - ${image.product.name}: ${image.url}`);
    });

  } catch (error) {
    console.error('❌ Error updating product images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateProductImages(); 