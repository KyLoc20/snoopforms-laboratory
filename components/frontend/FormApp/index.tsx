import { useMemo, useRef, useState } from "react";
import { generateId } from "@/lib/utils";
import Loading from "@/components/layout/Loading";
import { TailSpin } from "react-loader-spinner";
import { BlockData, SubmissionData } from "@/lib/types";
import { createQuestionElement, PreSubmissionData } from "@/lib/snoopforms/react/questions";
import { Button } from "@/lib/snoopforms/react/questions/toolkit/ui";
import { persistOneSubmissionSession } from "@/lib/submissionSession";
import { useRouter } from "next/router";
import Overlay from "@/components/layout/Overlay";

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
    //todo
    for (const block of blocks) {
      if (block.type !== "pageTransition" || true) {
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

  //some of them are not from a Question Block
  const refAllBlockSubmissions = useRef<PreSubmissionData[] | null>(null);
  const handleUpdateSubmission = (index: number, data: PreSubmissionData) => {
    const prev = refAllBlockSubmissions.current;
    if (prev !== null) {
      prev[index] = data;
    } else {
      refAllBlockSubmissions.current = [];
      refAllBlockSubmissions.current[index] = data;
    }
    console.log("handleUpdateSubmission", refAllBlockSubmissions.current);
  };

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!pages) return <Loading />;
  else {
    console.log(
      "RENDER FormApp",
      pages[0].blocks.map((n, i) => n.data)
    );

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (refAllBlockSubmissions.current !== null) {
        const allPreSubmissions = refAllBlockSubmissions.current.filter(Boolean);
        console.log("UserForm onSubmit allPreSubmissions: ", allPreSubmissions);
        setIsSubmitting(true);
        persistOneSubmissionSession(formId, {
          formId,
          id: generateId(10),
          submissions: allPreSubmissions.map((item, _) => ({ ...item, id: generateId(10) } as SubmissionData)),
          createdAt: "",
          updatedAt: "",
        }).then((res) => {
          console.log("onSubmit all uploads finished", res);
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
            .map((block) => createQuestionElement(block.type, block))
            .map((Element, index) => (
              <Element
                key={index}
                onSubmissionChange={(preData) => {
                  // console.log("Element onSubmissionChange: ", data);
                  handleUpdateSubmission(index, preData);
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
