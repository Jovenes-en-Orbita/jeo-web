import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  const adminEmail = 'jovenesenorbita@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminJEO2026!';
  const hashedPassword = bcrypt.hashSync(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      email: adminEmail,
      name: 'Admin JEO',
      passwordHash: hashedPassword,
      role: 'ADMIN',
      department: 'Programación',
    },
  });

  console.log('Created or updated Admin user:', {
    id: admin.id,
    email: admin.email,
    role: admin.role,
    department: admin.department,
  });
  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
