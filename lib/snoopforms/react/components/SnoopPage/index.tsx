import { generateId } from "@/lib/utils";
import React, { createContext, FC, PropsWithChildren, useRef, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { CurrentPageContext, SubmitHandlerContext, RegistryContext } from "../SnoopForm";

export const PageContext = createContext(""); //pageName
//todo incorrectly hide
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
  const { pages: registeredPages, register, detach, hasPage, findPage } = useContext(RegistryContext);

  //register this Page
  useEffect(() => {
    register(pageName);
    return () => detach(pageName);
  }, [pageName]);
  // setInitializing(false) after finished registering
  useEffect(() => {
    if (initializing && hasPage(pageName)) setInitializing(false);
  }, [registeredPages]);

  const submitThisPage = useContext(SubmitHandlerContext);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitThisPage(pageName);
  };

  if (initializing) {
    return <div className="initializing-snooppage" />;
  } else if (thankyou) {
    return <PageContext.Provider value={pageName}>{currentPageIdx === findPage(pageName) && children}</PageContext.Provider>;
  } else {
    return (
      <PageContext.Provider value={pageName}>
        <form className={clsx("snoopform-page", currentPageIdx === findPage(pageName) ? "block" : "hidden", "space-y-6", className)} onSubmit={handleSubmit}>
          {children}
        </form>
      </PageContext.Provider>
    );
  }
}
