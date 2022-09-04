import type { NextApiRequest, NextApiResponse } from "next";
import { generateId } from "@/lib/utils";
import { SubmissionSessionData, SubmissionData } from "@/lib/types";
import { prisma } from "@/lib/prisma";
const getAllSubmissionSessionsOfOneForm = (formId: string) => {
  return prisma.submissionSession.findMany({
    where: { formId },
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
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
