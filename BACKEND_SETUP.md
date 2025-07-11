# Burning Bush Design - Backend Setup Guide

## Overview
This guide will help you set up the complete backend system for Burning Bush Design, including database, authentication, and admin dashboard.

## Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Git

## Environment Setup

### 1. Create Environment File
Create a `.env` file in the project root with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/burning_bush_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"

# JWT
JWT_SECRET="your-jwt-secret-here-change-this-in-production"

# File Upload
UPLOAD_PATH="./uploads"
MAX_FILE_SIZE=10485760  # 10MB in bytes
```

### 2. Database Setup

#### Option A: Local PostgreSQL
1. Install PostgreSQL on your system
2. Create a database named `burning_bush_db`
3. Update the `DATABASE_URL` in your `.env` file with your credentials

#### Option B: Cloud Database (Recommended)
1. Sign up for a free PostgreSQL database at:
   - [Supabase](https://supabase.com)
   - [Railway](https://railway.app)
   - [Neon](https://neon.tech)
2. Get your connection string and add it to `DATABASE_URL`

### 3. Install Dependencies
```bash
npm install
```

### 4. Generate Prisma Client
```bash
npx prisma generate
```

### 5. Run Database Migrations
```bash
npx prisma migrate deploy
```

### 6. Seed Database
```bash
node scripts/seed-database.js
```

This will create:
- Admin user account
- Product categories
- Sample products
- System settings

## Admin Access
After seeding, you can log in to the admin dashboard:
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@burningbushdesign.com`
- **Password**: `admin123`

⚠️ **Important**: Change the admin password after first login!

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/admin/products` - List products
- `POST /api/admin/products` - Create product
- `GET /api/admin/products/[id]` - Get product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

### Categories
- `GET /api/admin/categories` - List categories
- `POST /api/admin/categories` - Create category

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - List inquiries (admin only)

## Admin Dashboard Features

### 🏠 Dashboard
- Overview metrics
- Recent orders
- Quick actions

### 📦 Products
- Product catalog management
- Image upload
- Variants (sizes, colors)
- Inventory tracking

### 🛒 Orders
- Order management
- Status tracking
- Customer details

### 👥 Customers
- Customer database
- Order history
- Communication log

### 🎨 Designs
- Custom design requests
- File management
- Approval workflow

### 💬 Inquiries
- Contact form submissions
- Status tracking
- Follow-up management

### 📊 Analytics
- Sales reports
- Popular products
- Customer insights

### ⚙️ Settings
- Site configuration
- Business settings
- User management

## Database Schema

The system includes comprehensive tables for:
- **Admin Users**: Role-based access control
- **Categories**: Product categorization
- **Products**: Full product catalog with variants
- **Orders**: Complete order management
- **Customers**: Customer database
- **Custom Designs**: Design request workflow
- **Contact Inquiries**: Lead management
- **Settings**: System configuration

## Security Features

- JWT-based authentication
- HTTP-only cookies
- Password hashing with bcrypt
- Role-based access control
- Input validation
- SQL injection protection

## File Upload Support

The system supports file uploads for:
- Product images
- Design files
- Customer reference materials

## Next Steps

1. **Set up email notifications** for contact form submissions
2. **Configure payment processing** (Stripe/PayPal)
3. **Add inventory management** alerts
4. **Implement order fulfillment** workflow
5. **Set up automated backups**

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your `DATABASE_URL` format
   - Ensure database server is running
   - Verify credentials

2. **Prisma Generate Error**
   - Run `npx prisma generate` after schema changes
   - Check for syntax errors in schema.prisma

3. **Authentication Not Working**
   - Verify JWT_SECRET is set
   - Check cookie settings
   - Ensure NEXTAUTH_URL matches your domain

4. **Migration Errors**
   - Reset database: `npx prisma migrate reset`
   - Re-run migrations: `npx prisma migrate deploy`

### Need Help?

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure database is accessible
4. Try resetting and re-seeding the database

## Production Deployment

For production deployment:
1. Use secure, random values for secrets
2. Set up SSL/TLS certificates
3. Configure proper CORS settings
4. Set up database backups
5. Monitor application logs
6. Use environment-specific configurations

## Contributing

When making changes:
1. Update database schema in `prisma/schema.prisma`
2. Run `npx prisma migrate dev` to create migrations
3. Update API endpoints as needed
4. Test all functionality before deployment

---

🔥 **Burning Bush Design Backend** - Custom design business management system built with Next.js, Prisma, and PostgreSQL. 