import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let prisma: PrismaClient

const isBuildTime = process.env.NODE_ENV === 'production' && 
  process.env.VERCEL === '1' && !process.env.DATABASE_URL

if (isBuildTime) {
  prisma = {} as PrismaClient
} else {
  try {
    if (process.env.NODE_ENV === 'production') {
      prisma = new PrismaClient({
        log: ['error'],
        datasources: {
          db: {
            url: process.env.DATABASE_URL,
          },
        },
      })
    } else {
      if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = new PrismaClient({
          log: ['query', 'error', 'warn'],
          datasources: {
            db: {
              url: process.env.DATABASE_URL,
            },
          },
        })
      }
      prisma = globalForPrisma.prisma
    }
  } catch (error) {
    console.error('Erro ao inicializar Prisma:', error)
    prisma = {} as PrismaClient
  }
}

export { prisma }
