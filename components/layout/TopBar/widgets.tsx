import { PropsWithChildren, useState } from "react";
import Link from "next/link";
import styles from "./TopBar.module.css";
export { Container, Title, DividerIcon, Profile };
function Container({ children }: PropsWithChildren<{}>) {
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
//    {children} {children} {children}
function Title({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.title} style={{ display: "flex" }}>
      <div
        style={{ maxWidth: "300px", fontSize: "14px", lineHeight: "20px", fontWeight: 500, cursor: "default", overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {children}
      </div>
    </div>
  );
}
function DividerIcon({}) {
  return (
    <svg className={styles.divider} width={20} height={20} fill="#b5bfc8" viewBox="0 0 20 20" aria-hidden="true" style={{ margin: "0 16px" }}>
      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
    </svg>
  );
}
function Profile({ href }: { href: string }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Link href={href}>
      <a>
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            width: "40px",
            height: "40px",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            borderRadius: "50%",
            background: isHovering ? "rgba(245,59,87,0.1)" : undefined,
            transition: "all .2s cubic-bezier(.4,.2,0,1)",
          }}
        >
          <picture>
            <source srcSet="/avatar.jpg" />
            <img width={32} height={32} src="/avatar.jpg" alt="avatar" style={{ borderRadius: "50%" }} />
          </picture>
          {/* <img width={32} height={32} src="/avatar.jpg" alt="avatar" style={{ borderRadius: "50%" }} /> */}
        </div>
      </a>
    </Link>
  );
}
