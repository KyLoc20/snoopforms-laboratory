import { generateId } from "@/lib/utils";
import React, { createContext, FC, PropsWithChildren, useRef, useContext, useEffect, useState } from "react";
import { classNamesConcat } from "../../lib/utils";
import { CurrentPageContext, SchemaContext, SubmitHandlerContext } from "../SnoopForm";

export const PageContext = createContext(""); //pageName

interface SnoopPageProps {
  name: string;
  className?: string;
  thankyou?: boolean;
}
/**
 * init pages: inject pageName to schema
 * @param props
 * @returns
 */
export function SnoopPage(props: PropsWithChildren<SnoopPageProps>) {
  const { name: _name, className, children, thankyou = false } = props;

  const [pageName, _] = useState(_name || generateId(10));
  const [initializing, setInitializing] = useState(true);
  const { currentPageIdx } = useContext(CurrentPageContext);
  const { schema, setSchema } = useContext<any>(SchemaContext);
  console.log("RENDER SnoopPage", initializing);
  //register this Page into schema.pages
  useEffect(() => {
    setSchema((schema: any) => {
      const newSchema = { ...schema };
      let pageIdx = newSchema.pages.findIndex((p: any) => p.name === pageName);
      console.log("register", schema, pageName);
      if (pageIdx !== -1) {
        console.warn(`🦝 SnoopForms: Page with the name "${pageName}" already exists`);
        return newSchema;
      } else {
        newSchema.pages.push({
          name: pageName,
          type: thankyou ? "thankyou" : "form",
          elements: [],
        });
        return newSchema;
      }
    });
  }, [pageName]);

  const _handleSubmit = useContext(SubmitHandlerContext);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    _handleSubmit(pageName);
  };

  // setInitializing(false) after finished registering
  useEffect(() => {
    if (initializing) {
      let pageIdx = schema.pages.findIndex((p: any) => p.name === pageName);
      console.log("initializing", schema, pageName, pageIdx);
      if (pageIdx !== -1) {
        setInitializing(false);
      }
    }
  }, [schema]);

  if (initializing) {
    return <div className="initializing-snooppage" />;
  } else if (thankyou) {
    return (
      <PageContext.Provider value={pageName}>{currentPageIdx === schema.pages.findIndex((p: any) => p.name === pageName) && children}</PageContext.Provider>
    );
  } else {
    return (
      <PageContext.Provider value={pageName}>
        <form
          className={classNamesConcat(currentPageIdx === schema.pages.findIndex((p: any) => p.name === pageName) ? "block" : "hidden", "space-y-6", className)}
          onSubmit={handleSubmit}
        >
          {children}
        </form>
      </PageContext.Provider>
    );
  }
}
