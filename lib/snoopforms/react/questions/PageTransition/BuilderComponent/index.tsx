import { useEffect, useState } from "react";
import { PageTransitionConfigData } from "../types";
import ButtonLikeTextField from "../common/ButtonLikeTextField";
import DividingLine from "../common/DividingLine";
import { debounce } from "lodash";
interface PageTransitionProps {
  onDataChange: (data: PageTransitionConfigData) => void;
  initialData: PageTransitionConfigData;
}
export default function BuilderComponent({ onDataChange, initialData }: PageTransitionProps) {
  const [submitLabel, setSubmitLabel] = useState(initialData.submitLabel);
  useEffect(() => {
    onDataChange({ submitLabel });
  }, [submitLabel]);

  // const handleChange = debounce((value: string) => {
  //   console.log("handleChange", value);
  //   setSubmitLabel(value);
  // }, 500);
  //TODO debounce
  const handleChange = (value: string) => {
    console.log("handleChange", value);
    setSubmitLabel(value);
  };
  return (
    <div className="page-transition-container" style={{ position: "relative", margin: "12px 0 52px" }}>
      {/* <div style={{}}>
        <ButtonLikeTextField defaultValue={submitLabel} onChange={(v) => setSubmitLabel(v)} />
      </div> */}
      <ButtonLikeTextField defaultValue={submitLabel} onChange={handleChange} />
      <div style={{ position: "absolute", width: "100%", bottom: "-52px", left: 0 }}>
        <DividingLine></DividingLine>
      </div>
    </div>
  );
}
