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
  } else if (req.method === 'UPDATE') {
      const formId = req.query.id;
      const data = req.body;
      var form;
      for(question in data.questions) {
        form = await prisma.form.update({
          where: { id: Number(formId) },
          data: {
            questions: {
              upsert: {
                where: {
                  id: question.id
                },
                create: {
                  data: question
                }
              }
            },
        }});
      }
      form = await prisma.form.update({
        where: { id: Number(formId) },
        data: {
          theme: {
            upsert: {
              where: {
                id: data.theme.id
              },
              create: {
                primary: data.theme.primary,
                secondary: data.theme.secondary,
                bgcolor: data.theme.bgcolor,
                text: data.theme.text,
              }
            }
          },
      }});
      res.json(form.id)

  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
