import { PropsWithChildren, useState } from "react";
import TemplateCard from "./TemplateCard";
import { CardGrid } from "@/components/layout";
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
const TEMPLATE_LIST: Template[] = [
  { id: "tell-us-about-yourself-template", name: "Tell Us About Yourself Template" },
  { id: "cake-order-template", name: "Cake Order Template" },
];
type Template = {
  id: string; //"cake-order-template"
  name: string; //"Cake Order Template"
};
