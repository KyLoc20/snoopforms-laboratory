import { useEffect, useState, PropsWithChildren } from "react";
import { useSubmissionSessions } from "@/lib/submissionSession";
import { SubmissionSessionData } from "@/lib/types";
import Loading from "@/components/layout/Loading";
import { toast } from "react-toastify";
import clsx from "clsx";
import styles from "./ResponseApp.module.css";
import { LightningBoltIcon, CubeIcon } from "@heroicons/react/outline";

export default function FlowAdminApp({}: PropsWithChildren<{}>) {
  const [tabs, setTabs] = useState<"flows" | "integrations">("flows");
  return (
    <section className={clsx("flow-admin-app-container", "relative flex flex-1")}>
      <aside className={clsx("navigation", "space-y-4 w-[300px] p-[30px] flex flex-col items-center")}>
        <NavigationItem onSelect={() => setTabs("flows")} active={tabs === "flows"}>
          <LightningBoltIcon className="w-5 h-5" />
          <span>Active Flows</span>
        </NavigationItem>
        <NavigationItem onSelect={() => setTabs("integrations")} active={tabs === "integrations"}>
          <CubeIcon className="w-5 h-5" />
          <span>Integration Hub</span>
        </NavigationItem>
      </aside>
      <main className={clsx("p-8 flex flex-col bg-white rounded-md shadow flex-grow h-[300px]")}>
        {tabs === "flows" && (
          <>
            <h1 className="text-gray-700 font-bold text-3xl mb-8">Active Flows</h1>
          </>
        )}
        {tabs === "integrations" && (
          <>
            <h1 className="text-gray-700 font-bold text-3xl mb-8">Integration Hub</h1>
          </>
        )}
      </main>
    </section>
  );
}
function NavigationItem({ children, onSelect, active }: PropsWithChildren<{ onSelect: () => void; active: boolean }>) {
  return (
    <div
      onClick={onSelect}
      className={clsx(
        "space-x-1 text-gray-700 flex relative w-[240px] h-[50px] p-4 leading-[20px] rounded-[6px] hover:bg-white hover:shadow cursor-pointer transition-all",
        active && "shadow bg-white before:bg-red before:w-[8px] before:rounded-l-[6px] before:absolute before:inset-0"
      )}
    >
      {children}
    </div>
  );
}
