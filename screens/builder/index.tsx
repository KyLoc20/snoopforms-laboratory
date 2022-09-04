import { NavBar } from "@/components/layout/Navigation";
import Builder from "@/components/builder";
import FullWidth from "@/components/layout/FullWidth";
import Container from "@/components/layout/Container";
import { useRouter } from "next/router";
import { useNoCodeForm } from "@/lib/noCodeForm";
export default function Screen() {
  const router = useRouter();
  const formId = router.query.id?.toString() ?? "";
  //what if formId === ""
  const { isLoadingNoCodeForm } = useNoCodeForm(formId);
  const isReady = !isLoadingNoCodeForm;
  return (
    <Container>
      <NavBar currentNav="addPage"></NavBar>
      <FullWidth>{isReady ? <Builder formId={formId} /> : "Loading"}</FullWidth>
    </Container>
  );
}
