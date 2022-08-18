import { PropsWithChildren, useState, useEffect } from "react";
import { NavBar } from "@/components/layout/Navigation";
import Builder from "@/components/builder";
import FullWidth from "@/components/layout/FullWidth";
import Container from "@/components/layout/Container";
import { useNoCodeForm, persistNoCodeForm } from "@/lib/noCodeForm";
import FormApp from "@/components/frontend/App";
import { BlockData } from "@/lib/types";
export default function PreviewScreen() {
  const { noCodeForm, isLoadingNoCodeForm, mutateNoCodeForm } = useNoCodeForm("123");
  const [num, setNum] = useState();

  if (isLoadingNoCodeForm) {
    return (
      <Container bg="rgb(246, 248, 249, 1)">
        <NavBar currentNav="preview"></NavBar>
        <Preview>Loading</Preview>
      </Container>
    );
  } else {
    // const d = noCodeForm.blocksDraft[1].data.num;
    return (
      <Container bg="rgb(246, 248, 249, 1)">
        <NavBar currentNav="preview"></NavBar>
        <Preview>
          <FormApp id={"test-app"} blocks={noCodeForm.blocksDraft} localOnly={true} formId={"test-form"} />
        </Preview>
      </Container>
    );
  }
}

function Preview({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex justify-center">
      <section style={{ maxWidth: "768px", flex: 1, padding: "20px 0" }}>{children}</section>
    </div>
  );
}
