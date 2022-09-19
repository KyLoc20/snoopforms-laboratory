import ComsumeScreen from "@/screens/consume";
import { GetServerSideProps } from "next";
//templateId is surely accquired
export default function Page({ formId }: { formId: string }) {
  return <ComsumeScreen formId={formId}></ComsumeScreen>;
}
export const getServerSideProps: GetServerSideProps = async ({ req, params, resolvedUrl }) => {
  const formId = params?.id?.toString();
  return {
    props: {
      formId,
    },
  };
};
