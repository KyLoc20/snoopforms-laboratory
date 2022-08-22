import { SnoopForm, SnoopPage } from "@snoopforms/react";
import { useMemo, useRef, useState } from "react";
import { generateId } from "@/lib/utils";
import Loading from "@/components/layout/Loading";
import { TailSpin } from "react-loader-spinner";
import { BlockData } from "@/lib/types";
import { createFormElement } from "../factory";
import { Button } from "@/lib/snoopforms/react/questions/toolkit/ui";
import { useSubmissions, persistOneSubmission } from "@/lib/submission";
import { useRouter } from "next/router";
export default function FormApp({ id, formId, blocks, localOnly }: { id: string; formId: string; blocks: BlockData[]; localOnly: boolean }) {
  const pages = useMemo(() => {
    const pages = [];
    let currentPage: {
      id: string;
      blocks: BlockData[];
    } = {
      id: formId, // give the first page the formId as id by default
      blocks: [],
    };
    for (const block of blocks) {
      if (block.type !== "pageTransition") {
        currentPage.blocks.push(block);
      } else {
        currentPage.blocks.push({
          id: generateId(10),
          data: {
            label: block.data.submitLabel,
          },
          type: "submitButton",
        });
        pages.push(currentPage);
        currentPage = {
          id: block.id,
          blocks: [],
        };
      }
    }
    pages.push(currentPage);
    return pages;
  }, [blocks, formId]);

  const refAllSubmissions = useRef<any[] | null>(null);
  const handleUpdateSubmission = (index: number, data: any) => {
    const prev = refAllSubmissions.current;
    if (prev !== null) {
      prev[index] = data;
    } else {
      refAllSubmissions.current = [];
      refAllSubmissions.current[index] = data;
    }
    console.log("handleUpdateSubmission", refAllSubmissions.current);
  };

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!pages) return <Loading />;
  else {
    console.log(
      "RENDER FormApp",
      pages[0].blocks.map((n, i) => n.data)
    );
    // return (
    //   <div className="w-full px-5 py-5">
    //     <SnoopForm
    //       key={id} // used to reset form
    //       domain={window.location.host}
    //       protocol={window.location.protocol === "http:" ? "http" : "https"}
    //       formId={formId}
    //       localOnly={localOnly}
    //       className="w-full max-w-3xl mx-auto space-y-6"
    //     >
    //       {pages.map((page, pageIdx) => (
    //         <SnoopPage key={page.id} name={page.id} thankyou={pageIdx === pages.length - 1}>
    //           {page.blocks
    //             .map((block) => createFormElement(block.type, block))
    //             .map((Element, index) => (
    //               <Element key={index}></Element>
    //             ))}
    //         </SnoopPage>
    //       ))}
    //     </SnoopForm>
    //   </div>
    // );
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("UserForm onSubmit", refAllSubmissions.current);

      const allSubmissions = refAllSubmissions.current;
      if (allSubmissions !== null) {
        setIsSubmitting(true);
        const uploads: Promise<void>[] = [];
        allSubmissions.forEach((item, index) => {
          if (item?.questionId && item?.type === "ratingQuestion") {
            const { questionId, ratings } = item;
            const p = persistOneSubmission("thisisatest-form", {
              id: generateId(10),
              questionId: questionId as string,
              questionType: "ratingQuestion",
              details: { ratings },
            });
            uploads.push(p);
          }
        });
        Promise.allSettled(uploads).then((results) => {
          results.forEach((result) => console.log(result.status));
          console.log("onSubmit all uploads finished");
          setTimeout(() => {
            router.push("/results/responses");
            setIsSubmitting(false);
          }, 1500);
        });
      }
    };
    return (
      <div className="w-full px-5 py-5">
        <form onSubmit={onSubmit}>
          {pages[0].blocks
            .map((block) => createFormElement(block.type, block))
            .map((Element, index) => (
              <Element
                key={index}
                onSubmissionChange={(data) => {
                  // console.log("Element onSubmissionChange: ", data);
                  handleUpdateSubmission(index, data);
                }}
              ></Element>
            ))}
          <div style={{ marginTop: "24px" }}>
            <Button variant="contained" submittable>
              Submit
            </Button>
          </div>
        </form>
        {isSubmitting && (
          <Overlay>
            <TailSpin color="#1f2937" height={30} width={30} />
          </Overlay>
        )}
      </div>
    );
  }
}

import { PropsWithChildren } from "react";
function Overlay({ children }: PropsWithChildren<{}>) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center" style={{ background: "rgba(98,125,149,0.75)" }}>
      {children}
    </div>
  );
}
