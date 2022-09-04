import { PropsWithChildren, useState } from "react";
import Container from "@/components/layout/Container";
import { HomeIcon, PlusIcon } from "@heroicons/react/outline";
import FormListApp from "@/components/frontend/ListApp";
import { useFormList } from "@/lib/forms";
export default function Screen() {
  const { isLoadingFormList } = useFormList();
  const isReady = !isLoadingFormList;
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <TopBar>
        <CreateFormButton></CreateFormButton>
        <Title></Title>
      </TopBar>
      {isReady ? <FormListApp /> : "Loading"}
      <div id="new-form-modal"></div>
    </Container>
  );
}

function CreateFormButton() {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        cursor: "pointer",
        height: "100%",
        background: isHovering ? "#f53b57" : "#fafafb",
        color: isHovering ? "white" : "#6b7177",
        display: "flex",
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
  );
}
function Title() {
  return (
    <div style={{ display: "flex", marginLeft: "32px", color: "#6b7177" }}>
      <HomeIcon style={{ width: "20px", height: "20px", cursor: "default" }} />
      <DividerIcon></DividerIcon>
      <div style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, cursor: "default" }}>Public Forms</div>
    </div>
  );
}
function DividerIcon({}) {
  return (
    <svg width={20} height={20} fill="#b5bfc8" viewBox="0 0 20 20" aria-hidden="true" style={{ margin: "0 16px" }}>
      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
    </svg>
  );
}
function TopBar({ children }: PropsWithChildren<{}>) {
  return (
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
      {children}
    </div>
  );
}
