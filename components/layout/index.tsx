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
export function TopBarNavagationAppLayout({
  children,
  title,
  currentNav,
  formId,
}: PropsWithChildren<{ title: string; currentNav: AvailableNav; formId?: string }>) {
  return (
    <Container>
      <TopBar title={title} />
      <NavBar currentNav={currentNav} formId={formId}></NavBar>
      <MaxWidth>{children}</MaxWidth>
      <div id="new-form-modal"></div>
    </Container>
  );
}
