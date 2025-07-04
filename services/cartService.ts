const API_URL = "/api/cart"

export interface CartResponse {
    success: boolean
    data?: {
        customerId: string
        items: Array<{
            bookId: string
            title: string
            quantity: number
            unitPrice: number
            coverImage?: string
        }>
        total: number
    }
    message?: string
}

export interface AddItemRequest {
    bookId: string
    quantity: number
}

export async function getCart(customerId: string): Promise<CartResponse> {
    console.log("url:", `${API_URL}/get-cart/${customerId}`)
    const res = await fetch(`${API_URL}/get-cart/${customerId}`, {
        headers: {
            "X-Api-Version": "1",
            Accept: "application/json",
        },
    })

    if (!res.ok) {
        throw new Error(`Error fetching cart: ${res.status} ${res.statusText}`)
    }

    return res.json()
}

export async function addItemToCart(customerId: string, item: AddItemRequest): Promise<CartResponse> {
    console.log("url:", `${API_URL}/add-item/${customerId}/items`)
    const res = await fetch(`${API_URL}/add-item/${customerId}/items`, {
        method: "POST",
        headers: {
            "X-Api-Version": "1",
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(item),
    })

    if (!res.ok) {
        throw new Error(`Error adding item to cart: ${res.status} ${res.statusText}`)
    }

    return res.json()
}

export async function removeItemFromCart(customerId: string, bookId: string): Promise<CartResponse> {
    console.log("url:", `${API_URL}/remove-item/${customerId}/items/${bookId}`)
    const res = await fetch(`${API_URL}/remove-item/${customerId}/items/${bookId}`, {
        method: "DELETE",
        headers: {
            "X-Api-Version": "1",
            Accept: "application/json",
        },
    })

    if (!res.ok) {
        throw new Error(`Error removing item from cart: ${res.status} ${res.statusText}`)
    }

    return res.json()
}

export async function decrementItemInCart(customerId: string, bookId: string): Promise<CartResponse> {
    console.log("url:", `${API_URL}/decrement-item/${customerId}/items/${bookId}`)
    const res = await fetch(`${API_URL}/decrement-item/${customerId}/items/${bookId}`, {
        method: "PATCH",
        headers: {
            "X-Api-Version": "1",
            Accept: "application/json",
        },
    })

    if (!res.ok) {
        throw new Error(`Error decrementing item in cart: ${res.status} ${res.statusText}`)
    }

    return res.json()
}

export async function clearCart(customerId: string): Promise<CartResponse> {
    console.log("url:", `${API_URL}/clear-cart/${customerId}`)
    const res = await fetch(`${API_URL}/clear-cart/${customerId}`, {
        method: "DELETE",
        headers: {
            "X-Api-Version": "1",
            Accept: "application/json",
        },
    })

    if (!res.ok) {
        throw new Error(`Error clearing cart: ${res.status} ${res.statusText}`)
    }

    return res.json()
}
