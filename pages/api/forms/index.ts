import type { NextApiRequest, NextApiResponse } from "next";
import { NoCodeFormData } from "@/lib/types";
import { prisma } from "@/lib/prisma";

const getAllForms = () => {
  return prisma.form.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
};
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const _res = await getAllForms();
    const forms: NoCodeFormData[] = _res.map((item) => {
      return { formId: item.id, name: item.name, blocks: [], blocksDraft: JSON.parse(JSON.stringify(item.schema)) };
    });
    res.status(200).json(forms);
  }
  // Unknown HTTP Method
  else {
    return res.status(400).json({ err: `The HTTP ${req.method} method is not supported by this route.` });
    // throw new Error(`The HTTP ${req.method} method is not supported by this route.`);
  }
}
