import { PropsWithChildren } from "react";
export default function ConfigurablePanel({ children, wrap }: PropsWithChildren<{ wrap?: boolean }>) {
  return (
    <div
      className="configurable-panel"
      style={{
        borderTop: "dashed 2px rgb(210, 218, 226)",
        marginTop: "8px",
        paddingTop: "8px",
        display: "flex",
        flexWrap: wrap ? "wrap" : "nowrap",
        alignItems: "center",
        minWidth: "220px",
        overflowX: "auto",
        overflowY: "visible",
      }}
    >
      {children}
    </div>
  );
}
