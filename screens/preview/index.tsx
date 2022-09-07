import { useNoCodeForm } from "@/lib/noCodeForm";
import { TopBarNavagationAppLayout, Loading, FormNotFound } from "@/components/layout";
import FormApp from "@/components/frontend/FormApp";
import { useFormIdSafely } from "@/lib/router";
import { BlockData } from "@/lib/types";
export default function Screen() {
  const { formId, isValid } = useFormIdSafely();
  if (isValid) return <View formId={formId as string} />;
  else return <LoadingView />;
}
function R({ formId, isReady, hasError, blocks }: { formId: string; isReady: boolean; hasError: boolean; blocks: BlockData[] }) {
  if (isReady) {
    if (hasError) return <FormNotFound formId={formId} />;
    else return <FormApp formId={formId as string} blocks={blocks} />;
  } else return <Loading />;
}
function View({ formId }: { formId: string }) {
  const { isLoading, hasError, noCodeForm, error } = useNoCodeForm(formId);
  const isReady = !isLoading;
  return (
    <TopBarNavagationAppLayout title={isReady && !hasError ? noCodeForm.name : ""} currentNav={"preview"} formId={formId}>
      <R formId={formId as string} isReady={isReady} hasError={hasError} blocks={noCodeForm.blocksDraft ?? []}></R>
    </TopBarNavagationAppLayout>
  );
}
function LoadingView() {
  return (
    <TopBarNavagationAppLayout title={""} currentNav={"preview"}>
      <Loading />
    </TopBarNavagationAppLayout>
  );
}
