import { PropsWithChildren, useState } from "react";
import TemplateCard from "./TemplateCard";
import { CardGrid } from "@/components/layout";
import { TEMPLATE_LIST } from "@/lib/template";
import { BlockData } from "@/lib/types";
import { generateForm, persistNoCodeForm } from "@/lib/noCodeForm";
import useModalPortal from "@/lib/modal";
import CreateFormCard from "@/components/CreateFormCard";

import { generateId } from "@/lib/utils";

import { FullScreenLoading } from "@/components/layout";
import { useNavigation } from "@/lib/router";
import { getBlocksBy } from "@/lib/template";
export default function TemplateListApp({}) {
  const [isCreating, setIsCreating] = useState(false);
  const shouldBeLoading = isCreating;
  const [templateInUse, setTemplateInUse] = useState<BlockData[]>([]);
  const { showModal, hideModal, Portal } = useModalPortal("new-form-modal");

  const haneleSelectOneTemplate = (templateId: string) => {
    setTemplateInUse(getBlocksBy(templateId));
    showModal();
  };

  const { navigate: toNewForm } = useNavigation();
  const handleCreateFormFromTemplate = (formName: string) => {
    hideModal();
    setIsCreating(true);
    const formId = generateId(10);
    const newForm = generateForm(formId, formName, templateInUse);
    console.log("handleCreateFormFromTemplate", newForm);
    persistNoCodeForm(newForm).then((res) => {
      toNewForm(`/forms/${formId}/builder`);
      setIsCreating(false);
    });
  };

  return (
    <>
      <CardGrid>
        {TEMPLATE_LIST.map((template, i) => (
          <CardWrapper key={template.id}>
            <TemplateCard name={template.name} id={template.id} onUse={haneleSelectOneTemplate} />
          </CardWrapper>
        ))}
      </CardGrid>
      <Portal>
        <CreateFormCard fromTemplate onSubmit={handleCreateFormFromTemplate} />
      </Portal>
      {shouldBeLoading && <FullScreenLoading />}
    </>
  );
}

function CardWrapper({ children }: PropsWithChildren<{}>) {
  return <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>{children}</div>;
}
