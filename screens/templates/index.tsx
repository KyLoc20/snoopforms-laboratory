import { TopBarAppLayout } from "@/components/layout";
import TemplateListApp from "@/components/frontend/TemplateListApp";
export default function Screen() {
  return (
    <TopBarAppLayout title="Public Templates">
      <TemplateListApp />
    </TopBarAppLayout>
  );
}
