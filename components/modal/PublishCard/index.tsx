import { useState, useEffect, useRef, PropsWithChildren } from "react";
import TextField from "@/lib/snoopforms/react/questions/toolkit/ui/TextField";
import { Button, Title } from "../widgets";

export default function PublishCard({ onDone, onCancel }: PublishCardProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Title>Are You Ready To Publish?</Title>
      <div
        style={{
          marginTop: "24px",
        }}
      >
        <Button onClick={onDone} width={120} theme="red">
          Go ahead
        </Button>
        <Button onClick={onCancel} width={120}>
          Not now
        </Button>
      </div>
    </div>
  );
}
type PublishCardProps = {
  onDone: () => void;
  onCancel: () => void;
};
