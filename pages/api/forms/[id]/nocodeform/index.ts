import type { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
// import { formHasOwnership } from "../../../../../lib/api";
// import { prisma } from "../../../../../lib/prisma";
import { prisma } from "@/lib/prisma";
// export function findPosts() {
//   return prisma.post.findMany({
//     where: {},
//   });
// }
export function createOneForm(id: string, name: string, schema: any[]) {
  return prisma.form.create({
    data: {
      id,
      name,
      schema,
    },
  });
}
import { NoCodeFormData } from "@/lib/types";
const sharedMockData: NoCodeFormData = {
  formId: "thisisatest-form",
  blocks: [],
  blocksDraft: [
    { id: "1-1", type: "header", data: { text: "Form for Testing", level: 1 } },
    { id: "1-2", type: "header", data: { text: "Welcome to Snoopforms Lab", level: 2 } },
    {
      id: "1-3",
      type: "ratingQuestion",
      data: { _component: { num: 5, icon: "stars", isRequired: false, title: "RatingQuestion1-1 How do you like this stuff?" } },
    },
    {
      id: "1-4",
      type: "ratingQuestion",
      data: { _component: { num: 10, icon: "hearts", isRequired: false, title: "RatingQuestion1-2 How do you like that stuff?" } },
    },
    {
      id: "1-5",
      type: "textQuestion",
      data: { _component: { placeholder: "Type Your Answer Here", title: "TextQuestion1-3 Where are you from?", isRequired: false } },
    },
    {
      id: "1-6",
      type: "pageTransition",
      data: { _component: { submitLabel: "Submit" } },
    },
    {
      id: "2-1",
      type: "ratingQuestion",
      data: { _component: { num: 3, icon: "stars", isRequired: true, title: "RatingQuestion2-1 How do you like that stuff?" } },
    },
    {
      id: "2-2",
      type: "ratingQuestion",
      data: { _component: { num: 7, icon: "hearts", isRequired: false, title: "RatingQuestion2-2 How do you like that stuff?" } },
    },
    {
      id: "2-3",
      type: "textQuestion",
      data: { _component: { placeholder: "Type Your Answer Here", title: "TextQuestion2-3 What's your name?", isRequired: true } },
    },
    {
      id: "2-4",
      type: "pageTransition",
      data: { _component: { submitLabel: "Go Next" } },
    },
    {
      id: "3-1",
      type: "textQuestion",
      data: { _component: { placeholder: "Type Your Answer Here", title: "TextQuestion3-1 May I know your age?", isRequired: true } },
    },
    { id: "3-2", type: "paragraph", data: { text: "Thanks a lot for your time and insights 🙏" } },
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
    const formId = payloadData.formId;
    const formName = payloadData.formId;
    const formSchema = payloadData.blocksDraft;
    const result = await createOneForm(formId, formName, formSchema);
    // sharedMockData.formId = payloadData.formId;
    // sharedMockData.blocks = payloadData.blocks;
    // sharedMockData.blocksDraft = payloadData.blocksDraft;
    console.log("POST /api/forms/:id/nocodeform", formSchema);
    return res.status(200).json({ isOk: true, result });
  }
  // Unknown HTTP Method
  else {
    return res.status(400).json({ err: `The HTTP ${req.method} method is not supported by this route.` });
    // throw new Error(`The HTTP ${req.method} method is not supported by this route.`);
  }
}
