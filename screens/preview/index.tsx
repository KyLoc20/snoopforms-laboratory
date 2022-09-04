import { PropsWithChildren, useState } from "react";
import { NavBar } from "@/components/layout/Navigation";
import { Container, MaxWidth, Loading } from "@/components/layout";
import { useNoCodeForm } from "@/lib/noCodeForm";
import FormApp from "@/components/frontend/FormApp";
export default function PreviewScreen() {
  const { noCodeForm, isLoadingNoCodeForm } = useNoCodeForm("thisisatest-form");
  const isReady = !isLoadingNoCodeForm;
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <NavBar currentNav="preview"></NavBar>
      <MaxWidth>{isReady ? <FormApp id={"test-app"} blocks={noCodeForm.blocksDraft} localOnly={true} formId={"thisisatest-form"} /> : <Loading />}</MaxWidth>
    </Container>
  );
}
