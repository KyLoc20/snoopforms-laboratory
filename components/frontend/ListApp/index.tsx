import { PropsWithChildren, useState } from "react";
import FormCard from "./FormCard";
import { NoCodeFormData } from "@/lib/types";
import { persistNoCodeForm, deleteNoCodeForm } from "@/lib/noCodeForm";
import useModalPortal from "@/lib/modal";
import CreateFormCard, { AvailableType, generateInitialForm, generateDefaultTemplateForm } from "@/components/CreateFormCard";
import AddFormButton from "./AddFormButton";
import { generateId } from "@/lib/utils";
import { useFormList } from "@/lib/forms";
import { FullScreenLoading } from "@/components/layout";
import { useNavigation } from "@/lib/router";
export default function FormListApp({}) {
  const { formList, mutateFormList } = useFormList();

  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldBeLoading = isCreating || isDeleting;

  const { showModal, hideModal, Portal } = useModalPortal("new-form-modal");
  const { navigate: toNewForm } = useNavigation();
  const handleCreateOneNewForm = (name: string, type: AvailableType, shoudUseDefaultTemplate: boolean) => {
    if (type === "nocode") {
      hideModal();
      setIsCreating(true);
      const formId = generateId(10);
      const newForm = shoudUseDefaultTemplate ? generateDefaultTemplateForm(formId, name) : generateInitialForm(formId, name);
      persistNoCodeForm(newForm).then((res) => {
        toNewForm(`/forms/${formId}/builder`);
        const newFormList = JSON.parse(JSON.stringify(formList)) as NoCodeFormData[];
        newFormList.unshift(newForm);
        mutateFormList(newFormList);
        setIsCreating(false);
      });
    }
  };

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
      <Portal>
        <CreateFormCard onSubmit={handleCreateOneNewForm} />
      </Portal>
      {shouldBeLoading && <FullScreenLoading />}
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
