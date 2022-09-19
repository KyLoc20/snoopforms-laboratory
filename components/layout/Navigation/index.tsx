import { useState, PropsWithChildren } from "react";
import { DocumentAddIcon, EyeIcon, PaperAirplaneIcon, ShareIcon, ChartBarIcon, InboxIcon, DocumentDuplicateIcon } from "@heroicons/react/outline";
import { useNavigation } from "@/lib/router";
import PublishCard from "@/components/modal/PublishCard";
import clsx from "clsx";
import styles from "./Navigation.module.css";
import useModalPortal from "@/lib/modal";
import FullScreenLoading from "../FullScreenLoading";
import { NoCodeFormData } from "@/lib/types";
import { useNoCodeForm, persistNoCodeForm } from "@/lib/noCodeForm";
import { toast } from "react-toastify";
export type AvailableNav = "builder" | "preview" | "publish" | "share" | "responses" | "summary" | "example";
export function NavBar({ currentNav, formId = "__unknown", disabledAll }: { currentNav?: AvailableNav; formId?: string; disabledAll?: boolean }) {
  //todo disable NavBar if formId is "__unknown"
  const { navigateTo } = useNavigation();

  //for PublishCard
  const [isPublishing, setIsPublishing] = useState(false);
  const shouldBeLoading = isPublishing;
  const { showModal, hideModal, Portal } = useModalPortal("new-form-modal");
  const { noCodeForm } = useNoCodeForm(formId);
  const handlePublishForm = () => {
    if (formId && formId !== "__unknown") {
      hideModal();
      setIsPublishing(true);
      //possible dangerous
      setTimeout(() => {
        const newNoCodeForm = JSON.parse(JSON.stringify(noCodeForm)) as NoCodeFormData;
        newNoCodeForm.blocks = noCodeForm.blocksDraft;
        console.log("handlePublishForm", newNoCodeForm);
        persistNoCodeForm(newNoCodeForm).then((res) => {
          setIsPublishing(false);
          toast("Successfully Published  🎉");
        });
      }, 1000);
    }
  };

  return (
    <>
      {shouldBeLoading && <FullScreenLoading />}
      <Portal>
        <PublishCard onDone={handlePublishForm} onCancel={hideModal} />
      </Portal>
      <div className={clsx(styles.navigation, "flex items-center justify-center")} style={{ background: "#fafafb" }}>
        <nav className="flex space-x-10" aria-label="Navigation">
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
          <Navigation id="publish" label="Publish" icon={PaperAirplaneIcon} onClick={showModal} active={currentNav === "publish"} />
          {/*  
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
              navigateTo(`/forms/${formId}/results/responses`);
            }}
            active={currentNav === "responses"}
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
      </div>
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
