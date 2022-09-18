import { BlockData } from "@/lib/types";
import { generateId } from "@/lib/utils";
export { getBlocksBy, TEMPLATE_LIST };
const TEMPLATE_LIST: Template[] = [
  { id: "tell-us-about-yourself", name: "Tell Us About Yourself Template" },
  { id: "cake-order", name: "Cake Order Template" },
];
type Template = {
  id: string; //"cake-order-template"
  name: string; //"Cake Order Template"
};

function getBlocksBy(templateId: string): BlockData[] {
  switch (templateId) {
    case "tell-us-about-yourself":
      return TELL_US_ABOUT_YOURSELF_TEMPLATE();
    default:
      return DEFAULT_TEMPLATE();
  }
}

const TELL_US_ABOUT_YOURSELF_TEMPLATE = () => [
  { id: generateId(10), type: "header", data: { text: "Welcome to Snoopforms Lab", level: 2 } },
  {
    id: generateId(10),
    type: "textQuestion",
    data: { _component: { placeholder: "Type Your Name Here", title: "May I know your name?", isRequired: false } },
  },
  {
    id: generateId(10),
    type: "multipleChoiceQuestion",
    data: {
      _component: {
        onlyOne: true,
        isRequired: false,
        options: [
          { label: "She/her", value: "She/her" },
          { label: "He/him", value: "He/him" },
          { label: "They/them", value: "They/them" },
          { label: "I prefer not to say", value: "I prefer not to say" },
        ],
        title: "What are your pronouns?",
      },
    },
  },
  {
    id: generateId(10),
    type: "pageTransition",
    data: { _component: { submitLabel: "Submit" } },
  },
  {
    id: generateId(10),
    type: "ratingQuestion",
    data: { _component: { num: 5, icon: "hearts", isRequired: false, title: "How do you like this stuff?" } },
  },
  {
    id: generateId(10),
    type: "emailQuestion",
    data: { _component: { placeholder: "Type Email Here", title: "May I have your email?", isRequired: false } },
  },
  { id: generateId(10), type: "paragraph", data: { text: "Thanks a lot for your time and insights 🙏" } },
];
const DEFAULT_TEMPLATE = TELL_US_ABOUT_YOURSELF_TEMPLATE;
