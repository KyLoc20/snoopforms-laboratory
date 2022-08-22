import { PropsWithChildren } from "react";
import { NavBar } from "@/components/layout/Navigation";
import Container from "@/components/layout/Container";
import { useSubmissionSessions } from "@/lib/submissionSessions";
import SummaryApp from "@/components/frontend/SummaryApp";
export default function Screen() {
  const formId = "thisisatest-form";
  const { isLoadingSubmissionSessions } = useSubmissionSessions(formId);
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <NavBar currentNav="summary"></NavBar>
      {isLoadingSubmissionSessions ? <Preview>Loading</Preview> : <SummaryApp formId={formId}></SummaryApp>}
    </Container>
  );
}

function Preview({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex justify-center">
      <section style={{ maxWidth: "768px", flex: 1, padding: "20px 0" }}>{children}</section>
    </div>
  );
}
