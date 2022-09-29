import { useState, PropsWithChildren } from "react";
import {
  DocumentAddIcon,
  EyeIcon,
  PaperAirplaneIcon,
  ShareIcon,
  ChartBarIcon,
  InboxIcon,
  DocumentDuplicateIcon,
  AdjustmentsIcon,
} from "@heroicons/react/outline";
import { useNavigation } from "@/lib/router";
import PublishShareCard from "@/components/modal/PublishShareCard";
import clsx from "clsx";
import styles from "./Navigation.module.css";
import useModalPortal from "@/lib/modal";
import FullScreenLoading from "../FullScreenLoading";
export type AvailableNav = "builder" | "preview" | "publish" | "share" | "responses" | "summary" | "example" | "flows";
export function NavBar({ currentNav, formId = "__unknown", disabledAll }: { currentNav?: AvailableNav; formId?: string; disabledAll?: boolean }) {
  //todo disable NavBar if formId is "__unknown"
  const { navigateTo } = useNavigation();
  const { showModal: showPublishModal, hideModal: hidePublishModal, Portal: PublishPortal } = useModalPortal("global-modal-container");
  const { showModal: showShareModal, hideModal: hideShareModal, Portal: SharePortal } = useModalPortal("global-modal-container");
  const shouldBeLoading = false;
  const handleDone = () => {};
  return (
    <>
      {shouldBeLoading && <FullScreenLoading />}
      <PublishPortal>
        <PublishShareCard onDone={handleDone} onCancel={hidePublishModal} formId={formId} />
      </PublishPortal>
      <SharePortal>
        <PublishShareCard fromShare onDone={handleDone} onCancel={hideShareModal} formId={formId} />
      </SharePortal>
      <nav className={clsx(styles.navigation, "flex min-h-[64px] w-full bg-[#fafafb]")} aria-label="Navigation">
        <Navigation
          id="builder"
          label="Builder"
          icon={DocumentAddIcon}
          disabled={disabledAll}
          onClick={() => {
            navigateTo(`/forms/${formId}/builder`);
          }}
          active={currentNav === "builder"}
        />
        <Navigation
          id="preview"
          label="Preview"
          icon={EyeIcon}
          disabled={disabledAll}
          onClick={() => {
            navigateTo(`/forms/${formId}/preview`);
          }}
          active={currentNav === "preview"}
        />
        <Navigation id="publish" label="Publish" icon={PaperAirplaneIcon} disabled={disabledAll} onClick={showPublishModal} active={currentNav === "publish"} />
        <Navigation id="share" label="Share" icon={ShareIcon} disabled={disabledAll} onClick={showShareModal} active={currentNav === "share"} />
        <Navigation
          id="responses"
          label="Responses"
          icon={InboxIcon}
          disabled={disabledAll}
          onClick={() => {
            navigateTo(`/forms/${formId}/results/responses`);
          }}
          active={currentNav === "responses"}
        />
        <Navigation
          id="flows"
          label="Flows"
          icon={AdjustmentsIcon}
          disabled={disabledAll}
          onClick={() => {
            navigateTo(`/flows/${formId}`);
          }}
          active={currentNav === "flows"}
        />
        <Navigation
          id="summary"
          label="Summary"
          icon={ChartBarIcon}
          disabled={disabledAll}
          onClick={() => {
            navigateTo(`/forms/${formId}/results/summary`);
          }}
          active={currentNav === "summary"}
        />
      </nav>
    </>
  );
}
export function NavigationWrapper({ children }: PropsWithChildren<{}>) {
  return (
    <div className={clsx(styles.navigation, "flex items-center justify-center")} style={{ background: "#fafafb" }}>
      <nav className="flex space-x-10" aria-label="Navigation">
        {children}
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
        `min-w-[65px] h-16 text-xs border-b-2 border-transparent select-none`,
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
