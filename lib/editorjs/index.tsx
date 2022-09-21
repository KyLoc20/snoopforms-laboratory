import EditorJS, { ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import DragDrop from "editorjs-drag-drop";
import { Fragment, MutableRefObject, useEffect } from "react";
import { RatingQuestionBlockTool } from "@/lib/snoopforms/react/questions/RatingQuestion";
import { TextQuestionBlockTool } from "@/lib/snoopforms/react/questions/TextQuestion";
import { EmailQuestionBlockTool } from "@/lib/snoopforms/react/questions/EmailQuestion";
import { MultipleChoiceQuestionBlockTool } from "@/lib/snoopforms/react/questions/MultipleChoiceQuestion";
import { NetPromoterScoreQuestionBlockTool } from "@/lib/snoopforms/react/questions/NetPromoterScoreQuestion";
import { PageTransitionBlockTool } from "@/lib/snoopforms/react/questions/PageTransition";
import { useNoCodeForm, persistNoCodeForm } from "@/lib/noCodeForm";
// import { toast } from "react-toastify";
/**
 * @QUESTION_SETTING
 */
const EDITOR_ID = "snoopforms-editor";
const AUTOFOCUS = true;
export default function SnoopFormsEditor({ editorRef, formId }: EditorProps) {
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
      holder: EDITOR_ID,
      data: { blocks: noCodeForm.blocksDraft },
      onReady: () => {
        // console.log("Editor.js is ready to work!", editor.blocks.getBlocksCount());
        editorRef.current = editor;
        new DragDrop(editor);
        if (editor.blocks.getBlocksCount() === 1) initDefaultBlocks(editor);
      },
      onChange: async (api, event) => {
        //console.log("BUILDER start to save");
        const ts = Date.now();
        //this will trigger when DOM including className changes
        let content = await editor.saver.save();
        //TODO diff
        const newNoCodeForm = JSON.parse(JSON.stringify(noCodeForm));
        //TODO parse content.blocks(EditorJS's Block type) to BlockData(Snoopforms' Block type)
        newNoCodeForm.blocksDraft = content.blocks;
        await persistNoCodeForm(newNoCodeForm);
        mutateNoCodeForm(newNoCodeForm);
        console.log("BUILDER Updating timecost: ", Date.now() - ts);
      },
      placeholder: "Let`s create an awesome form!",
      autofocus: AUTOFOCUS,
      defaultBlock: "paragraph",
      tools: {
        textQuestion: TextQuestionBlockTool,
        emailQuestion: EmailQuestionBlockTool,
        ratingQuestion: RatingQuestionBlockTool,
        multipleChoiceQuestion: MultipleChoiceQuestionBlockTool,
        netPromoterScoreQuestion: NetPromoterScoreQuestionBlockTool,
        pageTransition: PageTransitionBlockTool,
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
      <div id={EDITOR_ID} />
    </Fragment>
  );
}
type EditorProps = {
  formId: string;
  editorRef: MutableRefObject<EditorJS | null>;
};
const initDefaultBlocks = (editor: EditorJS) => {
  editor.blocks.insert("header", {
    text: "Welcome",
  });
  const focusBlock = editor.blocks.insert("ratingQuestion");
  editor.blocks.insert("header", {
    text: "Thank you",
  });
  editor.blocks.insert("paragraph", {
    text: "Thanks a lot for your time and insights 🙏",
  });
  editor.blocks.delete(0); // remove defaultBlock
  editor.caret.setToBlock(editor.blocks.getBlockIndex(focusBlock.id));
};
