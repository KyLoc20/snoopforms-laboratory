import TemplatePreviewScreen from "@/screens/templatePreview";
import { GetServerSideProps } from "next";
//templateId is surely accquired
export default function Page({ templateId }: { templateId: string }) {
  return <TemplatePreviewScreen templateId={templateId}></TemplatePreviewScreen>;
}
export const getServerSideProps: GetServerSideProps = async ({ req, params, resolvedUrl }) => {
  const templateId = params?.id?.toString();
  //todo
  //   if (!templateId) {
  //     //404
  //     return {};
  //   }
  return {
    props: {
      templateId,
    },
  };
};
