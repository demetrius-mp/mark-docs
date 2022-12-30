import { PrismaClient } from '@prisma/client';
import { withExclude } from 'prisma-exclude';

const db = withExclude(new PrismaClient());

export default db;
