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
  readonly id: number
  title: string
  price: number
  description: string
  images: string[] | string
  readonly creationAt: string
  readonly updatedAt: string
  categoryId: number
  category: Category
}

export interface Products {
  [index: number]: Product
}

export interface ProductInForm {
  title: string
  price: number
  description: string
  images: string
  categoryId: number
}

export interface ConfirmOptions {
  color: string
  width: number
  zIndex: number
}
