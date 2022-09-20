import { PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./MaxWidth.module.css";
export default function MaxWidth({ children, size, full }: PropsWithChildren<{ full?: boolean; size?: number | string }>) {
  // undefined -> no maxWidth, fill the container
  // string -> percentage
  // number -> px
  const computedSize = full ? undefined : typeof size === "string" ? size : `${size ?? 1024}px`;
  return (
    <div
      className="max-width-provider"
      style={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        overflow: "auto",
      }}
    >
      <div className={clsx(styles.wrapper)} style={{ width: "100%", height: "100%", maxWidth: computedSize }}>
        {children}
      </div>
    </div>
  );
}
