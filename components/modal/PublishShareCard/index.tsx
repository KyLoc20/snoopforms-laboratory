import { useState, PropsWithChildren } from "react";
import { Button, Title, Description } from "../widgets";
import { FullScreenLoading } from "@/components/layout";
import { NoCodeFormData } from "@/lib/types";
import Link from "next/link";
import { useNoCodeForm, persistNoCodeForm } from "@/lib/noCodeForm";
import { toast } from "react-toastify";
import TextField from "@/lib/snoopforms/react/questions/toolkit/ui/TextField";
export default function PublishShareCard({ onDone, onCancel, formId, fromShare }: PublishCardProps) {
  const [step, setStep] = useState<"publish" | "share">(fromShare ? "share" : "publish");
  const [isPublishing, setIsPublishing] = useState(false);
  const shouldBeLoading = isPublishing;
  const shareLink = `${DEFAULT_ENDPOINT}/to/${formId}`;
  const { noCodeForm } = useNoCodeForm(formId);
  const handlePublishForm = () => {
    if (formId && formId !== "__unknown") {
      setIsPublishing(true);
      //possible dangerous
      setTimeout(() => {
        const newNoCodeForm = JSON.parse(JSON.stringify(noCodeForm)) as NoCodeFormData;
        newNoCodeForm.blocks = noCodeForm.blocksDraft;
        console.log("handlePublishForm", newNoCodeForm);
        persistNoCodeForm(newNoCodeForm).then((res) => {
          setIsPublishing(false);
          toast("Successfully Published  🎉");
          setStep("share");
          onDone();
        });
      }, 1000);
    }
  };

  return (
    <>
      {shouldBeLoading && <FullScreenLoading />}
      {step === "publish" && (
        <Wrapper>
          <Title>Are You Ready To Publish?</Title>
          <div
            style={{
              marginTop: "24px",
            }}
          >
            <Button onClick={handlePublishForm} width={120} theme="red">
              Go ahead
            </Button>
            <Button onClick={onCancel} width={120}>
              Not now
            </Button>
          </div>
        </Wrapper>
      )}
      {step === "share" && (
        <Wrapper>
          <Title>Share Your Form</Title>
          <Description>Let your participants fill out your form by accessing it via the public link.</Description>
          <div style={{ margin: "8px 0", padding: "0 8px" }}>
            <TextField onChange={() => {}} disabled defaultValue={shareLink}></TextField>
          </div>
          <div
            style={{
              marginTop: "24px",
            }}
          >
            <Link href={`/to/${formId}`}>
              <a target="_blank">
                <Button width={120} theme="red">
                  Take me there
                </Button>
              </a>
            </Link>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(shareLink);
                toast("Got it! 📋");
              }}
              width={120}
            >
              Copy
            </Button>
          </div>
        </Wrapper>
      )}
    </>
  );
}
//TODO env variant
const DEFAULT_ENDPOINT = "https://snoopforms-lab.vercel.app";
type PublishCardProps = {
  fromShare?: boolean;
  onDone: () => void;
  onCancel: () => void;
  formId: string;
};
function Wrapper({ children }: PropsWithChildren<{}>) {
  return <div style={{ display: "flex", flexDirection: "column", height: "226px" }}>{children}</div>;
}
