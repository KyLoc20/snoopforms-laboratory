import { TopBarAppLayout, Loading } from "@/components/layout";
import FormListApp from "@/components/frontend/ListApp";
import { useFormList } from "@/lib/forms";
import { useIndicatorOnChangeRoute } from "@/lib/ProgressIndicator";
//https://ricostacruz.com/nprogress/
export default function Screen() {
  useIndicatorOnChangeRoute();
  const { isLoadingFormList } = useFormList();
  const isReady = !isLoadingFormList;
  return <TopBarAppLayout title="Public Forms">{isReady ? <FormListApp /> : <Loading />}</TopBarAppLayout>;
}
