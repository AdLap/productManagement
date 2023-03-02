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

export interface ProductAdd {
  title: string
  price: number | null
  description: string
  images: string[] | string
  categoryId: number | null
}

export interface Product extends ProductAdd {
  readonly id: number
  readonly creationAt: string
  readonly updatedAt: string
}

export interface Products {
  [index: number]: Product
}

export interface ConfirmOptions {
  color: string
  width: number
  zIndex: number
}
