import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.lead.createMany({
    data: [
      {
        number: '11999999999',
        name: 'John Doe',
        profession: 'Developer',
        age: 30,
        gender: 'Male',
        birthDate: new Date('1992-06-04'),
      },
      {
        number: '11888888888',
        name: 'Jane Smith',
        profession: 'Designer',
        age: 28,
        gender: 'Female',
        birthDate: new Date('1995-05-15'),
      },
    ],
  })
}

main()
  .then(() => {
    console.log('Seed completed!')
    return prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    return prisma.$disconnect()
  })
