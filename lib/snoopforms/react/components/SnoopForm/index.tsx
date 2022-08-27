import FingerprintJS, { Agent } from "@fingerprintjs/fingerprintjs";
import React, { createContext, FC, ReactNode, useEffect, useState, useRef, PropsWithChildren } from "react";
import { classNamesConcat } from "../../lib/utils";
import { PreSubmissionData } from "../../questions";
import { BlockData } from "@/lib/types";
import FullScreenLoading from "@/components/layout/FullScreenLoading";
/**
 * handle the layout and content of Page
 */
export const SchemaContext = createContext({
  schema: { pages: [] },
  setSchema: (schema: any) => {
    console.log(schema);
  },
});

/**
 * handle a list of pageName
 */
type RegistryState = {
  pages: string[];
  register: (pageName: string) => void;
  hasPage: (pageName: string) => boolean;
  findPage: (pageName: string) => number; //index of pages
};
export const RegistryContext = createContext<RegistryState>({
  pages: [],
  register: (pageName: string) => console.log(pageName),
  hasPage: (pageName: string) => true,
  findPage: (pageName: string) => -1,
});

/**
 * handle Submissions Storing, actually PreSubmissions
 */
export const SubmissionContext = createContext({
  update: (pageName: string, payload: PreSubmissionData[]) => {
    console.log(pageName, payload);
  },
});

/**
 * handle which Page to display
 */
export const CurrentPageContext = createContext({
  currentPageIdx: 0,
  // setCurrentPageIdx: (currentPageIdx: number) => {
  //   console.log(currentPageIdx);
  // },
});

/**
 * handle Page submit action
 */
export const SubmitHandlerContext = createContext((pageName: string) => {
  console.log(pageName);
});

interface onSubmitProps {
  submission: any;
  schema: any;
}

interface SnoopFormProps {
  domain?: string;
  formId?: string;
  protocol?: "http" | "https";
  localOnly?: boolean;
  className?: string;
  onSubmit?: (obj: onSubmitProps) => void;
}

export function SnoopForm(props: PropsWithChildren<SnoopFormProps>) {
  const { domain = "app.snoopforms.com", formId, protocol = "https", localOnly = false, className = "", onSubmit = (): any => {}, children } = props;
  const [schema, setSchema] = useState<any>({ pages: [] });

  const nextPage = () => setCurrentPageIdx((prev) => prev + 1);
  const [currentPageIdx, setCurrentPageIdx] = useState(0); //CurrentPageContext

  /**
   * page register
   */
  const [pages, setPages] = useState<string[]>([]);
  const hasPage = (name: string) => pages.includes(name);
  const addPage = (name: string) => {
    if (!hasPage(name)) setPages((prev) => [...prev, name]);
  };
  const findPage = (name: string) => pages.indexOf(name);
  /**
   * Being called PreSubmissionData is because they are not yet given "submissionId" and "submissionSessionId"
   * They are kept updating whenever changes happen in the SnoopElements
   * They are stored here being ready to be Submitted anytime
   * All PreSubmissions are stored UNORDERED in one List, the pagination is locally transparent to them
   */
  const refAllPreSubmissions = useRef<PreSubmissionData[] | null>(null); //SubmissionContext
  /**
   * update whenever changes happen in the SnoopElements
   * @param pageName
   * @param payload
   */
  const updatePreSubmissions = (pageName: string, payload: PreSubmissionData[]) => {
    console.log("updatePreSubmissions STARTED", pageName, payload);
    const prev = refAllPreSubmissions.current;
    if (prev !== null) {
      const updatingIds = payload.map((o) => o.questionId);
      refAllPreSubmissions.current = [...prev.filter((o) => !updatingIds.includes(o.questionId)), ...payload];
    } else {
      //init passively
      refAllPreSubmissions.current = [...payload];
    }
    console.log("updatePreSubmissions FINISHED", refAllPreSubmissions.current);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (pageName: string) => {
    if (refAllPreSubmissions.current !== null) {
      //todo PreSubmissions -> Submissions
      //todo update the whole SubmissioSession
      console.log(`From Page ${pageName} onSubmit submissionsOfPage: `, refAllPreSubmissions.current);
      setIsSubmitting(true);
      setTimeout(() => {
        //when finished
        setIsSubmitting(false);
        nextPage();
      }, 3000);
    }
  };
  return (
    <SchemaContext.Provider value={{ schema, setSchema }}>
      <SubmissionContext.Provider value={{ update: updatePreSubmissions }}>
        <RegistryContext.Provider value={{ pages: pages, register: addPage, hasPage, findPage }}>
          <CurrentPageContext.Provider value={{ currentPageIdx }}>
            <SubmitHandlerContext.Provider value={handleSubmit}>
              <section className={classNamesConcat("snoopform-container", "max-w-lg", className)}>
                {children}
                {isSubmitting && <FullScreenLoading />}
              </section>
            </SubmitHandlerContext.Provider>
          </CurrentPageContext.Provider>
        </RegistryContext.Provider>
      </SubmissionContext.Provider>
    </SchemaContext.Provider>
  );
}
