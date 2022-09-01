import type { NextApiRequest, NextApiResponse } from "next";
import { generateId } from "@/lib/utils";
import { SubmissionSessionData, SubmissionData } from "@/lib/types";
import { prisma } from "@/lib/prisma";
const getAllSubmissionSessionsOfOneForm = (formId: string) => {
  return prisma.submissionSession.findMany({
    where: { formId },
  });
};
const upsertOneSubmissionSession = (formId: string, payload: SubmissionSessionData) => {
  const { id, submissions } = payload;
  return prisma.submissionSession.upsert({
    where: { id: payload.id },
    update: {
      submissions,
    },
    create: {
      id,
      formId,
      submissions,
    },
  });
};
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const formId = req.query.id?.toString();
  if (formId === undefined) {
    return res.status(400).json({ err: "formId Not Found" });
  }
  if (req.method === "GET") {
    const _res = await getAllSubmissionSessionsOfOneForm(formId);
    const submissionSessions: SubmissionSessionData[] = _res.map((item) => {
      const { formId, id, submissions, createdAt, updatedAt } = item;
      return { formId, id, createdAt: createdAt.toISOString(), updatedAt: updatedAt.toISOString(), submissions: JSON.parse(JSON.stringify(submissions)) };
    });
    res.status(200).json(submissionSessions);
  } else if (req.method === "POST") {
    const payloadData = req.body as SubmissionSessionData;
    //todo set createdAt updateAt here
    // payloadData.createdAt = new Date(Date.now()).toISOString();
    // payloadData.updatedAt = new Date(Date.now()).toISOString();
    const result = await upsertOneSubmissionSession(formId, payloadData);
    return res.status(200).json({ isOk: true, result });
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

const SUB_C1: SubmissionData = {
  id: generateId(10),
  questionId: "3",
  questionType: "ratingQuestion",
  details: {
    ratings: 3,
  },
};
const SUB_C2: SubmissionData = {
  id: generateId(10),
  questionId: "4",
  questionType: "ratingQuestion",
  details: {
    ratings: 9,
  },
};

const SUB_D1: SubmissionData = {
  id: generateId(10),
  questionId: "3",
  questionType: "ratingQuestion",
  details: {
    ratings: 1,
  },
};
const SUB_D2: SubmissionData = {
  id: generateId(10),
  questionId: "4",
  questionType: "ratingQuestion",
  details: {
    ratings: 9,
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
const SESSION_C: SubmissionSessionData = {
  formId: FORM_ID,
  id: generateId(10),
  submissions: [SUB_C1, SUB_C2],
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
};
const SESSION_D: SubmissionSessionData = {
  formId: FORM_ID,
  id: generateId(10),
  submissions: [SUB_D1, SUB_D2],
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
};
const sharedMockData = {
  formId: FORM_ID,
  sessions: [SESSION_A, SESSION_B, SESSION_C, SESSION_D],
};
