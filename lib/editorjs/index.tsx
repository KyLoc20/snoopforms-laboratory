import EditorJS, { ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import DragDrop from "editorjs-drag-drop";
// @ts-ignore
import Undo from "editorjs-undo";
import { Fragment, MutableRefObject, useCallback, useEffect } from "react";
import { RatingQuestionBlockTool } from "@/lib/snoopforms/react/questions/RatingQuestion";
import { TextQuestionBlockTool } from "@/lib/snoopforms/react/questions/TextQuestion";
import { PageTransitionBlockTool } from "@/lib/snoopforms/react/questions/PageTransition";
import { useNoCodeForm, persistNoCodeForm } from "@/lib/noCodeForm";

// import { toast } from "react-toastify";
// import Loading from "../Loading";
// import EmailQuestion from "./tools/EmailQuestion";
// import PageTransition from "./tools/PageTransition";
// import MultipleChoiceQuestion from "./tools/MultipleChoiceQuestion";
// import WebsiteQuestion from "./tools/WebsiteQuestion";
// import PhoneQuestion from "./tools/PhoneQuestion";
// import NumberQuestion from "./tools/NumberQuestion";
interface EditorProps {
  id: string;
  autofocus: boolean;
  editorRef: MutableRefObject<EditorJS | null>; //{ current: EditorJS | null }; //RefObject<EditorJS>;
  formId: string;
  initAction?: (editor: EditorJS) => void;
}
export default function SnoopFormsEditor({ id, autofocus = false, editorRef, formId, initAction }: EditorProps) {
  const { noCodeForm, isLoading, mutateNoCodeForm } = useNoCodeForm(formId);
  useEffect(() => {
    if (!isLoading && !editorRef.current) {
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
  }, [isLoading]);
  const initEditor = () => {
    const editor = new EditorJS({
      minHeight: 0,
      holder: id,
      data: { blocks: noCodeForm.blocksDraft },
      onReady: () => {
        // console.log("Editor.js is ready to work!", editor.blocks.getBlocksCount());
        editorRef.current = editor;
        new DragDrop(editor);
        new Undo({ editor });
        /**
         * Init Blocks by default
         */
        if (editor.blocks.getBlocksCount() === 1) {
          // initAction(editor); //Init Blocks here, not callback to Builder
          editor.blocks.insert("header", {
            text: "Welcome",
          });
          const focusBlock = editor.blocks.insert("ratingQuestion");
          // editor.blocks.insert("pageTransition", {
          //   submitLabel: "Submit",
          // });
          editor.blocks.insert("header", {
            text: "Thank you",
          });
          editor.blocks.insert("paragraph", {
            text: "Thanks a lot for your time and insights 🙏",
          });
          editor.blocks.delete(0); // remove defaultBlock
          editor.caret.setToBlock(editor.blocks.getBlockIndex(focusBlock.id));
        }
      },
      onChange: async (api, event) => {
        //this will trigger when DOM including className changes
        let content = await editor.saver.save();
        // console.log("-> SnoopFormsEditor got some updates:", content);
        //todo diff
        const newNoCodeForm = JSON.parse(JSON.stringify(noCodeForm));
        //todo parse content.blocks(EditorJS's Block type) to BlockData(Snoopforms' Block type)
        newNoCodeForm.blocksDraft = content.blocks;
        await persistNoCodeForm(newNoCodeForm);
        mutateNoCodeForm(newNoCodeForm);
      },
      placeholder: "Let`s create an awesome form!",
      autofocus: autofocus,
      defaultBlock: "paragraph",
      tools: {
        textQuestion: TextQuestionBlockTool,
        ratingQuestion: RatingQuestionBlockTool,
        pageTransition: PageTransitionBlockTool,
        // emailQuestion: EmailQuestion,
        // multipleChoiceQuestion: MultipleChoiceQuestion,
        // numberQuestion: NumberQuestion,
        // phoneQuestion: PhoneQuestion,
        // websiteQuestion: WebsiteQuestion,
        // pageTransition: PageTransition,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            placeholder: "Start with your content or hit tab-key to insert block",
          },
        },
        header: {
          class: Header as unknown as ToolConstructable,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3],
            defaultLevel: 1,
          },
        },
      },
    });
  };
  return (
    <Fragment>
      <div id={id} />
    </Fragment>
  );
}
function parse() {}
