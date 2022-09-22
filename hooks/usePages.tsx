import { useMemo, useState } from "react";
import { generateId } from "@/lib/utils";
import { BlockData } from "@/lib/types";
export default function usePages(blocks: BlockData[]) {
  const pages = useMemo(() => {
    const allPages: Page[] = [];
    let cPage: Page = { id: generateId(10), blocks: [] };
    blocks.forEach((block) => {
      cPage.blocks.push(block);
      if (block.type === "pageTransition") {
        //generate a new Page
        allPages.push(cPage);
        cPage = { id: generateId(10), blocks: [] };
      }
    });
    //TODO make it configurable
    //the last Page, add a Done Button by default
    if (cPage.blocks.length > 0) {
      cPage.blocks.push({ id: generateId(10), type: "pageTransition", data: { _component: { submitLabel: "Done" } } });
      allPages.push(cPage);
    }
    return allPages;
  }, [blocks]);
  return { pages };
}
export type Page = {
  id: string;
  blocks: BlockData[];
};
