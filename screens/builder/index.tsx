import BuilderApp from "@/components/BuilderApp";
import { useNoCodeForm } from "@/lib/noCodeForm";
import { TopBarNavagationAppLayout, Loading, FormNotFound } from "@/components/layout";
import { useFormIdSafely } from "@/lib/router";
export default function Screen() {
  const { formId, isValid } = useFormIdSafely();
  if (isValid) return <View formId={formId as string} />;
  else return <LoadingView />;
}
function R({ formId, isReady, hasError }: { formId: string; isReady: boolean; hasError: boolean }) {
  if (isReady) {
    if (hasError) return <FormNotFound formId={formId} />;
    else return <BuilderApp formId={formId} />;
  } else return <Loading />;
}
function View({ formId }: { formId: string }) {
  const { isLoading, hasError, noCodeForm, error } = useNoCodeForm(formId);
  const isReady = !isLoading;
  return (
    <TopBarNavagationAppLayout title={isReady && !hasError ? noCodeForm.name : ""} currentNav={"builder"} formId={formId}>
      <R formId={formId as string} isReady={isReady} hasError={hasError}></R>
    </TopBarNavagationAppLayout>
  );
}

function LoadingView() {
  return (
    <TopBarNavagationAppLayout title={""} currentNav={"builder"}>
      <Loading />
    </TopBarNavagationAppLayout>
  );
}
