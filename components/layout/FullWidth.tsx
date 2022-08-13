import { PropsWithChildren } from "react";
export default function FullWidth({ children }: PropsWithChildren<{}>) {
  return <div className="w-full">{children}</div>;
}
