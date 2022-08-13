import { PropsWithChildren, useState } from "react";
import { DocumentAddIcon, EyeIcon, PaperAirplaneIcon, ShareIcon } from "@heroicons/react/outline";
import { classNames } from "@/lib/utils";
import { useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import dynamic from "next/dynamic";
let SnoopFormsEditor = dynamic(() => import("@/lib/editorjs"), {
  ssr: false,
});
export default function Page() {
  return (
    <Container>
      <NavBar></NavBar>
      <FullWidth>
        <Builder></Builder>
      </FullWidth>
    </Container>
  );
}

function NavBar() {
  const [currentNav, setCurrentNav] = useState<"addPage" | "preview" | "publish" | "share">("addPage");
  return (
    <div className="flex items-center justify-center flex-shrink-0 border-b border-ui-gray-light bg-ui-gray-lighter">
      <nav className="flex space-x-10" aria-label="resultModes">
        <Navigation
          id="addPage"
          label="Page"
          icon={DocumentAddIcon}
          onClick={() => {
            setCurrentNav("addPage");
            //addPage()
          }}
          active={currentNav === "addPage"}
        ></Navigation>
        <Navigation
          id="preview"
          label="Preview"
          icon={EyeIcon}
          onClick={() => {
            setCurrentNav("preview");
            //addPage()
          }}
          active={currentNav === "preview"}
          disabled
        ></Navigation>
        <Navigation
          id="publish"
          label="Publish"
          icon={PaperAirplaneIcon}
          onClick={() => {
            setCurrentNav("publish");
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
            setCurrentNav("share");
            //addPage()
          }}
          active={currentNav === "share"}
          disabled
        ></Navigation>
      </nav>
    </div>
  );
}
function Navigation({
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
function Container({ children }: PropsWithChildren<{}>) {
  return <div className="flex flex-col">{children}</div>;
}
function FullWidth({ children }: PropsWithChildren<{}>) {
  return <div className="w-full">{children}</div>;
}
function Builder({}) {
  const refEditor = useRef<EditorJS | null>(null);
  return (
    <div className="w-full h-full mb-20 overflow-auto bg-white pt-10">
      <section className="pt-10 pb-56 max-w-5xl mx-auto">
        <SnoopFormsEditor id="editor" editorRef={refEditor} autofocus></SnoopFormsEditor>
      </section>
    </div>
  );
}
