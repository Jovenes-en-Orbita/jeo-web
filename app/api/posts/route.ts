import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";
import prisma from "@/lib/prisma";

// Helper to authenticate session
async function checkAuth() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) return null;

  return await verifyJWT(sessionToken);
}

export async function GET() {
  try {
    const session = await checkAuth();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Standard users only see their own posts, Admins see all
    let posts;
    if (session.role === "ADMIN") {
      posts = await prisma.astronomicalPost.findMany({
        include: {
          author: {
            select: {
              name: true,
              email: true,
              department: true,
            }
          }
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      posts = await prisma.astronomicalPost.findMany({
        where: { authorId: session.id },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("GET posts error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await checkAuth();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { title, content, category, imageUrl } = await req.json();

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: "Los campos título, contenido y categoría son obligatorios" },
        { status: 400 }
      );
    }

    const newPost = await prisma.astronomicalPost.create({
      data: {
        title,
        content,
        category,
        imageUrl: imageUrl || null,
        authorId: session.id,
      },
    });

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error("POST post error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
