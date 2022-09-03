import { PropsWithChildren, useState } from "react";
import FormCard from "./FormCard";
import { NoCodeFormData } from "@/lib/types";
import { persistNoCodeForm } from "@/lib/noCodeForm";
import useModalPortal from "@/lib/modal";
import CreateFormCard from "./CreateFormCard";
import AddFormButton from "./AddFormButton";
export default function FormListApp({}) {
  const handleCreateOneNewForm = () => {
    // persistNoCodeForm(MOCK_FORM).then((res) => {
    //   console.log("handleAddForm", res);
    // });
    alert("handleCreateOneNewForm");
  };
  const { showModal, hideModal, Portal } = useModalPortal("new-form-modal");
  return (
    <>
      <CardGrid>
        <Portal>
          <CreateFormCard onSubmit={handleCreateOneNewForm} />
        </Portal>
        <AddFormButton onClick={showModal}></AddFormButton>
        {Array(20)
          .fill(0)
          .map((n, i) => (
            <FormCard
              key={i}
              name="What if I alter a form which owns submissions?"
              type={i % 2 === 0 ? "nocode" : "code"}
              responses={i % 2 === 0 ? 8 : 1}
            ></FormCard>
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
