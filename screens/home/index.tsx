import { PropsWithChildren, useState } from "react";
import { NavBar } from "@/components/layout/Navigation";
import Builder from "@/components/builder";
import FullWidth from "@/components/layout/FullWidth";
import Container from "@/components/layout/Container";
export default function HomeScreen() {
  return (
    <Container>
      <NavBar></NavBar>
      <FullWidth>
        <Builder></Builder>
      </FullWidth>
    </Container>
  );
}
