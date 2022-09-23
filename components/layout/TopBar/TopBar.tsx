import { PropsWithChildren, useState } from "react";
import { HomeIcon, PlusIcon } from "@heroicons/react/outline";
import FullScreenLoading from "../FullScreenLoading";
import Link from "next/link";
import styles from "./TopBar.module.css";
import Button from "./Button";
import useCreateFormModal from "@/hooks/useCreateFormModal";
import { NoCodeFormData } from "@/lib/types";
import { Container, Title, DividerIcon, Profile } from "./widgets";
export default function TopBar({ title }: PropsWithChildren<{ title: string }>) {
  const handleCreateFormComplete = (newForm: NoCodeFormData) => {
    console.log("handleCreateFormComplete", newForm);
  };
  const { isCreating, showModal, hideModal, CreateFormModal } = useCreateFormModal("global-modal-container", handleCreateFormComplete);
  const shouldBeLoading = isCreating;

  return (
    <>
      {shouldBeLoading && <FullScreenLoading />}
      <CreateFormModal />
      <Container>
        <Button onClick={showModal}>
          <PlusIcon style={{ width: "16px", height: "16px", marginLeft: "-2px", marginRight: "8px" }} /> create form
        </Button>
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
      </Container>
    </>
  );
}
