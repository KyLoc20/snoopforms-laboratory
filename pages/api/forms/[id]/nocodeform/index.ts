import type { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
// import { formHasOwnership } from "../../../../../lib/api";
// import { prisma } from "../../../../../lib/prisma";
import { NoCodeFormData } from "@/lib/types";
import { prisma } from "@/lib/prisma";
export function findOneForm(id: string) {
  return prisma.form.findUnique({
    where: {
      id,
    },
  });
}
export function upsertOneForm(id: string, name: string, schema: any[]) {
  return prisma.form.upsert({
    where: { id },
    update: {
      name,
      schema,
    },
    create: {
      id,
      name,
      schema,
    },
  });
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // Check Authentication
  //   const session = await getSession({ req: req });
  //   if (!session) {
  //     return res.status(401).json({ message: "Not authenticated" });
  //   }

  const formId = req.query.id?.toString();
  if (formId === undefined) {
    return res.status(400).json({ err: "formId Not Found" });
  }

  // Check Ownership
  //   const ownership = await formHasOwnership(session, formId);
  //   if (!ownership) {
  //     return res.status(401).json({ message: "You are not authorized to access this noCodeForm" });
  //   }

  if (req.method === "GET") {
    const data = await findOneForm(formId);
    if (data) {
      const nocodeFormData: NoCodeFormData = { formId: data.id, name: data.name, blocks: [], blocksDraft: JSON.parse(JSON.stringify(data.schema)) };
      res.status(200).json(nocodeFormData);
    } else {
      //empty
      res.status(404).json({ message: `Form of ${formId} Not Found` });
    }
  } else if (req.method === "POST") {
    const payloadData = req.body as NoCodeFormData;
    const formId = payloadData.formId;
    const formName = payloadData.name;
    const formSchema = payloadData.blocksDraft;
    const result = await upsertOneForm(formId, formName, formSchema);
    return res.status(200).json({ isOk: true, result });
  }
  // Unknown HTTP Method
  else {
    return res.status(400).json({ err: `The HTTP ${req.method} method is not supported by this route.` });
    // throw new Error(`The HTTP ${req.method} method is not supported by this route.`);
  }
}
