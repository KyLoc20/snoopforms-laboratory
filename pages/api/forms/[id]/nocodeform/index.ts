import type { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
// import { formHasOwnership } from "../../../../../lib/api";
// import { prisma } from "../../../../../lib/prisma";
import { NoCodeFormData } from "@/lib/types";
const sharedMockData: NoCodeFormData = {
  formId: "thisisatest",
  blocks: [],
  blocksDraft: [
    { id: "1", type: "header", data: { text: "Welcome" } },
    { id: "2", type: "ratingQuestion", data: { _component: { num: 8, icon: "hearts", isRequired: false } } },
    { id: "3", type: "header", data: { text: "Thank you" } },
    { id: "4", type: "paragraph", data: { text: "Congratulations!" } },
  ],
};

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

  /**
   * GET /api/forms/:id/nocodeform
   * Get noCodeForm for a form with specific id
   */
  if (req.method === "GET") {
    //fetch from db
    // const data = await prisma.noCodeForm.findUnique({
    //   where: {
    //     formId: formId,
    //   },
    //   include: {
    //     form: {
    //       select: { name: true },
    //     },
    //   },
    // });

    //fetch from mock
    const data = sharedMockData;
    console.log("GET /api/forms/:id/nocodeform", data.blocksDraft[1].data);
    //return res.status(200).json(data); // Got -> Status Code: 304 OK
    res.status(200).json(data);
  } else if (req.method === "POST") {
    /**
     * POST /api/forms/:id/nocodeform
     * Updates an existing nocodeform
     * Required fields in body: -
     * Optional fields in body: title, published, finishedOnboarding, elements, elementsDraft
     */
    // const { id, createdAt, blocks, blocksDraft, published, closed } =  req.body;
    // const data = {
    //   id,
    //   createdAt,
    //   blocks,
    //   blocksDraft,
    //   formId,
    //   published,
    //   closed,
    //   updatedAt: new Date(),
    // };
    // create or update record
    // const prismaRes = await prisma.noCodeForm.upsert({
    //   where: { formId },
    //   update: data,
    //   create: { form: { connect: { id: formId } } },
    // });
    // return res.status(200).json(prismaRes);

    const payloadData = req.body as NoCodeFormData;
    sharedMockData.formId = payloadData.formId;
    sharedMockData.blocks = payloadData.blocks;
    sharedMockData.blocksDraft = payloadData.blocksDraft;
    console.log("POST /api/forms/:id/nocodeform", sharedMockData.blocksDraft[1].data);
    return res.status(200).json({ isOk: true });
  }
  // Unknown HTTP Method
  else {
    return res.status(400).json({ err: `The HTTP ${req.method} method is not supported by this route.` });
    // throw new Error(`The HTTP ${req.method} method is not supported by this route.`);
  }
}
