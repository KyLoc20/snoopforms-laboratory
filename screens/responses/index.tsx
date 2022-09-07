import { TopBarNavagationFullAppLayout, Loading, FormNotFound } from "@/components/layout";
import { useSubmissionSessions } from "@/lib/submissionSession";
import { useFormIdSafely } from "@/lib/router";
import ResponseApp from "@/components/frontend/ResponseApp";
import { useNoCodeForm } from "@/lib/noCodeForm";
export default function Screen() {
  const { formId, isValid } = useFormIdSafely();
  if (isValid) return <View formId={formId as string} />;
  else return <LoadingView />;
}
function R({ formId, isReady, hasError }: { formId: string; isReady: boolean; hasError: boolean }) {
  if (isReady) {
    if (hasError) return <FormNotFound formId={formId} />;
    else return <ResponseApp formId={formId} />;
  } else return <Loading />;
}

function View({ formId }: { formId: string }) {
  const { isLoading, hasError } = useSubmissionSessions(formId);
  const { isLoading: isLoadingForm, hasError: hasErrorForm, noCodeForm } = useNoCodeForm(formId);
  const isReady = !isLoading;
  const hasName = isReady && !isLoadingForm && !hasErrorForm;
  return (
    <TopBarNavagationFullAppLayout title={hasName ? noCodeForm.name : ""} currentNav={"responses"} formId={formId}>
      <R formId={formId as string} isReady={isReady} hasError={hasError}></R>
    </TopBarNavagationFullAppLayout>
  );
}

function LoadingView() {
  return (
    <TopBarNavagationFullAppLayout title={""} currentNav={"responses"}>
      <Loading />
    </TopBarNavagationFullAppLayout>
  );
}
