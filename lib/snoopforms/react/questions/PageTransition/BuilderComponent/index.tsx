import { useEffect, useState } from "react";
import { Select, Switch, QuestionInput, Divider, Button } from "../../toolkit/ui";
import { PageTransitionConfigData } from "../types";
import ButtonLikeTextField from "../common/ButtonLikeTextField";
import DividingLine from "../common/DividingLine";
interface PageTransitionProps {
  onDataChange: (data: PageTransitionConfigData) => void;
  initialData: PageTransitionConfigData;
}
export default function BuilderComponent({ onDataChange, initialData }: PageTransitionProps) {
  const [submitLabel, setSubmitLabel] = useState(initialData.submitLabel);
  useEffect(() => {
    onDataChange({ submitLabel });
  }, [submitLabel]);
  return (
    <div className="page-transition-container" style={{ position: "relative", marginTop: "64px" }}>
      <div style={{ position: "absolute", top: "-48px", left: 0 }}>
        <Button variant="contained">{submitLabel}</Button>
      </div>
      <DividingLine></DividingLine>
    </div>
  );
}
