import { useState } from "react";
import { DocumentAddIcon, EyeIcon, PaperAirplaneIcon, ShareIcon, ChartBarIcon, InboxIcon } from "@heroicons/react/outline";
import { classNames } from "@/lib/utils";
import { useRouter } from "next/router";
type AvailableNav = "addPage" | "preview" | "publish" | "share" | "responses" | "summary";
export function NavBar({ currentNav }: { currentNav: AvailableNav }) {
  // const [currentNav, setCurrentNav] = useState<>("addPage");
  const router = useRouter();
  return (
    <div className="flex items-center justify-center flex-shrink-0 border-b border-ui-gray-light bg-ui-gray-lighter">
      <nav className="flex space-x-10" aria-label="resultModes">
        <Navigation
          id="addPage"
          label="Page"
          icon={DocumentAddIcon}
          onClick={() => {
            router.push(`/`);
            //addPage()
          }}
          active={currentNav === "addPage"}
        ></Navigation>
        <Navigation
          id="preview"
          label="Preview"
          icon={EyeIcon}
          onClick={() => {
            router.push(`/preview`);
            //addPage()
          }}
          active={currentNav === "preview"}
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
            //addPage()
          }}
          active={currentNav === "share"}
          disabled
        ></Navigation>
        <Navigation
          id="responses"
          label="Responses"
          icon={InboxIcon}
          onClick={() => {
            router.push(`/results/responses`);
          }}
          active={currentNav === "responses"}
        ></Navigation>
        <Navigation
          id="summary"
          label="Summary"
          icon={ChartBarIcon}
          onClick={() => {
            router.push(`/results/summary`);
            //addPage()
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
      className={classNames(
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
