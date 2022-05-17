import prisma from '../../../../lib/prisma'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

export default async function handle(req, res) {
  const formId = req.query.id;
  if (req.method === 'GET') {
    const responses = await prisma.response.findMany({
      where: { formId: Number(formId) },
    });

    res.json(responses);
  } else if (req.method === 'POST') {
    const data = req.body;
    try {
      const response = await prisma.response.create({
        data: {
          form: {connect: {id: Number(formId)}},
          responseObject: JSON.stringify(data)
        }
      });
      res.json(response);
    } catch (e) {
      res.json({"message": "Could not add response"})
    }

  }
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
