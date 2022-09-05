import { PropsWithChildren } from "react";
export default function Overlay({ children }: PropsWithChildren<{}>) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center" style={{ background: "rgba(98,125,149,0.75)", pointerEvents: "none" }}>
      {children}
    </div>
  );
}
