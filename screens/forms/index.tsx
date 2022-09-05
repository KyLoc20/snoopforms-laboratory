import { Container, MaxWidth, Loading } from "@/components/layout";
import FormListApp from "@/components/frontend/ListApp";
import { useFormList } from "@/lib/forms";
import TopBar from "@/components/TopBanner";
export default function Screen() {
  const { isLoadingFormList } = useFormList();
  const isReady = !isLoadingFormList;
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <TopBar title="Public Forms"></TopBar>
      <MaxWidth>{isReady ? <FormListApp /> : <Loading />}</MaxWidth>
      <div id="new-form-modal"></div>
    </Container>
  );
}
