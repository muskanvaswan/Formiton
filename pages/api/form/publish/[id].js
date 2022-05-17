import prisma from '../../../lib/prisma'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
// DELETE /api/post/:id
export default async function handle(req, res) {
  const formId = req.query.id;
  if (req.method === 'UPDATE') {
        await prisma.form.update({
        where: { id: Number(formId) },
        data: {
          published: true,
        }});
      res.json(formId)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
