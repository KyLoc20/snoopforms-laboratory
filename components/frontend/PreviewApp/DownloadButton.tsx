import { PropsWithChildren, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { SubmissionData } from "@/lib/snoopforms/react";
import { Button } from "@/components/modal/widgets";
import { queryNoCodeFormInformation } from "@/lib/noCodeForm";
export default function DownloadButton({
  children,
  formId,
  whenSubmit,
  submissions,
}: PropsWithChildren<{ formId: string; whenSubmit: number; submissions: SubmissionData[] }>) {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = () => {
    //TODO Error
    setIsDownloading(true);
    queryNoCodeFormInformation(formId).then((info) => {
      const filename = `${formId}-${whenSubmit}.json`;
      //this is a submissionSession
      const sessionData = { formName: info.name, formId: info.formId, formLastUpdated: info.lastUpdated, whenSubmit, submissions };
      const blob = new Blob([JSON.stringify(sessionData)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      setIsDownloading(false);
    });
  };
  return (
    <Button onClick={handleDownload} width={120}>
      {isDownloading ? <TailSpin color="#fff" height={24} width={24} /> : "Download"}
    </Button>
  );
}
