import { PropsWithChildren } from "react";
import MaxWidth from "./MaxWidth";
import Loading from "./Loading";
import Container from "./Container";
import FullScreenLoading from "./FullScreenLoading";
import { NavBar, AvailableNav } from "./Navigation";
import { FormNotFound } from "./NotFound";
import TopBar from "./TopBar";
export { Container, MaxWidth, Loading, FormNotFound, FullScreenLoading };
/**
 * From top to bottom: TopBar, Navagation, App
 * @returns
 */
export function TopBarNavagationAppLayout({ children, title, currentNav }: PropsWithChildren<{ title: string; currentNav: AvailableNav }>) {
  return (
    <Container>
      <TopBar title={title} />
      <NavBar currentNav={currentNav}></NavBar>
      <MaxWidth>{children}</MaxWidth>
      <div id="new-form-modal"></div>
    </Container>
  );
}
