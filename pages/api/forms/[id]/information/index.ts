import type { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
// import { formHasOwnership } from "../../../../../lib/api";
// import { prisma } from "../../../../../lib/prisma";
import { FormInformationData } from "@/lib/types";
import { prisma } from "@/lib/prisma";
export function deleteOneForm(id: string) {
  return prisma.form.delete({
    where: {
      id,
    },
  });
}
export function findOneForm(id: string) {
  return prisma.form.findUnique({
    where: {
      id,
    },
  });
}
export function upsertOneForm(id: string, name: string, schema: any[], schemaDraft: any[]) {
  return prisma.form.upsert({
    where: { id },
    update: {
      name,
      schema,
      schemaDraft,
    },
    create: {
      id,
      name,
      schema,
      schemaDraft,
    },
  });
}
/**
 * query all information on a Form
 * @param req
 * @param res
 * @returns
 */
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
      const formInformationData: FormInformationData = {
        formId: data.id,
        name: data.name,
        lastUpdated: new Date(data.updatedAt).getTime(),
      };
      res.status(200).json(formInformationData);
    } else {
      //empty
      res.status(404).json({ message: `Form of ${formId} Not Found` });
    }
  }
  // Unknown HTTP Method
  else {
    return res.status(400).json({ err: `The HTTP ${req.method} method is not supported by this route.` });
    // throw new Error(`The HTTP ${req.method} method is not supported by this route.`);
  }
}
