import { TopBarAppLayout, Loading } from "@/components/layout";
import FormListApp from "@/components/frontend/FormListApp";
import { useFormList } from "@/lib/forms";
export default function Screen() {
  const { isLoadingFormList } = useFormList();
  const isReady = !isLoadingFormList;
  return <TopBarAppLayout title="Public Forms">{isReady ? <FormListApp /> : <Loading />}</TopBarAppLayout>;
}
