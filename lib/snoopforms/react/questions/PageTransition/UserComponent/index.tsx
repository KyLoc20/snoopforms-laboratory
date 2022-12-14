import { Button } from "../../toolkit/ui";
import { PageTransitionConfigData } from "../types";

//open to extension in the future such as conditional info
interface PageTransitionProps {
  config: PageTransitionConfigData;
}
export default function UserComponent({ config }: PageTransitionProps) {
  const { submitLabel } = config;
  return (
    <div className="page-transition-container" style={{ paddingBottom: "20px" }}>
      <div style={{ marginTop: "12px" }}>
        <Button variant="contained" submittable>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
