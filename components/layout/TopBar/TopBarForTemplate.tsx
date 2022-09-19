import { PropsWithChildren, useState } from "react";
import { LightBulbIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import FullScreenLoading from "../FullScreenLoading";
import Link from "next/link";
import styles from "./TopBar.module.css";
import Button from "./Button";
import { Container, Title, DividerIcon, Profile } from "./TopBar";
import useModalPortal from "@/lib/modal";
import CreateFormCard from "@/components/modal/CreateFormCard";
import { generateId } from "@/lib/utils";
import { getBlocksBy } from "@/lib/template";
import { BlockData } from "@/lib/types";
import { useNavigation } from "@/lib/router";
import { generateForm, persistNoCodeForm } from "@/lib/noCodeForm";
export default function TopBarForTemplate({ templateId, templateName }: PropsWithChildren<{ templateId: string; templateName: string }>) {
  const [isCreating, setIsCreating] = useState(false);
  const shouldBeLoading = isCreating;
  const [templateInUse, setTemplateInUse] = useState<BlockData[]>([]);
  const { showModal, hideModal, Portal } = useModalPortal("new-form-modal");

  const haneleSelectOneTemplate = (templateId: string) => {
    setTemplateInUse(getBlocksBy(templateId));
    showModal();
  };

  const { navigateTo } = useNavigation();
  const handleCreateFormFromTemplate = (formName: string) => {
    hideModal();
    setIsCreating(true);
    const formId = generateId(10);
    const newForm = generateForm(formId, formName, templateInUse);
    console.log("handleCreateFormFromTemplate", newForm);
    persistNoCodeForm(newForm).then((res) => {
      navigateTo(`/forms/${formId}/builder`);
      setIsCreating(false);
    });
  };

  const handleBrowseTemplates = () => {
    hideModal();
    navigateTo(`/templates`);
  };
  return (
    <>
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
      <Portal>
        <CreateFormCard fromTemplate onSubmit={handleCreateFormFromTemplate} onBrowseTemplates={handleBrowseTemplates} />
      </Portal>
      {shouldBeLoading && <FullScreenLoading />}
    </>
  );
}
