import { PropsWithChildren } from "react";
import { NavBar } from "@/components/layout/Navigation";
import Container from "@/components/layout/Container";
import { useNoCodeForm } from "@/lib/noCodeForm";
import { useSubmissionSessions } from "@/lib/submissionSession";
import ResponseApp from "@/components/frontend/ResponseApp";
export default function Screen() {
  const formId = "thisisatest-form";
  const { isLoadingSubmissionSessions } = useSubmissionSessions(formId);
  const { isLoadingNoCodeForm } = useNoCodeForm("thisisatest-form");
  const isReady = !isLoadingSubmissionSessions && !isLoadingNoCodeForm;
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <NavBar currentNav="responses"></NavBar>
      {isReady ? <ResponseApp formId={formId} /> : <Preview>Loading</Preview>}
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
