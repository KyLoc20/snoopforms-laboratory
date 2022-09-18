import { TopBarNavagationTemplateLayout, TemplateNotFound } from "@/components/layout";
import PreviewApp from "@/components/frontend/PreviewApp";
import { getBlocksBy, TEMPLATE_LIST } from "@/lib/template";

export default function Screen({ templateId }: { templateId: string }) {
  const templateName = TEMPLATE_LIST.find((template) => template.id === templateId)?.name ?? "Unknown Template";
  //todo 404 template
  if (templateName === "Unknown Template") {
    return (
      <TopBarNavagationTemplateLayout title={templateName}>
        <TemplateNotFound templateId={templateId} />
      </TopBarNavagationTemplateLayout>
    );
  } else
    return (
      <TopBarNavagationTemplateLayout title={templateName}>
        <PreviewApp formId={""} blocks={getBlocksBy(templateId)} />
      </TopBarNavagationTemplateLayout>
    );
}
