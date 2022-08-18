import { PropsWithChildren, useState, useEffect } from "react";
import { NavBar } from "@/components/layout/Navigation";
import Builder from "@/components/builder";
import FullWidth from "@/components/layout/FullWidth";
import Container from "@/components/layout/Container";
import { useNoCodeForm, persistNoCodeForm } from "@/lib/noCodeForm";
export default function PreviewScreen() {
  const { noCodeForm, isLoadingNoCodeForm, mutateNoCodeForm } = useNoCodeForm("123");
  const [num, setNum] = useState();

  if (isLoadingNoCodeForm) {
    return (
      <Container>
        <NavBar currentNav="preview"></NavBar>
        <FullWidth>Loading</FullWidth>
      </Container>
    );
  } else {
    const d = noCodeForm.blocksDraft[1].data._component.num;
    return (
      <Container>
        <NavBar currentNav="preview"></NavBar>
        <FullWidth>PreviewScreen {d}</FullWidth>
      </Container>
    );
  }
}
