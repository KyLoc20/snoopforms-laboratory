import { NavBar } from "@/components/layout/Navigation";
import { Container, MaxWidth, Loading, FormNotFound } from "@/components/layout";
import { useSubmissionSessions } from "@/lib/submissionSession";
import { useFormIdSafely } from "@/lib/router";
import SummaryApp from "@/components/frontend/SummaryApp";
import { useNoCodeForm } from "@/lib/noCodeForm";
import TopBar from "@/components/TopBar";
export default function Screen() {
  const { formId, isValid } = useFormIdSafely();
  const { isLoading, hasError } = useSubmissionSessions(formId);
  const { isLoading: isLoadingForm, hasError: hasErrorForm, noCodeForm } = useNoCodeForm(formId);
  const isReady = isValid && !isLoading;
  const shouldShowName = isReady && !isLoadingForm && !hasErrorForm;
  console.log("SummaryApp", shouldShowName, noCodeForm.name);
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <TopBar title={shouldShowName ? noCodeForm.name : ""} />
      <NavBar currentNav="summary" formId={formId}></NavBar>
      <MaxWidth>
        <R formId={formId as string} isReady={isReady} hasError={hasError}></R>
      </MaxWidth>
      <div id="new-form-modal"></div>
    </Container>
  );
}
function R({ formId, isReady, hasError }: { formId: string; isReady: boolean; hasError: boolean }) {
  if (isReady) {
    if (hasError) return <FormNotFound formId={formId} />;
    else return <SummaryApp formId={formId} />;
  } else return <Loading />;
}
