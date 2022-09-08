import { useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import AddPageButton from "@/components/layout/FloatActionButton/AddPage";
let SnoopFormsEditor = dynamic(() => import("@/lib/editorjs"), {
  ssr: false,
});

export default function BuilderApp({ formId }: { formId: string }) {
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
    <>
      <section>
        <SnoopFormsEditor id="editor" editorRef={refEditor} autofocus formId={formId}></SnoopFormsEditor>
      </section>
      <AddPageButton onClick={handleAddPage} />
    </>
  );
}
