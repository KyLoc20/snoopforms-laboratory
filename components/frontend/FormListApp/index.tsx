import { PropsWithChildren, useState } from "react";
import FormCard from "./FormCard";
import { NoCodeFormData } from "@/lib/types";
import { deleteNoCodeForm } from "@/lib/noCodeForm";
import AddFormButton from "./AddFormButton";
import { useFormList } from "@/lib/forms";
import { FullScreenLoading, CardGrid } from "@/components/layout";
import useCreateFormModal from "@/hooks/useCreateFormModal";
import { isQuestionType } from "@/lib/snoopforms/react/questions";
export default function FormListApp({}) {
  const { formList, mutateFormList } = useFormList();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateFormComplete = (newForm: NoCodeFormData) => {
    const newFormList = JSON.parse(JSON.stringify(formList)) as NoCodeFormData[];
    newFormList.unshift(newForm);
    mutateFormList(newFormList);
  };
  const { isCreating, showModal, hideModal, CreateFormModal } = useCreateFormModal("global-modal-container", handleCreateFormComplete);

  const shouldBeLoading = isCreating || isDeleting;

  const handleDeleteOneForm = (formId: string) => {
    setIsDeleting(true);
    deleteNoCodeForm(formId).then((res) => {
      const newFormList = formList.filter((form) => form.formId !== formId);
      mutateFormList(newFormList);
      setIsDeleting(false);
    });
  };

  return (
    <>
      {shouldBeLoading && <FullScreenLoading />}
      <CreateFormModal />
      <CardGrid>
        <CardWrapper>
          <AddFormButton onClick={showModal}></AddFormButton>
        </CardWrapper>
        {formList.map((form, i) => (
          <CardWrapper key={form.formId}>
            <FormCard
              id={form.formId}
              name={form.name}
              type={"nocode"}
              questions={form.blocks.filter((block) => isQuestionType(block.type)).length}
              onDelete={handleDeleteOneForm}
            />
          </CardWrapper>
        ))}
      </CardGrid>
    </>
  );
}

function CardWrapper({ children }: PropsWithChildren<{}>) {
  return <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>{children}</div>;
}

const isReady = true;
const hasError = true;
const shouldRetry = true;
const canSubmit = true;

function Component({}) {
  const isActive = true;
  return <Button disabled={false} active={isActive}></Button>;
}
type ButtonProps = {
  disabled: boolean;
  active: boolean;
};
function Button({ disabled, active }: ButtonProps) {
  return <button>`Button`</button>;
}
