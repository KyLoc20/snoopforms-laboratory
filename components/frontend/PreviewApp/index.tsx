import { useState } from "react";
import Loading from "@/components/layout/Loading";
import { BlockData } from "@/lib/types";
import { toast } from "react-toastify";
import { SnoopForm, SnoopPage, SnoopElement, SubmissionData } from "@/lib/snoopforms/react";
import { SubmissionPage, getQuestionTitleMap } from "../ResponseApp/SessionDetails";
import clsx from "clsx";
import { Description, Button } from "@/components/modal/widgets";
import DownloadButton from "./DownloadButton";
import usePages from "@/hooks/usePages";
export default function PreviewApp({ formId, blocks }: { formId: string; blocks: BlockData[] }) {
  console.log("RENDER PreviewApp", formId, blocks);
  const id2Title = getQuestionTitleMap(blocks);
  const [isCompleted, setIsCompleted] = useState(false);
  const [localSubmissions, setLocalSubmissions] = useState<SubmissionData[]>([]);
  const [whenSubmit, setWhenSubmit] = useState<number | undefined>(undefined);
  const { pages } = usePages(blocks);

  const handleFormCompleted = (submissions: SubmissionData[], when: number) => {
    toast("Congratulations! You Have Finished the PREVIEW Form 🎉", { autoClose: 2000 });
    setIsCompleted(true);
    setLocalSubmissions(submissions);
    setWhenSubmit(when);
    console.log("handleFormCompleted", submissions);
  };
  const handleFormReset = () => {
    setIsCompleted(false);
    setLocalSubmissions([]);
  };

  if (!pages) return <Loading />;
  else {
    return (
      <div className={clsx("preview-app", "w-full h-full px-5 py-5 mb-[10vh]")}>
        {isCompleted ? (
          <>
            <div className="ml-[-8px] mt-[-24px] mb-4">
              <Description>
                <i>Submissions here will NOT be saved.</i>
              </Description>
            </div>
            <div className="my-[12px] ml-[-8px] flex">
              <Button onClick={handleFormReset} width={120} theme="red">
                Try Again
              </Button>
              <DownloadButton formId={formId} whenSubmit={whenSubmit ?? 0} submissions={localSubmissions} />
            </div>
            <ul role="list" className={clsx("submission-list", "divide-y divide-ui-gray-light")}>
              <SubmissionPage submissions={localSubmissions} titleMap={id2Title} />
            </ul>
          </>
        ) : (
          <>
            <div className="ml-[-8px] mt-[-24px] mb-4">
              <Description>
                <i>This is only a Preview.</i>
              </Description>
            </div>
            <SnoopForm offline={true} formId={formId} onDone={handleFormCompleted}>
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
          </>
        )}
        <div className={clsx("block-placeholder-incase-overflow", "w-full h-[48px]")}></div>
      </div>
    );
  }
}
type Page = {
  id: string;
  blocks: BlockData[];
};
