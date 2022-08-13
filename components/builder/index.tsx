import { useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import dynamic from "next/dynamic";
let SnoopFormsEditor = dynamic(() => import("@/lib/editorjs"), {
  ssr: false,
});
export default function Builder({}) {
  const refEditor = useRef<EditorJS | null>(null);
  return (
    <div className="w-full h-full mb-20 overflow-auto bg-white pt-10">
      <section className="pt-10 pb-56 max-w-5xl mx-auto">
        <SnoopFormsEditor id="editor" editorRef={refEditor} autofocus></SnoopFormsEditor>
      </section>
    </div>
  );
}
