export function FormNotFound({ formId }: { formId: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <div style={{ padding: "24px 0" }}>
        Ooops, that Form of <i>{formId}</i> is NOT here.
      </div>
    </div>
  );
}
export function FormNotPublished({ formId }: { formId: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <div style={{ padding: "24px 0" }}>
        Ooops, that Form of <i>{formId}</i> has NOT been published yet.
      </div>
    </div>
  );
}
export function TemplateNotFound({ templateId }: { templateId: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <div style={{ padding: "24px 0" }}>
        Ooops, that Template of <i>{templateId}</i> is NOT here.
      </div>
    </div>
  );
}
