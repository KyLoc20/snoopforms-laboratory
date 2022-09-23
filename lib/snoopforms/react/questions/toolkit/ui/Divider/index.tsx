import { FORM_GRAY_LIGHT } from "../../base/design";
export default function Divider({ h }: { h?: number }) {
  //todo align-items center cannot stretch
  return (
    <div className="divider" style={{ flex: 1, maxWidth: "25px", minWidth: "9px", display: "flex", justifyContent: "center" }}>
      <div style={{ height: h ? `${h}px` : "100%", width: "1px", background: FORM_GRAY_LIGHT }}></div>
    </div>
  );
}
