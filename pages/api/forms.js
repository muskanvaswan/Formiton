import prisma from 'lib/prisma'


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
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
