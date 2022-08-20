import { SnoopForm, SnoopPage } from "@snoopforms/react";
import { useMemo } from "react";
import { generateId } from "@/lib/utils";
import { TailSpin } from "react-loader-spinner";
import { BlockData } from "@/lib/types";
import { createFormElement } from "../factory";
import { Button } from "@/lib/snoopforms/react/questions/toolkit/ui";
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
      console.log("onSubmit");
      // const el = e.currentTarget.elements.namedItem("validator") as RadioNodeList;
      // console.log("onSubmit", (el[0] as HTMLInputElement).checkValidity());
      e.preventDefault();
    };
    return (
      <div className="w-full px-5 py-5">
        <form onSubmit={onSubmit}>
          {pages[0].blocks
            .map((block) => createFormElement(block.type, block))
            .map((Element, index) => (
              <Element key={index}></Element>
            ))}
          <div style={{ marginTop: "24px" }}>
            {" "}
            <Button variant="contained" submittable>
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

function Loading() {
  return (
    <div className="min-h-screen px-4 py-16 bg-white sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main>
          <div className="flex justify-center">
            <TailSpin color="#1f2937" height={30} width={30} />
          </div>
          <p className="mt-5 text-sm text-ui-gray-dark">Loading...</p>
        </main>
      </div>
    </div>
  );
}
