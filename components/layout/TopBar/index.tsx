import { PropsWithChildren, useState } from "react";
import { HomeIcon, PlusIcon } from "@heroicons/react/outline";
import useModalPortal from "@/lib/modal";
import { persistNoCodeForm } from "@/lib/noCodeForm";
import CreateFormCard, { AvailableType, generateInitialForm } from "@/components/CreateFormCard";
import { generateId } from "@/lib/utils";
import FullScreenLoading from "../FullScreenLoading";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./TopBar.module.css";
export default function TopBar({ title }: PropsWithChildren<{ title: string }>) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const { showModal, hideModal, Portal } = useModalPortal("new-form-modal");
  const handleCreateOneNewForm = (name: string, type: AvailableType) => {
    if (type === "nocode") {
      setIsCreating(true);
      const formId = generateId(10);
      const newForm = generateInitialForm(formId, name);
      persistNoCodeForm(newForm).then((res) => {
        router.push(`/forms/${formId}/builder`);
        setIsCreating(false);
        hideModal();
      });
    }
  };
  return (
    <>
      <div
        style={{
          borderBottom: "1px solid #e5eaef",
          boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
          background: "white",
          display: "flex",
          alignItems: "center",
          height: "64px",
          width: "100%",
        }}
      >
        <CreateFormButton onClick={showModal}></CreateFormButton>
        <div className={styles.wrapper} style={{ flex: 1, display: "flex", color: "#6b7177", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Link href="/forms">
              <a aria-label="Go to Form List Page which is also a homepage">
                <HomeIcon className={styles.home} style={{ cursor: "pointer" }} />
              </a>
            </Link>
            <DividerIcon></DividerIcon>
            <Title>{title || "..."}</Title>
          </div>

          <Profile href="https://github.com/KyLoc20" />
        </div>
      </div>
      <Portal>
        <CreateFormCard onSubmit={handleCreateOneNewForm} />
      </Portal>
      {isCreating && (
        <div style={{ zIndex: 1200 }}>
          <FullScreenLoading />
        </div>
      )}
    </>
  );
}
function CreateFormButton({ onClick }: { onClick: () => void }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div className={styles.button} style={{ height: "100%" }}>
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={onClick}
        style={{
          width: "160px",
          cursor: "pointer",
          height: "100%",
          background: isHovering ? "#f53b57" : "#fafafb",
          color: isHovering ? "white" : "#6b7177",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 24px",
          borderRight: "1px solid #e5eaef",
          transition: "all .2s cubic-bezier(.4,.2,0,1)",
          fontSize: "14px",
          lineHeight: "16px",
          fontWeight: 500,
        }}
      >
        <PlusIcon style={{ width: "16px", height: "16px", marginLeft: "-2px", marginRight: "8px" }}></PlusIcon> create form
      </div>
    </div>
  );
}
//    {children} {children} {children}
function Title({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.title} style={{ display: "flex" }}>
      <div
        style={{ maxWidth: "300px", fontSize: "14px", lineHeight: "20px", fontWeight: 500, cursor: "default", overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {children}
      </div>
    </div>
  );
}
function DividerIcon({}) {
  return (
    <svg className={styles.divider} width={20} height={20} fill="#b5bfc8" viewBox="0 0 20 20" aria-hidden="true" style={{ margin: "0 16px" }}>
      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
    </svg>
  );
}
function Profile({ href }: { href: string }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Link href={href}>
      <a>
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            width: "40px",
            height: "40px",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            borderRadius: "50%",
            background: isHovering ? "rgba(245,59,87,0.1)" : undefined,
            transition: "all .2s cubic-bezier(.4,.2,0,1)",
          }}
        >
          <picture>
            <source srcSet="/avatar.jpg" />
            <img width={32} height={32} src="/avatar.jpg" alt="avatar" style={{ borderRadius: "50%" }} />
          </picture>
          {/* <img width={32} height={32} src="/avatar.jpg" alt="avatar" style={{ borderRadius: "50%" }} /> */}
        </div>
      </a>
    </Link>
  );
}
