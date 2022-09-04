import { PropsWithChildren } from "react";
import { NavBar } from "@/components/layout/Navigation";
import { Container, MaxWidth, Loading } from "@/components/layout";
import { useSubmissionSessions } from "@/lib/submissionSession";
import { useNoCodeForm } from "@/lib/noCodeForm";
import SummaryApp from "@/components/frontend/SummaryApp";
export default function Screen() {
  const formId = "thisisatest-form";
  const { isLoadingSubmissionSessions } = useSubmissionSessions(formId);
  const { isLoadingNoCodeForm } = useNoCodeForm("thisisatest-form");
  const isReady = !isLoadingSubmissionSessions && !isLoadingNoCodeForm;
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <NavBar currentNav="summary"></NavBar>
      <MaxWidth>{isReady ? <SummaryApp formId={formId} /> : <Loading />}</MaxWidth>
    </Container>
  );
}
