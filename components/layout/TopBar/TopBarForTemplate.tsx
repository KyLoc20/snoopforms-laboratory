import { PropsWithChildren, useState } from "react";
import { LightBulbIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import FullScreenLoading from "../FullScreenLoading";
import Link from "next/link";
import styles from "./TopBar.module.css";
import Button from "./Button";
import { Container, Title, DividerIcon, Profile } from "./widgets";
import { getBlocksBy } from "@/lib/template";
import { BlockData, NoCodeFormData } from "@/lib/types";
import useCreateFormModal from "@/hooks/useCreateFormModal";
export default function TopBarForTemplate({ templateId, templateName }: PropsWithChildren<{ templateId: string; templateName: string }>) {
  const [templateInUse, setTemplateInUse] = useState<BlockData[]>([]);

  const handleCreateFormComplete = (newForm: NoCodeFormData) => {
    console.log("handleCreateFormFromTemplate", newForm);
  };

  const { isCreating, showModal, hideModal, CreateFormModal } = useCreateFormModal("global-modal-container", handleCreateFormComplete, true, templateInUse);
  const shouldBeLoading = isCreating;

  const haneleSelectOneTemplate = (templateId: string) => {
    setTemplateInUse(getBlocksBy(templateId));
    showModal();
  };

  return (
    <>
      {shouldBeLoading && <FullScreenLoading />}
      <CreateFormModal />
      <Container>
        <Button onClick={() => haneleSelectOneTemplate(templateId)}>
          <LightBulbIcon style={{ width: "16px", height: "16px", marginLeft: "-2px", marginRight: "8px" }} />
          Use It!
        </Button>
        <div className={styles.wrapper} style={{ flex: 1, display: "flex", color: "#6b7177", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Link href="/templates">
              <a aria-label="Go back to Template Gallery">
                <ArrowLeftIcon className={styles.home} style={{ cursor: "pointer", height: "20px", width: "20px", padding: "2px" }} />
              </a>
            </Link>
            <DividerIcon></DividerIcon>
            <Title>{templateName || "..."}</Title>
          </div>
          <Profile href="https://github.com/KyLoc20" />
        </div>
      </Container>
    </>
  );
}
