import { NavBar } from "@/components/layout/Navigation";
import { Container, MaxWidth, Loading, FormNotFound } from "@/components/layout";
import { useNoCodeForm } from "@/lib/noCodeForm";
import FormApp from "@/components/frontend/FormApp";
import { useFormIdSafely } from "@/lib/router";
import TopBar from "@/components/TopBar";
export default function Screen() {
  const { formId, isValid } = useFormIdSafely();
  const { noCodeForm, isLoading, hasError } = useNoCodeForm(formId);
  const isReady = isValid && !isLoading;
  const shouldShowName = isReady && !hasError;
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <TopBar title={shouldShowName ? noCodeForm.name : ""} />
      <NavBar currentNav="preview" formId={formId}></NavBar>
      <MaxWidth>
        {isReady ? (
          hasError ? (
            <FormNotFound formId={formId as string} />
          ) : (
            <FormApp formId={formId as string} blocks={noCodeForm.blocksDraft ?? []} />
          )
        ) : (
          <Loading />
        )}
      </MaxWidth>
      <div id="new-form-modal"></div>
    </Container>
  );
}
