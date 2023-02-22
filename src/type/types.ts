export interface LoginData {
  email: string
  password: string
}

export interface Category {
  id: number
  name: string
  image: string
  creation: string
  updatedAt: string
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  creationAt: string
  updatedAt: string
  category: Category
}

export interface Products {
  [index: number]: Product
}

export interface CardActions {
  name: string
  icon: string
  action: () => void
}
