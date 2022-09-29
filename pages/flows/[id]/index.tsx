import FlowAdminScreen from "@/screens/flows";
import { GetServerSideProps } from "next";
//templateId is surely accquired
export default function Page({ formId }: { formId: string }) {
  return <FlowAdminScreen formId={formId}></FlowAdminScreen>;
}
export const getServerSideProps: GetServerSideProps = async ({ req, params, resolvedUrl }) => {
  const formId = params?.id?.toString();
  return {
    props: {
      formId,
    },
  };
};
