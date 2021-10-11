//import prisma from '../../../lib/prisma'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// DELETE /api/post/:id
export default async function handle(req, res) {
  const formId = req.query.id;
  if (req.method === 'GET') {
    const form = await prisma.form.findUnique({
      where: { id: Number(formId) },
      include: {
        questions: {
          include: {
            options: true
          }
        },
        theme: true
      },
    });
    res.json(form);
  } else if (req.method === 'DELETE'){
      const { id } = req.params
      const form = await prisma.form.delete({
        where: {
          id: Number(id),
        },
      })
  } else if (req.method === 'POST') {

      const data = req.body;
      console.log(data)
      const form = data.form
      await prisma.form.update({
        where: { id: Number(formId) },
        data: {
          theme: {
            upsert: {
              create: {
                primary: form.theme.primary,
                secondary: form.theme.secondary,
                bgcolor: form.theme.bgcolor,
                text: form.theme.text,
              },
              update: {
                primary: form.theme.primary,
                secondary: form.theme.secondary,
                bgcolor: form.theme.bgcolor,
                text: form.theme.text,
              }
            }
          },
      }});
      res.json(formId)

  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
