//import prisma from '../../../lib/prisma'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// DELETE /api/post/:id
export default async function handle(req, res) {
  const formId = req.query.id;
  if (req.method === 'UPDATE') {

    try  {
        await prisma.form.update({
        where: { id: Number(formId) },
        data: {
          published: true,
        }});
      res.json(formId)
    } catch (e) {
      res.json{{message: "Could Not Update"}}
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
