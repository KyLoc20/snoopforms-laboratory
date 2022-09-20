import { PropsWithChildren, useState } from "react";
import { persistNoCodeForm } from "@/lib/noCodeForm";
import useModalPortal from "@/lib/modal";
import CreateFormCard, { AvailableType } from "@/components/modal/CreateFormCard";
import { generateId } from "@/lib/utils";
import { useNavigation } from "@/lib/router";
import { generateForm } from "@/lib/noCodeForm";
import { DEFAULT_TEMPLATE, WELCOME_TEMPLATE } from "@/lib/template";
import { NoCodeFormData, BlockData } from "@/lib/types";
/**
 * @param targetId element id
 * @param onSuccess do something when Success
 * @param fromTemplate
 * @param template
 * @returns
 */
export default function useCreateFormModal(targetId: string, onSuccess: (newForm: NoCodeFormData) => void, fromTemplate?: boolean, template?: BlockData[]) {
  const [isCreating, setIsCreating] = useState(false);
  const { showModal, hideModal, Portal } = useModalPortal(targetId);
  const { navigateTo } = useNavigation();
  const handleCreateForm = (formName: string, formType: AvailableType, shoudUseDefaultTemplate: boolean) => {
    hideModal();
    setIsCreating(true);
    const formId = generateId(10);
    const templateInUse = shoudUseDefaultTemplate ? DEFAULT_TEMPLATE() : template === undefined ? WELCOME_TEMPLATE() : template;
    const newForm = generateForm(formId, formName, templateInUse);
    persistNoCodeForm(newForm).then((res) => {
      onSuccess(newForm);
      navigateTo(`/forms/${formId}/builder`);
      setIsCreating(false);
    });
  };
  const handleBrowseTemplates = () => {
    hideModal();
    navigateTo(`/templates`);
  };
  const CreateFormModal: React.FC = () => (
    <Portal>
      <CreateFormCard fromTemplate={fromTemplate} onSubmit={handleCreateForm} onBrowseTemplates={handleBrowseTemplates} />
    </Portal>
  );
  return { isCreating, showModal, hideModal, CreateFormModal };
}
