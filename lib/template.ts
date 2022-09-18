import { BlockData } from "@/lib/types";
import { generateId } from "@/lib/utils";
export { getBlocksBy, TEMPLATE_LIST, DEFAULT_TEMPLATE, WELCOME_TEMPLATE };
type Template = {
  id: string; //"cake-order"
  name: string; //"Cake Order Template"
};
const TEMPLATE_LIST: Template[] = [
  { id: "welcome", name: "Welcome Template" },
  { id: "self-introduction", name: "Self Introduction Template" },
  { id: "cake-order", name: "Cake Order Template" },
];

function getBlocksBy(templateId: string): BlockData[] {
  switch (templateId) {
    case "welcome":
      return WELCOME_TEMPLATE();
    case "self-introduction":
      return SELF_INTRODUCTION_TEMPLATE();
    case "cake-order":
      return CAKE_ORDER_TEMPLATE();
    default:
      return DEFAULT_TEMPLATE();
  }
}
const WELCOME_TEMPLATE = () => [
  { id: generateId(10), type: "header", data: { text: "Welcome to Snoopforms Lab", level: 2 } },
  {
    id: generateId(10),
    type: "textQuestion",
    data: { _component: { placeholder: "Type Something Here", title: "Text Question", isRequired: false } },
  },
  {
    id: generateId(10),
    type: "pageTransition",
    data: { _component: { submitLabel: "Next" } },
  },
  { id: generateId(10), type: "paragraph", data: { text: "Thanks a lot for your time and insights 🙏" } },
];
const SELF_INTRODUCTION_TEMPLATE = () => [
  { id: generateId(10), type: "header", data: { text: "Tell Us About Yourself", level: 2 } },
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
    data: { _component: { submitLabel: "Next" } },
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
const CAKE_ORDER_TEMPLATE = () => [
  { id: generateId(10), type: "header", data: { text: "Order a Yummy Cake", level: 2 } },
  {
    id: generateId(10),
    type: "multipleChoiceQuestion",
    data: {
      _component: {
        onlyOne: true,
        isRequired: false,
        options: [
          { label: "Chocolate Cake", value: "Chocolate Cake" },
          { label: "Cheese Cake", value: "Cheese Cake" },
          { label: "Icecream Cake", value: "Icecream Cake" },
          { label: "Durian Melaleuca", value: "Durian Melaleuca" },
        ],
        title: "What type of Cake would you like?",
      },
    },
  },
  {
    id: generateId(10),
    type: "pageTransition",
    data: { _component: { submitLabel: "Next" } },
  },
  { id: generateId(10), type: "paragraph", data: { text: "Hold tight, and your Cake is running to you 🍰" } },
];
const DEFAULT_TEMPLATE = SELF_INTRODUCTION_TEMPLATE;
