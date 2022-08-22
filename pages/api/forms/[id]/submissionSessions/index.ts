import type { NextApiRequest, NextApiResponse } from "next";
import { generateId } from "@/lib/utils";
import { SubmissionSessionData, SubmissionData } from "@/lib/types";
const getAllSubmissionSessionsOfOneForm = (formId: string) => sharedMockData;
const addOneSubmissionSession = (formId: string, payload: SubmissionSessionData) => {
  sharedMockData.sessions.push(payload);
};
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const formId = req.query.id?.toString();
  if (formId === undefined) {
    return res.status(400).json({ err: "formId Not Found" });
  }
  if (req.method === "GET") {
    const data = getAllSubmissionSessionsOfOneForm(FORM_ID);
    console.log("useSubmissionSessions", data);
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const payloadData = req.body as SubmissionSessionData;
    //todo set createdAt updateAt here
    payloadData.createdAt = new Date(Date.now()).toISOString();
    payloadData.updatedAt = new Date(Date.now()).toISOString();
    addOneSubmissionSession(formId, payloadData);
    return res.status(200).json({ isOk: true });
  }
  // Unknown HTTP Method
  else {
    return res.status(400).json({ err: `The HTTP ${req.method} method is not supported by this route.` });
    // throw new Error(`The HTTP ${req.method} method is not supported by this route.`);
  }
}
const FORM_ID = "thisisatest-form";
const SUB_A1: SubmissionData = {
  id: generateId(10),
  questionId: "3",
  questionType: "ratingQuestion",
  details: {
    ratings: 1,
  },
};
const SUB_A2: SubmissionData = {
  id: generateId(10),
  questionId: "4",
  questionType: "ratingQuestion",
  details: {
    ratings: 10,
  },
};
const SUB_B1: SubmissionData = {
  id: generateId(10),
  questionId: "3",
  questionType: "ratingQuestion",
  details: {
    ratings: 3,
  },
};
const SUB_B2: SubmissionData = {
  id: generateId(10),
  questionId: "4",
  questionType: "ratingQuestion",
  details: {
    ratings: 7,
  },
};
const SESSION_A: SubmissionSessionData = {
  formId: FORM_ID,
  id: generateId(10),
  submissions: [SUB_A1, SUB_A2],
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
};
const SESSION_B: SubmissionSessionData = {
  formId: FORM_ID,
  id: generateId(10),
  submissions: [SUB_B1, SUB_B2],
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
};
const sharedMockData = {
  formId: FORM_ID,
  sessions: [SESSION_A, SESSION_B],
};
