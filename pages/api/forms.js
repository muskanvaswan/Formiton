//import prisma from '../../lib/prisma'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// DELETE /api/post/:id
export default async function handle(req, res) {
  if (req.method === 'GET') {
    const forms= await prisma.form.findMany({
      where: { },
      include: {
        questions: true,
        theme: true
      },
    });
    res.json(forms);
  } else if (req.method === 'POST') {
    const data = req.body.form;

    const form = await prisma.form.create({
      data: {
        title: data.title,
        description: data.description,
        owner: data.owner,
        ownerEmail: data.ownerEmail,
        password: data.password,
        questions: {
          create: data.questions
        },
        theme: {
          create: data.theme
        }
      }
    });
    res.json(form);
  }
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
