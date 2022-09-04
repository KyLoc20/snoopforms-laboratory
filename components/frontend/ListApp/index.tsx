import { PropsWithChildren, useState } from "react";
import FormCard from "./FormCard";
import { NoCodeFormData } from "@/lib/types";
import { persistNoCodeForm } from "@/lib/noCodeForm";
import useModalPortal from "@/lib/modal";
import CreateFormCard, { AvailableType } from "./CreateFormCard";
import AddFormButton from "./AddFormButton";
import { generateId } from "@/lib/utils";
import { useFormList } from "@/lib/forms";
import { useRouter } from "next/router";
export default function FormListApp({}) {
  const router = useRouter();
  const { formList, mutateFormList } = useFormList();
  const handleNavigateToForm = (formId: string) => {
    console.log("handleNavigateToForm", formId);
    router.push(`/forms/${formId}`);
  };
  const handleCreateOneNewForm = (name: string, type: AvailableType) => {
    if (type === "nocode") {
      const formId = generateId(10);
      persistNoCodeForm({ formId, name, blocksDraft: [], blocks: [] });
    }
  };
  const { showModal, hideModal, Portal } = useModalPortal("new-form-modal");
  return (
    <>
      <CardGrid>
        <Portal>
          <CreateFormCard onSubmit={handleCreateOneNewForm} />
        </Portal>
        <AddFormButton onClick={showModal}></AddFormButton>
        {formList.map((form, i) => (
          <div key={form.formId} onClick={() => handleNavigateToForm(form.formId)}>
            <FormCard name={form.name} type={"nocode"} responses={0}></FormCard>
          </div>
        ))}
      </CardGrid>
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
