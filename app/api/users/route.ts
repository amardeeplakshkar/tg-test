import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, first_name, last_name, username, language_code, is_premium } = req.body;

    try {
      // Upsert user: update if exists, create if not
      const user = await prisma.user.upsert({
        where: { id },
        update: {
          first_name,
          last_name,
          username,
          language_code,
          is_premium,
        },
        create: {
          id,
          first_name,
          last_name,
          username,
          language_code,
          is_premium,
        },
      });
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to save user data', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
