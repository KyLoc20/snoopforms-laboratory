import { PropsWithChildren } from "react";
import { NavBar } from "@/components/layout/Navigation";
import Container from "@/components/layout/Container";
import { useSubmissions } from "@/lib/submission";
import { useSubmissionSessions } from "@/lib/submissionSessions";
import ResponseApp from "@/components/frontend/ResponseApp";
export default function Screen() {
  const formId = "thisisatest-form";
  const { submissionSessions, isLoadingSubmissionSessions, mutateSubmissionSessions } = useSubmissionSessions(formId);
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <NavBar currentNav="responses"></NavBar>
      {isLoadingSubmissionSessions ? <Preview>Loading</Preview> : <ResponseApp formId={formId}></ResponseApp>}
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
