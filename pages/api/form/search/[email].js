import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// DELETE /api/post/:id
export default async function handle(req, res) {
  const email = req.query.email;
  if (req.method === 'GET') {
    const forms = await prisma.form.findMany({
      where: { ownerEmail: email },
      include: {
        questions: true,
        theme: true,
      }
    });
    res.json(forms);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
