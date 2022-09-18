import { PropsWithChildren, useState } from "react";
import TemplateCard from "./TemplateCard";
import { CardGrid } from "@/components/layout";
import { TEMPLATE_LIST } from "@/lib/template";
export default function TemplateListApp({}) {
  return (
    <>
      <CardGrid>
        {TEMPLATE_LIST.map((template, i) => (
          <CardWrapper key={template.id}>
            <TemplateCard name={template.name} id={template.id} />
          </CardWrapper>
        ))}
      </CardGrid>
    </>
  );
}

function CardWrapper({ children }: PropsWithChildren<{}>) {
  return <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>{children}</div>;
}
