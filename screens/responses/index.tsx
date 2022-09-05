import { NavBar } from "@/components/layout/Navigation";
import { Container, MaxWidth, Loading, FormNotFound } from "@/components/layout";
import { useSubmissionSessions } from "@/lib/submissionSession";
import { useFormIdSafely } from "@/lib/router";
import ResponseApp from "@/components/frontend/ResponseApp";
import { useNoCodeForm } from "@/lib/noCodeForm";
import TopBar from "@/components/TopBanner";
export default function Screen() {
  const { formId, isValid } = useFormIdSafely();
  const { isLoading, hasError } = useSubmissionSessions(formId);
  const { isLoading: isLoadingForm, hasError: hasErrorForm, noCodeForm } = useNoCodeForm(formId);
  const isReady = isValid && !isLoading;
  const shouldShowName = isReady && !isLoadingForm && !hasErrorForm;
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <TopBar title={shouldShowName ? noCodeForm.name : ""} />
      <NavBar currentNav="responses" formId={formId}></NavBar>
      <MaxWidth full>
        <R formId={formId as string} isReady={isReady} hasError={hasError}></R>
      </MaxWidth>
      <div id="new-form-modal"></div>
    </Container>
  );
}
function R({ formId, isReady, hasError }: { formId: string; isReady: boolean; hasError: boolean }) {
  if (isReady) {
    if (hasError) return <FormNotFound formId={formId} />;
    else return <ResponseApp formId={formId} />;
  } else return <Loading />;
}
