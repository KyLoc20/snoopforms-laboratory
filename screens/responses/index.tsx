import { PropsWithChildren, useState } from "react";
import { NavBar } from "@/components/layout/Navigation";
import Container from "@/components/layout/Container";
import { useNoCodeForm } from "@/lib/noCodeForm";
import { useSubmissions } from "@/lib/submission";
import FormApp from "@/components/frontend/App";
export default function Screen() {
  const { result, isLoadingSubmissions } = useSubmissions("thisisatest-form");
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <NavBar currentNav="responses"></NavBar>
      <Preview>{isLoadingSubmissions ? "Loading" : "OK"}</Preview>
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
