import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding team stores...')

  // Get the first admin user
  const adminUser = await prisma.adminUser.findFirst({
    where: { role: { in: ['SUPER_ADMIN', 'ADMIN'] } }
  })
  if (!adminUser) {
    throw new Error('No admin user found. Please seed admin users first.')
  }

  // Create a sample team store
  const teamStore = await prisma.teamStore.create({
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
      createdById: adminUser.id // Use actual admin user ID
    }
  })

  console.log('✅ Created team store:', teamStore.name)

  // Create a team store inquiry
  const inquiry = await prisma.teamStoreInquiry.create({
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
  })

  console.log('✅ Created team store inquiry:', inquiry.organization)

  // Get some existing products to add to the team store
  const products = await prisma.product.findMany({
    take: 3
  })

  if (products.length > 0) {
    // Add products to the team store
    for (const product of products) {
      await prisma.teamStoreProduct.create({
        data: {
          teamStoreId: teamStore.id,
          productId: product.id,
          isActive: true
        }
      })
    }
    console.log(`✅ Added ${products.length} products to team store`)
  }

  console.log('🎉 Team store seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding team stores:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 