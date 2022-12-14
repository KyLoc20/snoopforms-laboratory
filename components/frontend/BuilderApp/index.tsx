import { useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import AddPageButton from "@/components/layout/FloatActionButton/AddPage";
import clsx from "clsx";
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
        <SnoopFormsEditor editorRef={refEditor} formId={formId}></SnoopFormsEditor>
        <div className={clsx("block-placeholder-incase-overflow", "w-full h-[48px]")}></div>
      </section>
      <AddPageButton onClick={handleAddPage} />
    </>
  );
}
