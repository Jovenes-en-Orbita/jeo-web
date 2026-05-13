import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Save to Database
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { name: name || undefined },
      create: { email, name },
    });

    // Send Confirmation Email via Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_your_api_key") {
      await resend.emails.send({
        from: "Jovenes en Orbita <newsletter@jovenesenorbita.com>",
        to: email,
        subject: "¡Bienvenido a la comunidad de Jovenes en Orbita!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #ffffff; padding: 40px; border-radius: 20px;">
            <h1 style="color: #3b82f6;">¡Hola ${name || "explorador"}!</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #a1a1aa;">
              Gracias por unirte a nuestra misión de explorar los misterios del cosmos. 
              A partir de ahora, recibirás noticias exclusivas, descubrimientos fascinantes y 
              actualizaciones sobre eventos astronómicos directamente en tu bandeja de entrada.
            </p>
            <div style="margin: 30px 0; padding: 20px; border-left: 4px solid #8b5cf6; background: rgba(139, 92, 246, 0.1);">
              <p style="margin: 0; font-style: italic;">"El cosmos es todo lo que es, todo lo que fue y todo lo que será." - Carl Sagan</p>
            </div>
            <p style="font-size: 14px; color: #71717a;">
              Nos vemos en las estrellas,<br>
              El equipo de Jovenes en Orbita
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, subscriber });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
