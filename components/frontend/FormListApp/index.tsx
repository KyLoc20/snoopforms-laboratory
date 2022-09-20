import { PropsWithChildren, useState } from "react";
import FormCard from "./FormCard";
import { NoCodeFormData } from "@/lib/types";
import { persistNoCodeForm, deleteNoCodeForm } from "@/lib/noCodeForm";
import useModalPortal from "@/lib/modal";
import CreateFormCard, { AvailableType } from "@/components/modal/CreateFormCard";
import AddFormButton from "./AddFormButton";
import { generateId } from "@/lib/utils";
import { useFormList } from "@/lib/forms";
import { FullScreenLoading } from "@/components/layout";
import { useNavigation } from "@/lib/router";
import { generateForm } from "@/lib/noCodeForm";
import { DEFAULT_TEMPLATE, WELCOME_TEMPLATE } from "@/lib/template";
import useCreateFormModal from "@/hooks/useCreateFormModal";
export default function FormListApp({}) {
  const { formList, mutateFormList } = useFormList();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateFormComplete = (newForm: NoCodeFormData) => {
    console.log("handleCreateFormComplete", newForm);
    const newFormList = JSON.parse(JSON.stringify(formList)) as NoCodeFormData[];
    newFormList.unshift(newForm);
    mutateFormList(newFormList);
  };
  const { isCreating, showModal, hideModal, CreateFormModal } = useCreateFormModal("new-form-modal", handleCreateFormComplete);

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
            <FormCard id={form.formId} name={form.name} type={"nocode"} responses={0} onDelete={handleDeleteOneForm} />
          </CardWrapper>
        ))}
      </CardGrid>
    </>
  );
}
import styles from "./FormListApp.module.css";
function CardGrid({ children }: PropsWithChildren<{}>) {
  return (
    <section className="card-grid flex justify-center">
      <div className={styles.cardGrid} style={{ display: "grid", gap: "1.5rem", maxWidth: "1024px", flex: 1, padding: "32px 24px" }}>
        {children}
      </div>
    </section>
  );
}
function CardWrapper({ children }: PropsWithChildren<{}>) {
  return <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>{children}</div>;
}
