import { TopBarAppLayout, Loading } from "@/components/layout";
import { GetServerSideProps } from "next";
import { prisma } from "@/lib/prisma";
import { useEffect } from "react";
import { useRouter } from "next/router";
//This is just an indexer Page to redirect to a specified route
export default function IndexerPage({ formId, redirectTo }: { formId?: string; redirectTo?: string }) {
  const router = useRouter();
  useEffect(() => {
    if (redirectTo) router.replace(redirectTo);
  }, [redirectTo]);
  return <LoadingView></LoadingView>;
}
function LoadingView() {
  return (
    <TopBarAppLayout title={""}>
      <Loading />
    </TopBarAppLayout>
  );
}
// import { getSession } from "next-auth/react";
// import { formHasOwnership } from "../../../lib/api";
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
      props: {
        formId,
        redirectTo: `/forms/${formId}/results/summary`,
      },
      //NOT GOOD UX if redirect directly
      // redirect: {
      //   permanent: false,
      //   destination: `/forms/${formId}/results/summary`,
      // },
    };
  } else {
    // redirect to /builder if there isn't one submissionSession
    return {
      props: {
        formId,
        redirectTo: `/forms/${formId}/builder`,
      },
      // redirect: {
      //   permanent: false,
      //   destination: `/forms/${formId}/builder`,
      // },
    };
  }
};
