import { NavBar } from "@/components/layout/Navigation";
import BuilderApp from "@/components/BuilderApp";
import { useNoCodeForm } from "@/lib/noCodeForm";
import { Container, MaxWidth, Loading, FormNotFound } from "@/components/layout";
import { useFormIdSafely } from "@/lib/router";
import TopBar from "@/components/TopBanner";
export default function Screen() {
  const { formId, isValid } = useFormIdSafely();
  const { isLoading, hasError, noCodeForm } = useNoCodeForm(formId);
  const isReady = isValid && !isLoading;
  const shouldShowName = isReady && !hasError;
  return (
    <Container>
      <TopBar title={shouldShowName ? noCodeForm.name : ""} />
      <NavBar currentNav="builder" formId={formId}></NavBar>
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
    else return <BuilderApp formId={formId} />;
  } else return <Loading />;
}
