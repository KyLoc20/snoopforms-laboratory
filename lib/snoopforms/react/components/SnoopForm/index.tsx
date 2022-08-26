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
 * handle Submissions Storing, actually PreSubmissions
 */
export const SubmissionContext = createContext({
  update: (pageIdx: number, payload: PreSubmissionData[]) => {
    console.log(pageIdx, payload);
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
   * Being called PreSubmissionData is because they are not yet given "submissionId" and "submissionSessionId"
   * They are kept updating whenever changes happen in the SnoopElements
   * They are stored here being ready to be Submitted anytime
   */
  const refAllPreSubmissions = useRef<Array<PreSubmissionData[]> | null>(null); //SubmissionContext
  /**
   * update whenever changes happen in the SnoopElements
   * @param pageIdx
   * @param payload
   */
  const updatePreSubmissions = (pageIdx: number, payload: PreSubmissionData[]) => {
    const prev = refAllPreSubmissions.current;
    if (prev !== null) {
      prev[pageIdx] = payload;
    } else {
      //init passively
      refAllPreSubmissions.current = [];
      refAllPreSubmissions.current[pageIdx] = payload;
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (pageName: string) => {
    if (refAllPreSubmissions.current !== null) {
      const allPreSubmissions = refAllPreSubmissions.current.filter(Boolean);
      console.log(`From Page ${pageName} onSubmit allPreSubmissions: `, allPreSubmissions);
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
        <CurrentPageContext.Provider value={{ currentPageIdx }}>
          <SubmitHandlerContext.Provider value={handleSubmit}>
            <section className={classNamesConcat("snoopforms-container", "max-w-lg", className)}>
              {children}
              {isSubmitting && <FullScreenLoading />}
            </section>
          </SubmitHandlerContext.Provider>
        </CurrentPageContext.Provider>
      </SubmissionContext.Provider>
    </SchemaContext.Provider>
  );
}
