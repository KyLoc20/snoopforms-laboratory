import { PropsWithChildren } from "react";
import MaxWidth from "./MaxWidth";
import Loading from "./Loading";
import Container from "./Container";
import FullScreenLoading from "./FullScreenLoading";
import { NavBar, AvailableNav } from "./Navigation";
import { FormNotFound } from "./NotFound";
import TopBar from "./TopBar";
import { CardGrid } from "./Grid";
export { Container, MaxWidth, Loading, FormNotFound, FullScreenLoading, CardGrid };
/**
 *
 * @returns From top to bottom: TopBar, App
 */
export function TopBarAppLayout({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <TopBar title={title} />
      <MaxWidth>{children}</MaxWidth>
      <div id="new-form-modal"></div>
    </Container>
  );
}
/**
 *
 * @returns From top to bottom: TopBar, Navagation, App
 */
export function TopBarNavagationAppLayout({
  children,
  title,
  currentNav,
  formId,
  disabledNav,
}: PropsWithChildren<{ title: string; currentNav?: AvailableNav; formId?: string; disabledNav?: boolean }>) {
  return (
    <Container>
      <TopBar title={title} />
      <NavBar currentNav={currentNav} formId={formId} disabledAll={disabledNav}></NavBar>
      <MaxWidth>{children}</MaxWidth>
      <div id="new-form-modal"></div>
    </Container>
  );
}
/**
 *
 * @returns From top to bottom: TopBar, Navagation, w-full App
 */
export function TopBarNavagationFullAppLayout({
  children,
  title,
  currentNav,
  formId,
}: PropsWithChildren<{ title: string; currentNav: AvailableNav; formId?: string }>) {
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <TopBar title={title} />
      <NavBar currentNav={currentNav} formId={formId}></NavBar>
      <MaxWidth full>{children}</MaxWidth>
      <div id="new-form-modal"></div>
    </Container>
  );
}
