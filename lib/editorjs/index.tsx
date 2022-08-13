import EditorJS, { ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import DragDrop from "editorjs-drag-drop";
// @ts-ignore
import Undo from "editorjs-undo";
import { Fragment, MutableRefObject, useCallback, useEffect } from "react";
// import { toast } from "react-toastify";
// import { persistNoCodeForm, useNoCodeForm } from "../../lib/noCodeForm";
// import Loading from "../Loading";
// import EmailQuestion from "./tools/EmailQuestion";
// import PageTransition from "./tools/PageTransition";
// import MultipleChoiceQuestion from "./tools/MultipleChoiceQuestion";
import TextQuestion from "./tools/TextQuestion";
import RatingQuestion from "./tools/RatingQuestion";
// import WebsiteQuestion from "./tools/WebsiteQuestion";
// import PhoneQuestion from "./tools/PhoneQuestion";
// import NumberQuestion from "./tools/NumberQuestion";

interface EditorProps {
  id: string;
  autofocus: boolean;
  editorRef: MutableRefObject<EditorJS | null>; //{ current: EditorJS | null }; //RefObject<EditorJS>;
  formId?: string;
  initAction?: (editor: EditorJS) => void;
}
export default function BestEditor({ id, autofocus = false, editorRef, formId, initAction }: EditorProps) {
  useEffect(() => {
    if (!editorRef.current) {
      initEditor();
    }
    return () => {
      destroyEditor();
    };
    async function destroyEditor() {
      if (editorRef.current) {
        await editorRef.current.isReady;
        editorRef.current.destroy();
        editorRef.current = null;
      }
    }
  }, []);
  const initEditor = () => {
    const editor = new EditorJS({
      minHeight: 0,
      holder: id,
      data: { blocks: [] },
      onReady: () => {
        console.log("Editor.js is ready to work!");
        editorRef.current = editor;
        // new DragDrop(editor);
        // new Undo({ editor });
        // if (editor.blocks.getBlocksCount() === 1) {
        //   initAction(editor);
        // }
      },
      onChange: async (api, event) => {
        //this will trigger when DOM including className changes
        let content = await editor.saver.save();
        console.log("onChange", content, api, event);
        // const newNoCodeForm = JSON.parse(JSON.stringify(noCodeForm));
        // newNoCodeForm.blocksDraft = content.blocks;
        // await persistNoCodeForm(newNoCodeForm);
        // mutateNoCodeForm(newNoCodeForm);
      },
      placeholder: "Let`s write an awesome story!",
      autofocus: autofocus,
      // defaultBlock: "paragraph",
      defaultBlock: "ratingQuestion",
      tools: {
        textQuestion: TextQuestion,
        ratingQuestion: RatingQuestion,
        header: {
          class: Header as unknown as ToolConstructable,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3],
            defaultLevel: 1,
          },
        },
        // emailQuestion: EmailQuestion,
        // multipleChoiceQuestion: MultipleChoiceQuestion,
        // numberQuestion: NumberQuestion,
        // phoneQuestion: PhoneQuestion,
        // websiteQuestion: WebsiteQuestion,
        // pageTransition: PageTransition,
        // paragraph: {
        //   class: Paragraph,
        //   inlineToolbar: true,
        //   config: {
        //     placeholder: "Start with your content or hit tab-key to insert block",
        //   },
        // },
      },
    });
  };
  return (
    <Fragment>
      <div id={id} />
    </Fragment>
  );
}
