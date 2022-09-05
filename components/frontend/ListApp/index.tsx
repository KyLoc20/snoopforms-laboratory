import { PropsWithChildren, useState } from "react";
import FormCard from "./FormCard";
import { NoCodeFormData } from "@/lib/types";
import { persistNoCodeForm, deleteNoCodeForm } from "@/lib/noCodeForm";
import useModalPortal from "@/lib/modal";
import CreateFormCard, { AvailableType } from "./CreateFormCard";
import AddFormButton from "./AddFormButton";
import { generateId } from "@/lib/utils";
import { useFormList } from "@/lib/forms";
import { FullScreenLoading } from "@/components/layout";

export default function FormListApp({}) {
  const { formList, mutateFormList } = useFormList();

  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldBeLoading = isCreating || isDeleting;

  const { showModal, hideModal, Portal } = useModalPortal("new-form-modal");
  const handleCreateOneNewForm = (name: string, type: AvailableType) => {
    if (type === "nocode") {
      setIsCreating(true);
      const formId = generateId(10);
      const newForm = generateInitialForm(formId, name);
      persistNoCodeForm(newForm).then((res) => {
        const newFormList = JSON.parse(JSON.stringify(formList)) as NoCodeFormData[];
        newFormList.unshift(newForm);
        mutateFormList(newFormList);
        setIsCreating(false);
        hideModal();
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
        <Portal>
          <CreateFormCard onSubmit={handleCreateOneNewForm} />
        </Portal>
        <AddFormButton onClick={showModal}></AddFormButton>
        {formList.map((form, i) => (
          <FormCard key={form.formId} id={form.formId} name={form.name} type={"nocode"} responses={0} onDelete={handleDeleteOneForm}></FormCard>
        ))}
      </CardGrid>
      {shouldBeLoading && <FullScreenLoading />}
    </>
  );
}

function CardGrid({ children }: PropsWithChildren<{}>) {
  // const [forms, setForms] = useState(
  // );
  return (
    <section className="card-grid flex justify-center">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: " 1.5rem", maxWidth: "1024px", flex: 1, padding: "32px 24px" }}>
        {children}
      </div>
    </section>
  );
}
const generateInitialForm = (formId: string, name: string): NoCodeFormData => ({
  formId,
  name,
  blocks: [],
  blocksDraft: [
    { id: generateId(10), type: "header", data: { text: "Welcome to Snoopforms Lab", level: 2 } },
    {
      id: generateId(10),
      type: "ratingQuestion",
      data: { _component: { num: 5, icon: "stars", isRequired: false, title: "How do you like this stuff?" } },
    },
    {
      id: generateId(10),
      type: "pageTransition",
      data: { _component: { submitLabel: "Submit" } },
    },
    {
      id: generateId(10),
      type: "textQuestion",
      data: { _component: { placeholder: "Type Your Answer Here", title: "May I know your name?", isRequired: false } },
    },
    { id: generateId(10), type: "paragraph", data: { text: "Thanks a lot for your time and insights 🙏" } },
  ],
});
