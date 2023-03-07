export interface LoginData {
  email: string
  password: string
}

export interface RegisterData extends LoginData {
  name: string
  role: string
  avatar: string
}

export interface Category {
  readonly id: number
  name: string
  image: string
  readonly creation: string
  updatedAt: string
}

export interface Product {
  title: string
  price: number | null
  description: string
  images: string[] | string
  categoryId: number | null
}

export interface ProductFull extends Product {
  readonly id: number
  readonly creationAt: string
  readonly updatedAt: string
  category: Category
}

export interface CurrentProduct {
  [key: number]: ProductFull
}

export interface ConfirmOptions {
  color: string
  width: number
  zIndex: number
}
