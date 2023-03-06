import { useAuthStore } from '@/stores/auth.store'
import type { Product } from '@/type/types'

const baseUrl = `${import.meta.env.VITE_API_URL}`

export const fetching = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
}

function request(method: string) {
  return async (url: string, body?: {}) => {
    const requestOptions: any = {
      method,
      headers: authHeader(url)
    }
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json'
      requestOptions.body = JSON.stringify(body)
    }
    const response = await fetch(url, requestOptions)
    return handleResponse(response)
  }
}

function authHeader(url: string): string | {} {
  const { user } = useAuthStore()
  const isLoggedIn = !!user?.access_token
  const isApiUrl = url.startsWith(baseUrl)
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.access_token}` }
  } else {
    return {}
  }
}

function handleResponse(
  response: Response
): Product[] | Product | Promise<Error> {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)

    if (!response.ok) {
      const { user, logout } = useAuthStore()
      if ([401, 403].includes(response.status) && user) {
        logout()
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
