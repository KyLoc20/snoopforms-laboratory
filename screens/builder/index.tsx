import { NavBar } from "@/components/layout/Navigation";
import BuilderApp from "@/components/BuilderApp";
import { useRouter } from "next/router";
import { useNoCodeForm } from "@/lib/noCodeForm";
import { Container, MaxWidth, Loading } from "@/components/layout";

export default function Screen() {
  const router = useRouter();
  const formId = router.query.id?.toString() ?? "";
  //what if formId === ""
  const { isLoadingNoCodeForm } = useNoCodeForm(formId);
  const isReady = !isLoadingNoCodeForm;
  return (
    <Container>
      <NavBar currentNav="builder"></NavBar>
      <MaxWidth>{isReady ? <BuilderApp formId={formId} /> : <Loading />}</MaxWidth>
    </Container>
  );
}
