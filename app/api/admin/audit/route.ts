import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";
import prisma from "@/lib/prisma";

// Helper to authenticate Admin
async function checkAdmin() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) return null;

  const payload = await verifyJWT(sessionToken);
  if (!payload || payload.role !== "ADMIN") return null;

  return payload;
}

export async function GET() {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    // Fetch counts in parallel
    const [
      totalUsers,
      totalPosts,
      totalContacts,
      totalSubscribers
    ] = await Promise.all([
      prisma.user.count(),
      prisma.astronomicalPost.count(),
      prisma.contactMessage.count(),
      prisma.newsletterSubscriber.count()
    ]);

    // Fetch uploaded posts with authors details
    const posts = await prisma.astronomicalPost.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
          }
        }
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      stats: {
        totalUsers,
        totalPosts,
        totalContacts,
        totalSubscribers,
      },
      posts,
    });
  } catch (error) {
    console.error("GET audit logs error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
