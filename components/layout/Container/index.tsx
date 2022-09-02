import { PropsWithChildren } from "react";
export default function Container({ children, bg }: PropsWithChildren<{ bg?: string }>) {
  return (
    <div className="min-h-screen h-full flex flex-col" style={{ background: bg }}>
      {children}
    </div>
  );
}
