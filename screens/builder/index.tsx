import { NavBar } from "@/components/layout/Navigation";
import BuilderApp from "@/components/BuilderApp";
import FullWidth from "@/components/layout/FullWidth";
import Container from "@/components/layout/Container";
import { useRouter } from "next/router";
import { useNoCodeForm } from "@/lib/noCodeForm";
import Loading from "@/components/layout/Loading";
import MaxWidth from "@/components/layout/MaxWidth";
export default function Screen() {
  const router = useRouter();
  const formId = router.query.id?.toString() ?? "";
  //what if formId === ""
  const { isLoadingNoCodeForm } = useNoCodeForm(formId);
  const isReady = !isLoadingNoCodeForm;
  return (
    <Container>
      <NavBar currentNav="addPage"></NavBar>
      <MaxWidth>{isReady ? <BuilderApp formId={formId} /> : <Loading />}</MaxWidth>
    </Container>
  );
}
