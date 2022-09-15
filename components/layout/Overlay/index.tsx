import { PropsWithChildren } from "react";
export default function Overlay({ children }: PropsWithChildren<{}>) {
  // pointerEvents: "none" is to allow the content behind an overlay to remain interactive.
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: "rgba(98,125,149,0.3)" }}>
      {children}
    </div>
  );
}
