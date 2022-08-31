import { useMemo } from "react";
import { generateId } from "@/lib/utils";
import Loading from "@/components/layout/Loading";
import { BlockData } from "@/lib/types";
import Overlay from "@/components/layout/Overlay";
import { SnoopForm, SnoopPage, SnoopElement } from "@/lib/snoopforms/react";
type Page = {
  id: string;
  blocks: BlockData[];
};

export default function FormApp({ id, formId, blocks, localOnly }: { id: string; formId: string; blocks: BlockData[]; localOnly: boolean }) {
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
    if (cPage.blocks.length > 0) {
      cPage.blocks.push({ id: generateId(10), type: "pageTransition", data: { _component: { submitLabel: "Submit" } } });
      allPages.push(cPage);
    }

    return allPages;
  }, [blocks, formId]);

  if (!pages) return <Loading />;
  else {
    console.log("RENDER FormApp", pages);
    return (
      <div className="w-full px-5 py-5">
        <SnoopForm domain="app.snoopforms.com" protocol="http" formId="abcd">
          {pages.map((page, _) => (
            <SnoopPage name={page.id} key={page.id}>
              {page.blocks.map((block, i) => (
                <SnoopElement key={i} type={block.type} name="" text={block.data?.text} id={block.id} config={block.data?._component} />
              ))}
            </SnoopPage>
          ))}
        </SnoopForm>
      </div>
    );
  }
}
