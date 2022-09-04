import { NavBar } from "@/components/layout/Navigation";
import BuilderApp from "@/components/BuilderApp";
import { useNoCodeForm } from "@/lib/noCodeForm";
import { Container, MaxWidth, Loading, FormNotFound } from "@/components/layout";
import { useFormIdSafely } from "@/lib/router";
export default function Screen() {
  const { formId, isValid } = useFormIdSafely();
  const { isLoading, hasError } = useNoCodeForm(formId);
  const isReady = isValid && !isLoading;
  return (
    <Container>
      <NavBar currentNav="builder" formId={formId}></NavBar>
      <MaxWidth>{isReady ? hasError ? <FormNotFound formId={formId as string} /> : <BuilderApp formId={formId as string} /> : <Loading />}</MaxWidth>
    </Container>
  );
}
