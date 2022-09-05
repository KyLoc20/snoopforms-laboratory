import { PropsWithChildren } from "react";
import { NavBar } from "@/components/layout/Navigation";
import { Container, MaxWidth, Loading, FormNotFound } from "@/components/layout";
import { useSubmissionSessions } from "@/lib/submissionSession";
import { useNoCodeForm } from "@/lib/noCodeForm";
import SummaryApp from "@/components/frontend/SummaryApp";
export default function Screen() {
  const formId = "thisisatest-form";
  const { isLoadingSubmissionSessions } = useSubmissionSessions(formId);
  const { isLoading, hasError } = useNoCodeForm(formId);
  const isReady = !isLoadingSubmissionSessions && !isLoading;
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <NavBar currentNav="summary"></NavBar>
      <MaxWidth>{isReady ? hasError ? <FormNotFound formId={formId as string} /> : <SummaryApp formId={formId as string} /> : <Loading />}</MaxWidth>
    </Container>
  );
}
