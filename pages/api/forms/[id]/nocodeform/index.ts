import type { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
// import { formHasOwnership } from "../../../../../lib/api";
// import { prisma } from "../../../../../lib/prisma";
import { NoCodeFormData } from "@/lib/types";
const sharedMockData: NoCodeFormData = {
  formId: "thisisatest-form",
  blocks: [],
  blocksDraft: [
    { id: "1", type: "header", data: { text: "Form for Testing", level: 1 } },
    { id: "2", type: "header", data: { text: "Welcome to Snoopforms Lab", level: 2 } },
    {
      id: "3",
      type: "ratingQuestion",
      data: { _component: { num: 5, icon: "stars", isRequired: true, title: "RatingQuestion1 How do you like this stuff?" } },
    },
    {
      id: "4",
      type: "ratingQuestion",
      data: { _component: { num: 10, icon: "hearts", isRequired: false, title: "RatingQuestion2 How do you like that stuff?" } },
    },
    { id: "5", type: "paragraph", data: { text: "Thanks a lot for your time and insights 🙏" } },
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

  if (req.method === "GET") {
    //fetch from mock
    const data = sharedMockData;
    // console.log("GET /api/forms/:id/nocodeform", data.blocksDraft[1].data);
    //return res.status(200).json(data); // Got -> Status Code: 304 OK
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const payloadData = req.body as NoCodeFormData;
    sharedMockData.formId = payloadData.formId;
    sharedMockData.blocks = payloadData.blocks;
    sharedMockData.blocksDraft = payloadData.blocksDraft;
    console.log("POST /api/forms/:id/nocodeform", sharedMockData.blocksDraft);
    return res.status(200).json({ isOk: true });
  }
  // Unknown HTTP Method
  else {
    return res.status(400).json({ err: `The HTTP ${req.method} method is not supported by this route.` });
    // throw new Error(`The HTTP ${req.method} method is not supported by this route.`);
  }
}
