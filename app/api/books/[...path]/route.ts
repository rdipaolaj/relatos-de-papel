import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8762"

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
 * Reenvía la petición del Frontend al servicio de libros
 */
async function proxy(req: NextRequest, path: string[]) {
    // Construir la URL correcta basada en el path
    let url: string

    // Determinar qué servicio usar basado en la ruta
    if (path[0] === "catalogue" || path.includes("find-by-id") || path.includes("search")) {
        // Para rutas del catálogo y búsquedas: usar ms-books-catalogue
        let cataloguePath: string[]

        if (path[0] === "catalogue") {
            // /api/books/catalogue/find-by-id/... -> /ms-books-catalogue/v1/api/books/find-by-id/...
            cataloguePath = path.slice(1) // Remover 'catalogue'
        } else {
            // /api/books/find-by-id/... -> /ms-books-catalogue/v1/api/books/find-by-id/...
            cataloguePath = path
        }

        url = `${BACKEND_URL}/ms-books-catalogue/v1/api/books/${cataloguePath.join("/")}${req.nextUrl.search}`
    } else {
        // Para otras rutas generales: usar el servicio general
        url = `${BACKEND_URL}/v1/api/books/${path.join("/")}${req.nextUrl.search}`
    }

    console.log("=== PROXY BOOKS REQUEST ===")
    console.log("Method:", req.method)
    console.log("Original path:", path)
    console.log("Final URL:", url)
    console.log("Headers:", Object.fromEntries(req.headers.entries()))

    try {
        // Preparar el body correctamente
        let body: string | undefined = undefined
        if (req.method !== "GET" && req.method !== "HEAD") {
            try {
                body = await req.text()
                console.log("Request body:", body)
            } catch (error) {
                console.log("No body or error reading body:", error)
            }
        }

        // Preparar headers, excluyendo algunos que pueden causar problemas
        const headers: Record<string, string> = {}
        req.headers.forEach((value, key) => {
            // Excluir headers que pueden causar problemas en el proxy
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

        console.log("=== PROXY BOOKS RESPONSE ===")
        console.log("Status:", backendRes.status)
        console.log("Status Text:", backendRes.statusText)
        console.log("Response Headers:", Object.fromEntries(backendRes.headers.entries()))

        // Leer la respuesta como texto para poder logearla
        const responseText = await backendRes.text()
        console.log("Response body:", responseText)

        // Preparar headers de respuesta
        const responseHeaders = new Headers()
        backendRes.headers.forEach((value, key) => {
            // Excluir headers que pueden causar problemas
            if (!["transfer-encoding", "connection"].includes(key.toLowerCase())) {
                responseHeaders.set(key, value)
            }
        })

        // Devolver la respuesta
        return new NextResponse(responseText, {
            status: backendRes.status,
            statusText: backendRes.statusText,
            headers: responseHeaders,
        })
    } catch (error) {
        console.error("=== PROXY BOOKS ERROR ===")
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
