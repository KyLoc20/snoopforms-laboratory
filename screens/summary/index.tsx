import { PropsWithChildren } from "react";
import { NavBar } from "@/components/layout/Navigation";
import { Container, MaxWidth, Loading, FormNotFound } from "@/components/layout";
import { useSubmissionSessions } from "@/lib/submissionSession";
import { useFormIdSafely } from "@/lib/router";
import SummaryApp from "@/components/frontend/SummaryApp";
export default function Screen() {
  const { formId, isValid } = useFormIdSafely();
  const { isLoading, hasError } = useSubmissionSessions(formId);
  const isReady = isValid && !isLoading;
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <NavBar currentNav="summary" formId={formId}></NavBar>
      <MaxWidth>{isReady ? hasError ? <FormNotFound formId={formId as string} /> : <SummaryApp formId={formId as string} /> : <Loading />}</MaxWidth>
    </Container>
  );
}
