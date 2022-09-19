import { useNoCodeForm } from "@/lib/noCodeForm";
import { AppLayout, Loading, FormNotFound, FormNotPublished } from "@/components/layout";
import { BlockData } from "@/lib/types";
import PreviewApp from "@/components/frontend/PreviewApp";
export default function Screen({ formId }: { formId: string }) {
  return <View formId={formId as string} />;
}
function View({ formId }: { formId: string }) {
  const { isLoading, hasError, noCodeForm, error } = useNoCodeForm(formId);
  const isReady = !isLoading;
  return (
    <AppLayout>
      <R formId={formId as string} isReady={isReady} hasError={hasError} blocks={noCodeForm.blocks ?? []}></R>
    </AppLayout>
  );
}
function R({ formId, isReady, hasError, blocks }: { formId: string; isReady: boolean; hasError: boolean; blocks: BlockData[] }) {
  if (isReady) {
    if (hasError) return <FormNotFound formId={formId} />;
    if (blocks.length === 0) return <FormNotPublished formId={formId} />;
    else return <PreviewApp offline={false} formId={formId as string} blocks={blocks} />;
  } else return <Loading />;
}
