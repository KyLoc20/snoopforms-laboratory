import { PropsWithChildren, useState } from "react";
import { NavBar } from "@/components/layout/Navigation";
import Container from "@/components/layout/Container";
import { useNoCodeForm } from "@/lib/noCodeForm";
import YourFirstForm from "@/lib/snoopforms/react/examples";
export default function Screen() {
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <NavBar currentNav="example"></NavBar>
      <Preview>
        <YourFirstForm />
      </Preview>
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
