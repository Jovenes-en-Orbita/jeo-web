import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-for-jovenes-en-orbita-platform-2026';
const secret = new TextEncoder().encode(JWT_SECRET);

export async function signJWT(payload: { id: string; email: string; role: string; department?: string | null }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // Expires in 24 hours
    .sign(secret);
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { id: string; email: string; role: string; department?: string | null };
  } catch (error) {
    return null;
  }
}
