import { useState } from "react";
import { DocumentAddIcon, EyeIcon, PaperAirplaneIcon, ShareIcon, ChartBarIcon, InboxIcon, DocumentDuplicateIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import clsx from "clsx";
import styles from "./Navigation.module.css";
export type AvailableNav = "builder" | "preview" | "publish" | "share" | "responses" | "summary" | "example";
export function NavBar({ currentNav, formId = "__unknown", disabledAll }: { currentNav?: AvailableNav; formId?: string; disabledAll?: boolean }) {
  //todo disable NavBar if formId is "__unknown"
  const router = useRouter();
  return (
    <div className={clsx(styles.navigation, "flex items-center justify-center")} style={{ background: "#fafafb" }}>
      <nav className="flex space-x-10" aria-label="resultModes">
        <Navigation
          id="builder"
          label="Builder"
          icon={DocumentAddIcon}
          disabled={disabledAll}
          onClick={() => {
            router.push(`/forms/${formId}/builder`);
          }}
          active={currentNav === "builder"}
        ></Navigation>
        <Navigation
          id="preview"
          label="Preview"
          icon={EyeIcon}
          disabled={disabledAll}
          onClick={() => {
            router.push(`/forms/${formId}/preview`);
          }}
          active={currentNav === "preview"}
        ></Navigation>
        {/* <Navigation
          id="example"
          label="Example"
          icon={DocumentDuplicateIcon}
          onClick={() => {
            router.push(`/example`);
          }}
          active={currentNav === "example"}
        ></Navigation>
        <Navigation
          id="publish"
          label="Publish"
          icon={PaperAirplaneIcon}
          onClick={() => {
            //setCurrentNav("publish");
            //publishChanges()
          }}
          active={currentNav === "publish"}
          disabled
        ></Navigation>
        <Navigation
          id="share"
          label="Share"
          icon={ShareIcon}
          onClick={() => {
            //setCurrentNav("share");
          }}
          active={currentNav === "share"}
          disabled
        ></Navigation> */}
        <Navigation
          id="responses"
          label="Responses"
          icon={InboxIcon}
          disabled={disabledAll}
          onClick={() => {
            router.push(`/forms/${formId}/results/responses`);
          }}
          active={currentNav === "responses"}
        ></Navigation>
        <Navigation
          id="summary"
          label="Summary"
          icon={ChartBarIcon}
          disabled={disabledAll}
          onClick={() => {
            router.push(`/forms/${formId}/results/summary`);
          }}
          active={currentNav === "summary"}
        ></Navigation>
      </nav>
    </div>
  );
}
export function Navigation({
  id,
  label,
  icon: Icon,
  active,
  onClick,
  disabled,
}: {
  id: string;
  label: string;
  icon: React.ElementType<any>;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  const handleClick = disabled ? () => {} : onClick;
  return (
    <button
      className={clsx(
        `h-16 text-xs border-b-2 border-transparent`,
        disabled
          ? "text-ui-gray-medium cursor-default"
          : active
          ? "text-red border-b-2 border-red"
          : "hover:border-red text-ui-gray-dark hover:text-red bg-transparent"
      )}
      onClick={handleClick}
    >
      <Icon className="w-6 h-6 mx-auto mb-1 stroke-1" />
      {label}
    </button>
  );
}
