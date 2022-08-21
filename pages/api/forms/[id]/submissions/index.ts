import type { NextApiRequest, NextApiResponse } from "next";
import { generateId } from "@/lib/utils";
// import { getSession } from "next-auth/react";
// import { formHasOwnership } from "../../../../../lib/api";
// import { prisma } from "../../../../../lib/prisma";
import { SubmissionData } from "@/lib/types";

const SUB1: SubmissionData = {
  submissionId: generateId(10),
  questionId: "3",
  questionType: "ratingQuestion",
  details: {
    ratings: 1,
  },
};
const SUB2: SubmissionData = {
  submissionId: generateId(10),
  questionId: "4",
  questionType: "ratingQuestion",
  details: {
    ratings: 10,
  },
};
const sharedMockData: {
  formId: string;
  list: SubmissionData[];
} = {
  formId: "thisisatest-form",
  list: [SUB1, SUB2],
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
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const payloadData = req.body as SubmissionData;
    const { submissionId, questionId, questionType, details } = payloadData;
    sharedMockData.list.push({ submissionId, questionId, questionType, details });
    return res.status(200).json({ isOk: true });
  }
  // Unknown HTTP Method
  else {
    return res.status(400).json({ err: `The HTTP ${req.method} method is not supported by this route.` });
    // throw new Error(`The HTTP ${req.method} method is not supported by this route.`);
  }
}
