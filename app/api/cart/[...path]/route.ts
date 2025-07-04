import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8762"
const BACKEND_URL_CART = `${BACKEND_URL}/ms-books-orders/v1/api/carts`

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const resolvedParams = await params
    return proxy(req, resolvedParams.path)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const resolvedParams = await params
    return proxy(req, resolvedParams.path)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const resolvedParams = await params
    return proxy(req, resolvedParams.path)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const resolvedParams = await params
    return proxy(req, resolvedParams.path)
}

/**
 * Reenvía la petición del Frontend al servicio externo del carrito
 */
async function proxy(req: NextRequest, path: string[]) {
    const url = `${BACKEND_URL_CART}/${path.join("/")}${req.nextUrl.search}`

    console.log("=== PROXY CART REQUEST ===")
    console.log("Method:", req.method)
    console.log("Original path:", path)
    console.log("Final URL:", url)
    console.log("Headers:", Object.fromEntries(req.headers.entries()))

    try {
        let body: string | undefined = undefined
        if (req.method !== "GET" && req.method !== "HEAD") {
            try {
                body = await req.text()
                console.log("Request body:", body)
            } catch (error) {
                console.log("No body or error reading body:", error)
            }
        }

        const headers: Record<string, string> = {}
        req.headers.forEach((value, key) => {
            if (!["host", "connection", "content-length"].includes(key.toLowerCase())) {
                headers[key] = value
            }
        })

        const init: RequestInit = {
            method: req.method,
            headers: headers,
            body: body,
            redirect: "follow",
        }

        console.log("Sending request to backend...")
        const backendRes = await fetch(url, init)

        console.log("=== PROXY CART RESPONSE ===")
        console.log("Status:", backendRes.status)
        console.log("Status Text:", backendRes.statusText)
        console.log("Response Headers:", Object.fromEntries(backendRes.headers.entries()))

        const responseText = await backendRes.text()
        console.log("Response body:", responseText)

        const responseHeaders = new Headers()
        backendRes.headers.forEach((value, key) => {
            if (!["transfer-encoding", "connection"].includes(key.toLowerCase())) {
                responseHeaders.set(key, value)
            }
        })

        return new NextResponse(responseText, {
            status: backendRes.status,
            statusText: backendRes.statusText,
            headers: responseHeaders,
        })
    } catch (error) {
        console.error("=== PROXY CART ERROR ===")
        console.error("Error details:", error)
        console.error("Error message:", (error as Error).message)
        console.error("Error stack:", (error as Error).stack)

        return NextResponse.json(
            {
                success: false,
                message: "Proxy error",
                error: (error as Error).message,
                details: "Check server logs for more information",
            },
            { status: 502 },
        )
    }
}
