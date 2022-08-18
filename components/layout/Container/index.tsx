import { PropsWithChildren } from "react";
export default function Container({ children, bg }: PropsWithChildren<{ bg?: string }>) {
  return (
    <div className="min-h-screen" style={{ background: bg }}>
      {children}
    </div>
  );
}
