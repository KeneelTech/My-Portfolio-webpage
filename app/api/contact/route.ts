import { prisma } from "../../../lib/prisma"
import { NextResponse } from "next/server"

// Save a contact form submission
export async function POST(req: Request) {
    const { name, email, message } = await req.json()

    const contact = await prisma.message.create({
        data: { name, email, message }
    })

    return NextResponse.json({ success: true, contact })
}

// Retrieve all submissions
export async function GET() {
    const contacts = await prisma.message.findMany({
        orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(contacts)
}