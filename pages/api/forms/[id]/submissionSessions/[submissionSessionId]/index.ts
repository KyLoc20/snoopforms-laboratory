import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import NextCors from "nextjs-cors";
import { prisma } from "@/lib/prisma";
const deleteOneSubmissionSession = (submissionSessionId: string) => {
  return prisma.submissionSession.delete({
    where: { id: submissionSessionId },
  });
};
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const formId = req.query.id?.toString();
  const submissionSessionId = req.query.submissionSessionId?.toString();
  if (submissionSessionId === undefined) {
    return res.status(400).json({ err: "submissionSessionId Not Found" });
  }
  // const ownership = await formHasOwnership(session, formId);
  // if (!ownership) {
  //   return res.status(401).json({
  //     message: "You are not authorized to access this submission session",
  //   });
  // }
  if (req.method === "DELETE") {
    const result = await deleteOneSubmissionSession(submissionSessionId);
    return res.status(200).json({ isOk: true, result });
  }
  // Unknown HTTP Method
  else {
    return res.status(400).json({ err: `The HTTP ${req.method} method is not supported by this route.` });
  }
}
