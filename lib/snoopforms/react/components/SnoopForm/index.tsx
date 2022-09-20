import FingerprintJS, { Agent } from "@fingerprintjs/fingerprintjs";
import React, { createContext, FC, ReactNode, useEffect, useState, useRef, PropsWithChildren } from "react";
import { PreSubmissionData } from "../../questions";
import { SubmissionData, SubmissionSessionData } from "../../types";
import FullScreenLoading from "@/components/layout/FullScreenLoading";
import clsx from "clsx";
import { generateId } from "@/lib/utils";
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
  detach: (pageName: string) => void; //opposite to register
  hasPage: (pageName: string) => boolean;
  findPage: (pageName: string) => number; //index of pages
};
export const RegistryContext = createContext<RegistryState>({
  pages: [],
  register: (pageName: string) => console.log(pageName),
  detach: (pageName: string) => console.log(pageName),
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
  offline?: boolean; //if true, DO NOT submit
  domain?: string;
  formId?: string;
  protocol?: "http" | "https";
  localOnly?: boolean;
  className?: string;
  onSubmit?: (obj: onSubmitProps) => void;
  onDone?: (submissions: SubmissionData[]) => void;
}

export function SnoopForm(props: PropsWithChildren<SnoopFormProps>) {
  const { domain = "app.snoopforms.com", protocol = "https", localOnly = false, className = "", onSubmit = (): any => {}, onDone, children } = props;
  const isOffline = Boolean(props.offline);
  const formId = props.formId ?? "";
  const [schema, setSchema] = useState<any>({ pages: [] });
  const [hasDone, setHasDone] = useState(false);
  const refSessionId = useRef(generateId(10));

  /**
   * page register, this is an INITIAL work
   */
  const [pages, setPages] = useState<string[]>([]);
  const refDetachedPages = useRef<string[]>([]);
  // console.log("RENDER SnoopForm pages:", pages);
  useEffect(() => {
    const detachedPages = refDetachedPages.current;
    // console.log("Before Update pages, check detachedPages", detachedPages);
    if (detachedPages.length > 0) {
      setPages((prev) => prev.filter((pageName) => !detachedPages.includes(pageName)));
      refDetachedPages.current = [];
    }
  }, [pages]);
  const hasPage = (name: string) => pages.includes(name);
  const addPage = (name: string) => {
    if (!hasPage(name)) setPages((prev) => [...prev, name]);
  };
  const removePage = (name: string) => {
    refDetachedPages.current.push(name);
  };
  const findPage = (name: string) => pages.indexOf(name);

  /**
   * Being called PreSubmissionData is because they are not yet given "submissionId" and "submissionSessionId"
   * They are kept updating whenever changes happen in the SnoopElements
   * They are stored here being ready to be Submitted anytime
   * All PreSubmissions are stored UNORDERED in one List, the pagination is locally transparent to them
   */
  const refAllSubmissions = useRef<SubmissionData[] | null>(null); //SubmissionContext
  /**
   * update whenever changes happen in the SnoopElements
   * @param pageName
   * @param payload
   */
  const updateSubmissions = (pageName: string, payload: PreSubmissionData[]) => {
    // console.log("updatePreSubmissions STARTED", pageName, payload);
    const prev = refAllSubmissions.current;
    if (prev !== null) {
      const updatingIds = payload.map((o) => o.questionId);
      const updatingSubmissions = payload.map((preSubmission) => ({ ...preSubmission, id: generateId(10) }));
      refAllSubmissions.current = [...prev.filter((o) => !updatingIds.includes(o.questionId)), ...updatingSubmissions];
    } else {
      //init passively
      refAllSubmissions.current = payload.map((preSubmission) => ({ ...preSubmission, id: generateId(10) }));
    }
    // console.log("updateSubmissions FINISHED", refAllSubmissions.current);
  };

  const [currentPageIdx, setCurrentPageIdx] = useState(0); //CurrentPageContext
  const nextPage = () => {
    //check whether it is the last Page
    if (currentPageIdx >= pages.length - 1) {
      refSessionId.current = generateId(10);
      setHasDone(true);
      // setCurrentPageIdx(0);
      // forward AllSubmissions
      onDone?.(refAllSubmissions.current || []);
    } else setCurrentPageIdx((prev) => prev + 1);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (pageName: string) => {
    if (refAllSubmissions.current !== null) {
      console.log(`Session ${refSessionId.current} of Page ${pageName} handleSubmit:`, refAllSubmissions.current);
      if (isOffline) nextPage();
      else {
        setIsSubmitting(true);
        persistOneSubmissionSession(formId, { formId, id: refSessionId.current, createdAt: "", updatedAt: "", submissions: refAllSubmissions.current }).then(
          (res) => {
            setIsSubmitting(false);
            nextPage();
          }
        );
      }
    }
  };
  return (
    <SchemaContext.Provider value={{ schema, setSchema }}>
      <SubmissionContext.Provider value={{ update: updateSubmissions }}>
        <RegistryContext.Provider value={{ pages: pages, register: addPage, detach: removePage, hasPage, findPage }}>
          <CurrentPageContext.Provider value={{ currentPageIdx }}>
            <SubmitHandlerContext.Provider value={handleSubmit}>
              <section className={clsx("snoopform-container", "max-w-lg", className)}>
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

const persistOneSubmissionSession = (formId: string, payload: SubmissionSessionData) => {
  return fetch(`/api/forms/${formId}/submissionSessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};
