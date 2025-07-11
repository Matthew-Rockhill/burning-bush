const { PrismaClient } = require('../lib/generated/prisma')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createInitialAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.adminUser.findFirst({
      where: { role: 'SUPER_ADMIN' }
    })

    if (existingAdmin) {
      console.log('Super admin already exists!')
      return
    }

    // Create initial admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = await prisma.adminUser.create({
      data: {
        email: 'admin@burningbushdesign.com',
        username: 'admin',
        password: hashedPassword,
        name: 'Admin User',
        role: 'SUPER_ADMIN',
      }
    })

    console.log('Initial admin user created successfully!')
    console.log('Email: admin@buringbushdesign.com')
    console.log('Password: admin123')
    console.log('Please change the password after first login.')
    
  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createInitialAdmin() 