// import { getSession } from "next-auth/react";
import Loading from "@/components/layout/Loading";
import { GetServerSideProps } from "next";
// import { formHasOwnership } from "../../../lib/api";
import { prisma } from "@/lib/prisma";
//NOT GOOD UX
export default function FormIndexer() {
  return <Loading />;
}
export const getServerSideProps: GetServerSideProps = async ({ req, params, resolvedUrl }) => {
  //   const session = await getSession({ req });
  //   if (!session) {
  //     return {
  //       redirect: {
  //         destination: `/auth/signin?callbackUrl=${encodeURIComponent(resolvedUrl)}`,
  //         statusCode: 302,
  //       },
  //     };
  //   }
  const formId = params?.id?.toString();
  //   const ownership = await formHasOwnership(session, formId);
  //   if (!ownership) {
  //     return {
  //       redirect: {
  //         destination: resolvedUrl,
  //         statusCode: 404,
  //       },
  //     };
  //   }
  // redirect based on number of submissionSession
  const submissionSessionsData = await prisma.submissionSession.findMany({
    where: {
      form: { id: formId },
    },
  });
  if (submissionSessionsData.length > 0) {
    return {
      redirect: {
        permanent: false,
        destination: `/forms/${formId}/results/summary`,
      },
    };
  } else {
    // redirect to /builder if there isn't one submissionSession
    return {
      redirect: {
        permanent: false,
        destination: `/forms/${formId}/builder`,
      },
    };
  }
};
