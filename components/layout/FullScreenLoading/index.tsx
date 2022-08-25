import Overlay from "@/components/layout/Overlay";
import { TailSpin } from "react-loader-spinner";
export default function FullScreenLoading() {
  return (
    <Overlay>
      <TailSpin color="#1f2937" height={30} width={30} />
    </Overlay>
  );
}
