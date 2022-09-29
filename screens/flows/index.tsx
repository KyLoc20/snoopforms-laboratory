import { TopBarNavagationFullAppLayout, Loading, FormNotFound } from "@/components/layout";
import FlowAdminApp from "@/components/frontend/FlowAdminApp";
import { useNoCodeForm } from "@/lib/noCodeForm";
export default function Screen({ formId }: { formId: string }) {
  return <View formId={formId as string} />;
}
function View({ formId }: { formId: string }) {
  const { isLoading, hasError, noCodeForm, error } = useNoCodeForm(formId);
  const isReady = !isLoading;
  return (
    <TopBarNavagationFullAppLayout title={noCodeForm.name ?? ""} currentNav={"flows"} formId={formId}>
      <R formId={formId as string} isReady={isReady} hasError={hasError}></R>
    </TopBarNavagationFullAppLayout>
  );
}
function R({ formId, isReady, hasError }: { formId: string; isReady: boolean; hasError: boolean }) {
  if (isReady) {
    if (hasError) return <FormNotFound formId={formId} />;
    else return <FlowAdminApp />;
  } else return <Loading />;
}
