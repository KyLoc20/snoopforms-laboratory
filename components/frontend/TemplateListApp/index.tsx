import { PropsWithChildren, useState } from "react";
import TemplateCard from "./TemplateCard";
import { TEMPLATE_LIST } from "@/lib/template";
import { BlockData } from "@/lib/types";
import useCreateFormModal from "@/hooks/useCreateFormModal";
import { NoCodeFormData } from "@/lib/types";
import { FullScreenLoading, CardGrid } from "@/components/layout";
import { getBlocksBy } from "@/lib/template";
export default function TemplateListApp({}) {
  const [templateInUse, setTemplateInUse] = useState<BlockData[]>([]);

  const handleCreateFormComplete = (newForm: NoCodeFormData) => {
    console.log("handleCreateFormFromTemplate", newForm);
  };
  const { isCreating, showModal, hideModal, CreateFormModal } = useCreateFormModal("global-modal-container", handleCreateFormComplete, true, templateInUse);
  const shouldBeLoading = isCreating;

  const haneleSelectOneTemplate = (templateId: string) => {
    setTemplateInUse(getBlocksBy(templateId));
    showModal();
  };
  return (
    <>
      {shouldBeLoading && <FullScreenLoading />}
      <CreateFormModal />
      <CardGrid>
        {TEMPLATE_LIST.map((template, i) => (
          <CardWrapper key={template.id}>
            <TemplateCard name={template.name} id={template.id} onUse={haneleSelectOneTemplate} />
          </CardWrapper>
        ))}
      </CardGrid>
    </>
  );
}

function CardWrapper({ children }: PropsWithChildren<{}>) {
  return <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>{children}</div>;
}
