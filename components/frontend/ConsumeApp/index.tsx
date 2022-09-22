import { useMemo, useState } from "react";
import { generateId } from "@/lib/utils";
import Loading from "@/components/layout/Loading";
import { BlockData } from "@/lib/types";
import { toast } from "react-toastify";
import clsx from "clsx";
import { Description, Button } from "@/components/modal/widgets";
import { SnoopForm, SnoopPage, SnoopElement } from "@/lib/snoopforms/react";
export default function ConsumeApp({ formId, blocks }: { formId: string; blocks: BlockData[] }) {
  console.log("RENDER ConsumeApp", formId, blocks);
  const [isCompleted, setIsCompleted] = useState(false);
  const pages = useMemo(() => {
    const allPages: Page[] = [];
    let cPage: Page = { id: generateId(10), blocks: [] };
    blocks.forEach((cBlock) => {
      cPage.blocks.push(cBlock);
      if (cBlock.type === "pageTransition") {
        //generate a new Page
        allPages.push(cPage);
        cPage = { id: generateId(10), blocks: [] };
      }
    });
    //TODO make it configurable
    //the last Page, add a Done Button by default
    if (cPage.blocks.length > 0) {
      cPage.blocks.push({ id: generateId(10), type: "pageTransition", data: { _component: { submitLabel: "DONE" } } });
      allPages.push(cPage);
    }
    return allPages;
  }, [blocks, formId]);

  const handleFormCompleted = () => {
    toast("Congratulations! You Have Finished the Form 🎉", { autoClose: 2000 });
    setIsCompleted(true);
    //TODO show results
  };
  const handleFormReset = () => {
    setIsCompleted(false);
  };
  if (!pages) return <Loading />;
  else {
    return (
      <div className={clsx("comsume-app", "w-full h-full px-5 py-[10vh] flex flex-col justify-center overflow-auto")}>
        {isCompleted ? (
          <>
            <div className="ml-[-8px] mt-[-24px] mb-4">
              <Description>
                <i>Your submissions have been saved.</i>
              </Description>
            </div>
            <div className="my-[12px] ml-[-8px] flex">
              <Button onClick={handleFormReset} width={120} theme="red">
                Try Again
              </Button>
            </div>
          </>
        ) : (
          <SnoopForm offline={false} formId={formId} onDone={handleFormCompleted}>
            {pages.map((page, _) => (
              <SnoopPage name={page.id} key={page.id}>
                {page.blocks.map((block, i) => (
                  <SnoopElement
                    key={block.id ?? i}
                    type={block.type}
                    id={block.id}
                    config={["paragraph", "header"].includes(block.type) ? block.data : block.data?._component}
                  />
                ))}
              </SnoopPage>
            ))}
          </SnoopForm>
        )}
      </div>
    );
  }
}
type Page = {
  id: string;
  blocks: BlockData[];
};
