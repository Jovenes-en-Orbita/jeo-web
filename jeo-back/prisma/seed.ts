import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Ejemplo de seed - personaliza según tus modelos
  const user = await prisma.user.upsert({
    where: { email: 'admin@jeo.com' },
    update: {},
    create: {
      email: 'admin@jeo.com',
      name: 'Admin JEO',
    },
  });

  console.log('Created user:', user);
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
