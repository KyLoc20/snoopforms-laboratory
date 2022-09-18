import { PropsWithChildren, useState } from "react";
import styles from "./Grid.module.css";
export function CardGrid({ children }: PropsWithChildren<{}>) {
  return (
    <section className="card-grid flex justify-center">
      <div className={styles.cardGrid} style={{ display: "grid", gap: "1.5rem", maxWidth: "1024px", flex: 1, padding: "32px 24px" }}>
        {children}
      </div>
    </section>
  );
}
