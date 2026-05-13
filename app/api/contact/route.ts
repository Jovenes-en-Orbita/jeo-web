import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nombre, apellido, email, asunto, mensaje } = await req.json();

    if (!email || !mensaje) {
      return NextResponse.json({ error: "Email and message are required" }, { status: 400 });
    }

    const fullName = `${nombre} ${apellido}`;

    // Save to Database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: fullName,
        email,
        subject: asunto,
        message: mensaje,
      },
    });

    // Send Email to Admin via Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_your_api_key") {
      await resend.emails.send({
        from: "JEO Contact <contact@jovenesenorbita.com>",
        to: "santi.gar.paredes@gmail.com", // Keeping the same recipient from previous Footer
        subject: `Nueva Consulta: ${asunto}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 40px; border-radius: 20px; border: 1px solid #e5e7eb;">
            <h2 style="color: #111827;">Nueva consulta recibida</h2>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p><strong>De:</strong> ${fullName} (${email})</p>
            <p><strong>Asunto:</strong> ${asunto}</p>
            <div style="background: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb; margin-top: 20px;">
              <p style="white-space: pre-wrap; margin: 0;">${mensaje}</p>
            </div>
            <p style="font-size: 12px; color: #6b7280; margin-top: 30px;">
              Este mensaje fue enviado desde el formulario de contacto de Jovenes en Orbita.
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, contactMessage });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
