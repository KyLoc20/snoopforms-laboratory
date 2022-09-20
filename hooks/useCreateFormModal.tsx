import { PropsWithChildren, useState } from "react";
import { persistNoCodeForm } from "@/lib/noCodeForm";
import useModalPortal from "@/lib/modal";
import CreateFormCard, { AvailableType } from "@/components/modal/CreateFormCard";
import { generateId } from "@/lib/utils";
import { useNavigation } from "@/lib/router";
import { generateForm } from "@/lib/noCodeForm";
import { DEFAULT_TEMPLATE, WELCOME_TEMPLATE } from "@/lib/template";
import { NoCodeFormData } from "@/lib/types";
export default function useCreateFormModal(targetId: string, onSuccess: (newForm: NoCodeFormData) => void) {
  const [isCreating, setIsCreating] = useState(false);
  const { showModal, hideModal, Portal } = useModalPortal(targetId);
  const { navigateTo } = useNavigation();
  const handleCreateForm = (name: string, type: AvailableType, shoudUseDefaultTemplate: boolean) => {
    if (type === "nocode") {
      hideModal();
      setIsCreating(true);
      const formId = generateId(10);
      const newForm = generateForm(formId, name, shoudUseDefaultTemplate ? DEFAULT_TEMPLATE() : WELCOME_TEMPLATE());
      persistNoCodeForm(newForm).then((res) => {
        onSuccess(newForm);
        navigateTo(`/forms/${formId}/builder`);
        setIsCreating(false);
      });
    }
  };
  const handleBrowseTemplates = () => {
    hideModal();
    navigateTo(`/templates`);
  };
  const CreateFormModal: React.FC = () => (
    <Portal>
      <CreateFormCard onSubmit={handleCreateForm} onBrowseTemplates={handleBrowseTemplates} />
    </Portal>
  );
  return { isCreating, showModal, hideModal, CreateFormModal };
}
