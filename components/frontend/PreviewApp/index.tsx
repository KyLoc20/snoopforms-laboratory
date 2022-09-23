import { useState } from "react";
import Loading from "@/components/layout/Loading";
import { BlockData, SubmissionData } from "@/lib/types";
import { toast } from "react-toastify";
import { SnoopForm, SnoopPage, SnoopElement } from "@/lib/snoopforms/react";
import clsx from "clsx";
import { Description, Button } from "@/components/modal/widgets";
import usePages from "@/hooks/usePages";
import useSubmissionResults, { DownloadButton } from "@/hooks/useSubmissionResults";
import Link from "next/link";
export default function PreviewApp({ formId, blocks }: { formId: string; blocks: BlockData[] }) {
  const { pages } = usePages(blocks);

  const [isCompleted, setIsCompleted] = useState(false);
  const [localSubmissions, setLocalSubmissions] = useState<SubmissionData[]>([]);
  const [whenSubmit, setWhenSubmit] = useState<number | undefined>(undefined);
  const handleFormCompleted = (submissions: SubmissionData[], when: number) => {
    toast("You Have Finished the PREVIEW Form 🎉", { autoClose: 2000 });
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
          <CompletedView formId={formId} submissions={localSubmissions} whenSubmit={whenSubmit ?? 0} onReset={handleFormReset} />
        ) : (
          <>
            <div className="ml-[-8px] mt-[-24px] mb-4">
              <Description>
                <i>This is only a Preview.</i>
                <Link href={`/to/${formId}`}>
                  <a>
                    <i className="underline ml-1 cursor-pointer">Get your Published form here</i>
                  </a>
                </Link>
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
function CompletedView({
  formId,
  whenSubmit,
  submissions,
  onReset,
}: {
  formId: string;
  submissions: SubmissionData[];
  whenSubmit: number;
  onReset: () => void;
}) {
  const { SubmissionResults } = useSubmissionResults(formId, submissions);
  return (
    <>
      <div className="ml-[-8px] mt-[-24px] mb-4">
        <Description>
          <i>Submissions here will NOT be saved.</i>
        </Description>
      </div>
      <div className="my-[12px] ml-[-8px] flex">
        <Button onClick={onReset} width={120} theme="red">
          Try Again
        </Button>
        <DownloadButton formId={formId} whenSubmit={whenSubmit} submissions={submissions} />
      </div>
      <SubmissionResults />
    </>
  );
}
