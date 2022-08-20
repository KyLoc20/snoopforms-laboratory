import { FORM_GRAY_LIGHT } from "../../base/design";
export default function Divider({ h }: { h?: number }) {
  //todo align-items center cannot stretch
  return <div className="divider" style={{ height: h ? `${h}px` : "100%", width: "1px", margin: "0 12px", background: FORM_GRAY_LIGHT }}></div>;
}
