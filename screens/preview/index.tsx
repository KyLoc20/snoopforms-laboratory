import { PropsWithChildren, useState } from "react";
import { NavBar } from "@/components/layout/Navigation";
import Container from "@/components/layout/Container";
import { useNoCodeForm } from "@/lib/noCodeForm";
import FormApp from "@/components/frontend/NewFormApp";
export default function PreviewScreen() {
  const { noCodeForm, isLoadingNoCodeForm } = useNoCodeForm("thisisatest-form");
  const isReady = !isLoadingNoCodeForm;
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <NavBar currentNav="preview"></NavBar>
      <Preview>{isReady ? <FormApp id={"test-app"} blocks={noCodeForm.blocksDraft} localOnly={true} formId={"thisisatest-form"} /> : "Loading"}</Preview>
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
