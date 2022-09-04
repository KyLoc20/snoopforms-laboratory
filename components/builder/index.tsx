import { useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import dynamic from "next/dynamic";
let SnoopFormsEditor = dynamic(() => import("@/lib/editorjs"), {
  ssr: false,
});

export default function Builder({ formId }: { formId: string }) {
  const refEditor = useRef<EditorJS | null>(null);
  const handleAddPage = () => {
    if (refEditor.current) {
      refEditor.current.blocks.insert("pageTransition", {
        submitLabel: "Submit",
      });
      const block = refEditor.current.blocks.insert("paragraph");
      refEditor.current.caret.setToBlock(refEditor.current.blocks.getBlockIndex(block.id));
    }
  };
  return (
    <div className="w-full h-full mb-20 overflow-auto bg-white pt-10">
      <section className="pt-10 pb-56 max-w-5xl mx-auto">
        <SnoopFormsEditor id="editor" editorRef={refEditor} autofocus formId={formId}></SnoopFormsEditor>
      </section>
      <AddPageButton onClick={handleAddPage} />
    </div>
  );
}
function AddPageButton({ onClick }: { onClick: () => void }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        background: isHovering ? "rgba(245,59,87,0.8)" : "rgba(245,59,87,0.6)",
        color: "white",
        borderRadius: "50%",
        width: "48px",
        height: "48px",
        margin: "8px",
        position: "fixed",
        right: "24px",
        bottom: "24px",
        boxShadow: "rgba(245,59,87,0.3) 0px 4px 20px 0px",
        transition: "all .2s cubic-bezier(.4,.2,0,1)",
        zIndex: 1000,
      }}
    >
      <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
      </svg>
    </div>
  );
}
