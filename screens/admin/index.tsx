import { PropsWithChildren, useState } from "react";
import { NavBar } from "@/components/layout/Navigation";
import Container from "@/components/layout/Container";
import { Button } from "@/lib/snoopforms/react/questions/toolkit/ui";
import { NoCodeFormData } from "@/lib/types";
import { persistNoCodeForm } from "@/lib/noCodeForm";
export default function Screen() {
  const handleAddForm = () => {
    persistNoCodeForm(MOCK_FORM).then((res) => {
      console.log("handleAddForm", res);
    });
  };
  return (
    <Container bg="rgb(246, 248, 249, 1)">
      <NavBar currentNav="example"></NavBar>
      <Preview>
        <Button variant="contained" onClick={handleAddForm}>
          Add
        </Button>
      </Preview>
    </Container>
  );
}

function Preview({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex justify-center">
      <section style={{ maxWidth: "768px", flex: 1, padding: "20px 0" }}>{children}</section>
    </div>
  );
}

const MOCK_FORM: NoCodeFormData = {
  formId: "thisisatest-form",
  name: "thisisatest-form",
  blocks: [],
  blocksDraft: [
    { id: "1-1", type: "header", data: { text: "Form for Testing", level: 1 } },
    { id: "1-2", type: "header", data: { text: "Welcome to Snoopforms Lab", level: 2 } },
    {
      id: "1-3",
      type: "ratingQuestion",
      data: { _component: { num: 5, icon: "stars", isRequired: false, title: "RatingQuestion1-1 How do you like this stuff?" } },
    },
    {
      id: "1-4",
      type: "ratingQuestion",
      data: { _component: { num: 10, icon: "hearts", isRequired: false, title: "RatingQuestion1-2 How do you like that stuff?" } },
    },
    {
      id: "1-5",
      type: "textQuestion",
      data: { _component: { placeholder: "Type Your Answer Here", title: "TextQuestion1-3 Where are you from?", isRequired: false } },
    },
    {
      id: "1-6",
      type: "pageTransition",
      data: { _component: { submitLabel: "Submit" } },
    },
    {
      id: "2-1",
      type: "ratingQuestion",
      data: { _component: { num: 3, icon: "stars", isRequired: true, title: "RatingQuestion2-1 How do you like that stuff?" } },
    },
    {
      id: "2-2",
      type: "ratingQuestion",
      data: { _component: { num: 7, icon: "hearts", isRequired: false, title: "RatingQuestion2-2 How do you like that stuff?" } },
    },
    {
      id: "2-3",
      type: "textQuestion",
      data: { _component: { placeholder: "Type Your Answer Here", title: "TextQuestion2-3 What's your name?", isRequired: true } },
    },
    {
      id: "2-4",
      type: "pageTransition",
      data: { _component: { submitLabel: "Go Next" } },
    },
    {
      id: "3-1",
      type: "textQuestion",
      data: { _component: { placeholder: "Type Your Answer Here", title: "TextQuestion3-1 May I know your age?", isRequired: true } },
    },
    { id: "3-2", type: "paragraph", data: { text: "Thanks a lot for your time and insights 🙏" } },
  ],
};
