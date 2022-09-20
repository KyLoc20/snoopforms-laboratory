import { PropsWithChildren } from "react";
import styles from "./Container.module.css";
import clsx from "clsx";
export default function Container({ children, bg }: PropsWithChildren<{ bg?: string }>) {
  return (
    <div className={clsx(styles.responsive, "screen-container", "flex flex-col h-screen max-h-screen overflow-hidden")} style={{ background: bg }}>
      {children}
    </div>
  );
}
export function ContainerOld({ children, bg }: PropsWithChildren<{ bg?: string }>) {
  return (
    <div className={clsx(styles.responsive, "screen-container", "flex flex-col h-full min-h-screen")} style={{ background: bg }}>
      {children}
    </div>
  );
}
