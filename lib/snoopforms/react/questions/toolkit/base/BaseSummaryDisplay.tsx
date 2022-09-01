import { AtSymbolIcon, CheckCircleIcon, GlobeAltIcon, HashtagIcon, MenuAlt1Icon, PhoneIcon } from "@heroicons/react/outline";
import { IoMdRadioButtonOn } from "react-icons/io";
import { classNames } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { QuestionSummary } from "@/lib/types";
export const elementTypes = [
  {
    type: "email",
    icon: AtSymbolIcon,
  },
  {
    type: "number",
    icon: HashtagIcon,
  },
  {
    type: "phone",
    icon: PhoneIcon,
  },
  {
    type: "text",
    icon: MenuAlt1Icon,
  },
  {
    type: "textarea",
    icon: MenuAlt1Icon,
  },
  {
    type: "checkbox",
    icon: CheckCircleIcon,
  },
  {
    type: "ratingQuestion",
    icon: CheckCircleIcon,
  },
  {
    type: "radio",
    icon: IoMdRadioButtonOn,
  },
  {
    type: "website",
    icon: GlobeAltIcon,
  },
];

export const getElementTypeIcon = (type: string) => {
  const elementType = elementTypes.find((e) => e.type === type);
  return elementType ? (
    <span className={classNames(`text-white`, `bg-red-500`, "rounded-lg inline-flex p-3 ring-4 ring-white")}>
      <elementType.icon className="w-4 h-4" aria-hidden="true" />
    </span>
  ) : null;
};

export default function BaseSummaryDisplay({ questionTitle, questionType, children }: PropsWithChildren<{ questionTitle: string; questionType: string }>) {
  return (
    <div className="my-8 overflow-hidden bg-white rounded-lg shadow" style={{ margin: "32px 0" }}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">{getElementTypeIcon(questionType)}</div>
          <div className="ml-4">
            <h3 className="font-medium leading-6 text-gray-900 text-md">{questionTitle}</h3>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
