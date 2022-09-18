import { PropsWithChildren } from "react";
import MaxWidth from "./MaxWidth";
import Loading from "./Loading";
import Container from "./Container";
import FullScreenLoading from "./FullScreenLoading";
import { NavBar, AvailableNav, NavigationWrapper, Navigation } from "./Navigation";
import { FormNotFound, TemplateNotFound } from "./NotFound";
import TopBar, { TopBarForTemplate } from "./TopBar";
import { CardGrid } from "./Grid";
import { EyeIcon } from "@heroicons/react/outline";
export { Container, MaxWidth, Loading, FormNotFound, TemplateNotFound, FullScreenLoading, CardGrid };
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
/**
 *
 * @returns From top to bottom: TopBar, Navagation, TemplatePreview
 */
export function TopBarNavagationTemplateLayout({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <Container>
      <TopBarForTemplate title={title} />
      <NavigationWrapper>
        <Navigation id="preview" label="Preview" icon={EyeIcon} onClick={() => {}} active={true}></Navigation>
      </NavigationWrapper>
      <MaxWidth>{children}</MaxWidth>
      <div id="new-form-modal"></div>
    </Container>
  );
}
