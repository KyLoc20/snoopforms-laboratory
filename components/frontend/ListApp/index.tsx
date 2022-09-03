import { PropsWithChildren, useState } from "react";
import FormCard from "./FormCard";
import { PlusIcon } from "@heroicons/react/outline";
import { NoCodeFormData } from "@/lib/types";
import { persistNoCodeForm } from "@/lib/noCodeForm";
import useModalPortal from "@/lib/modal";
// import NewFormModal from "./NewFormModal";
export default function FormListApp({}) {
  const handleAddForm = () => {
    // persistNoCodeForm(MOCK_FORM).then((res) => {
    //   console.log("handleAddForm", res);
    // });
    showModal();
  };

  const { showModal, hideModal, Portal } = useModalPortal("new-form-modal");
  return (
    <>
      <CardGrid>
        <Portal>
          <div>123</div>
        </Portal>
        <AddFormButton onClick={handleAddForm}></AddFormButton>
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
export function AddFormButton({ onClick }: PropsWithChildren<{ onClick: () => void }>) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
      className="add-form-button"
      style={{
        cursor: "pointer",
        boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
        background: isHovering ? "rgba(245,59,87,1)" : "rgba(245,59,87,0.8)",
        width: "176px",
        height: "224px",
        borderRadius: "16px",
        transition: "all .2s cubic-bezier(.4,.2,0,1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "56px",
      }}
    >
      <PlusIcon style={{ width: "56px", height: "56px", margin: "0 4px" }} />
      <span style={{ textAlign: "center" }}>create form</span>
    </div>
  );
}
