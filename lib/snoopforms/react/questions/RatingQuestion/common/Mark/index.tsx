export default function Mark({ active }: { active: boolean }) {
  if (active)
    return (
      <div style={{ paddingRight: "12px", color: "rgba(245, 59, 87, 1)", lineHeight: "24px", fontSize: "18px", position: "absolute", top: "0", right: "0" }}>
        *
      </div>
    );
  else return null;
}
