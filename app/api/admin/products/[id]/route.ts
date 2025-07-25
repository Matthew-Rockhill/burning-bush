import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  // Manual auth check
  const token = request.cookies.get('auth-token')?.value
  if (!token) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const user = await verifyToken(token);
  if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  if (!['ADMIN', 'SUPER_ADMIN'].includes(user.role)) return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });

  try {
    const productId = request.nextUrl.pathname.split('/').pop()

    const product = await db.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' }
        },
        variants: {
          orderBy: { sortOrder: 'asc' }
        },
        features: true,
        materials: true
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)

  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  // Manual auth check
  const token = request.cookies.get('auth-token')?.value
  if (!token) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const user = await verifyToken(token);
  if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  if (!['ADMIN', 'SUPER_ADMIN'].includes(user.role)) return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });

  try {
    const productId = request.nextUrl.pathname.split('/').pop()
    const body = await request.json()

    const {
      name,
      description,
      price,
      originalPrice,
      sku,
      categoryId,
      isActive,
      isFeatured,
      inStock,
      stockQuantity,
      minOrderQty
    } = body

    // Validate required fields
    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Name, price, and category are required' },
        { status: 400 }
      )
    }

    const updatedProduct = await db.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price,
        originalPrice,
        sku,
        categoryId,
        isActive,
        isFeatured,
        inStock,
        stockQuantity,
        minOrderQty
      },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' }
        },
        variants: {
          orderBy: { sortOrder: 'asc' }
        },
        features: true,
        materials: true
      }
    })

    return NextResponse.json(updatedProduct)

  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  // Manual auth check
  const token = request.cookies.get('auth-token')?.value
  if (!token) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const user = await verifyToken(token);
  if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  if (!['ADMIN', 'SUPER_ADMIN'].includes(user.role)) return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });

  try {
    const productId = request.nextUrl.pathname.split('/').pop()

    // Check if product exists
    const product = await db.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Delete related data first
    await db.productImage.deleteMany({
      where: { productId }
    })

    await db.productVariant.deleteMany({
      where: { productId }
    })

    await db.productFeature.deleteMany({
      where: { productId }
    })

    await db.productMaterial.deleteMany({
      where: { productId }
    })

    // Delete the product
    await db.product.delete({
      where: { id: productId }
    })

    return NextResponse.json({ message: 'Product deleted successfully' })

  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
} 