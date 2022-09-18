import { TopBarNavagationTemplateLayout, TemplateNotFound } from "@/components/layout";
import PreviewApp from "@/components/frontend/PreviewApp";
import { getBlocksBy, TEMPLATE_LIST } from "@/lib/template";

export default function Screen({ templateId }: { templateId: string }) {
  const templateName = TEMPLATE_LIST.find((template) => template.id === templateId)?.name ?? "Unknown Template";
  if (templateName === "Unknown Template") {
    return (
      <TopBarNavagationTemplateLayout templateId={templateId} templateName={templateName}>
        <TemplateNotFound templateId={templateId} />
      </TopBarNavagationTemplateLayout>
    );
  } else
    return (
      <TopBarNavagationTemplateLayout templateId={templateId} templateName={templateName}>
        <PreviewApp offline={true} formId={""} blocks={getBlocksBy(templateId)} />
      </TopBarNavagationTemplateLayout>
    );
}
