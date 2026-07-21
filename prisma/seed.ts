const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding physical rooms...')

  // Delete existing rooms to avoid unique constraint errors during re-seed
  await prisma.room.deleteMany({})

  const standardRooms = [
    // 101 to 115
    ...Array.from({ length: 15 }, (_, i) => `${101 + i}`),
    // 201 to 216
    ...Array.from({ length: 16 }, (_, i) => `${201 + i}`),
    // 304 to 311
    ...Array.from({ length: 8 }, (_, i) => `${304 + i}`)
  ]

  const familyRooms = [
    // 301 to 303
    '301', '302', '303',
    // 312
    '312'
  ]

  let count = 0

  for (const num of standardRooms) {
    await prisma.room.create({
      data: {
        roomNumber: num,
        roomType: 'Standard Room',
        status: 'available'
      }
    })
    count++
  }

  for (const num of familyRooms) {
    await prisma.room.create({
      data: {
        roomNumber: num,
        roomType: 'Family Room',
        status: 'available'
      }
    })
    count++
  }

  console.log(`Successfully seeded ${count} rooms (39 Standard, 4 Family).`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
