import { useEffect, useState, PropsWithChildren } from "react";
import { toast } from "react-toastify";
import clsx from "clsx";
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
            <WorkFlow>
              <Node label={"Form"} />
              <Edge />
              <Node label={"Discord"} />
            </WorkFlow>

            {/* <WorkFlow>
              <Node label={"Form"} />
              <Node label={"Discord"} />
            </WorkFlow> */}
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
function WorkFlow({ children }: PropsWithChildren<{}>) {
  return <div className="flex">{children}</div>;
}
function Node({ children, label }: PropsWithChildren<{ label: string }>) {
  return <div className={clsx("flex rounded-[6px] px-6 py-2 border-2 border-solid border-red cursor-pointer select-none")}>{label}</div>;
}
function Edge({}: PropsWithChildren<{}>) {
  return <div className={clsx("border-t-2 border-dotted border-gray w-[80px] h-[2px] my-auto")}></div>;
}
