import { GlobeAltIcon, MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { SnoopElement } from "@snoopforms/react";
import { BlockData } from "@/lib/types";
import { PropsWithChildren } from "react";
import RatingQuestionComponent from "@/lib/editorjs/tools/RatingQuestion/Component";
export { createFormElement };
const createFormElement = (type: string, block: BlockData) => {
  let render: React.FC;
  switch (type) {
    case "paragraph":
      render = function _() {
        return <p className="ce-paragraph">{block.data.text}</p>;
      };
      break;
    case "header":
      render = function _() {
        return <SnoopElementHeading level={block.data.level as number}>{block.data.text}</SnoopElementHeading>;
      };
      break;
    case "ratingQuestion":
      render = function _() {
        return (
          <RatingQuestionComponent
            onDataChange={() => {}}
            initialData={{
              title: block.data._component?.title,
              num: block.data._component?.num,
              icon: block.data._component?.icon,
              isRequired: block.data._component?.isRequired,
            }}
          />
        );
      };
      break;
    case "textQuestion":
      render = function _() {
        return (
          <SnoopElement
            type="text"
            name={block.id}
            label={block.data.label}
            placeholder={block.data.placeholder}
            classNames={{
              label: "mt-4 mb-2 block text-lg font-bold leading-7 text-gray-800 sm:truncate",
            }}
            required={block.data.required}
          />
        );
      };
      break;
    case "emailQuestion":
      render = function _() {
        return (
          <SnoopElement
            type="email"
            name={block.id}
            label={block.data.label}
            placeholder={block.data.placeholder}
            icon={<MailIcon className="w-5 h-5" />}
            classNames={{
              label: "mt-4 mb-2 block text-lg font-bold leading-7 text-gray-800 sm:truncate",
            }}
            required={block.data.required}
          />
        );
      };
      break;
    case "multipleChoiceQuestion":
      if (block.data.multipleChoice) {
        render = function _() {
          return (
            <SnoopElement
              type="checkbox"
              name={block.id}
              label={block.data.label}
              options={(block.data.options as any[]).map((o) => o.label)}
              classNames={{
                label: "mt-4 mb-2 block text-lg font-bold leading-7 text-gray-800 sm:truncate",
              }}
              required={block.data.required}
            />
          );
        };
      } else {
        render = function _() {
          return (
            <SnoopElement
              type="radio"
              name={block.id}
              label={block.data.label}
              options={(block.data.options as any[]).map((o) => o.label)}
              classNames={{
                label: "mt-4 mb-2 block text-lg font-bold leading-7 text-gray-800 sm:truncate",
              }}
              required={block.data.required}
            />
          );
        };
      }
      break;
    case "numberQuestion":
      render = function _() {
        return (
          <SnoopElement
            type="number"
            name={block.id}
            label={block.data.label}
            placeholder={block.data.placeholder}
            classNames={{
              label: "mt-4 mb-2 block text-lg font-bold leading-7 text-gray-800 sm:truncate",
            }}
            required={block.data.required}
          />
        );
      };
      break;
    case "phoneQuestion":
      render = function _() {
        return (
          <SnoopElement
            type="phone"
            name={block.id}
            label={block.data.label}
            placeholder={block.data.placeholder}
            icon={<PhoneIcon className="w-5 h-5" />}
            classNames={{
              label: "mt-4 mb-2 block text-lg font-bold leading-7 text-gray-800 sm:truncate",
            }}
            required={block.data.required}
          />
        );
      };
      break;
    case "submitButton":
      render = function _() {
        return (
          <SnoopElement
            name="submit"
            type="submit"
            label={block.data.label}
            classNames={{
              button:
                "inline-flex items-center px-4 py-3 text-sm font-medium text-white bg-gray-700 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
            }}
          />
        );
      };
      break;
    case "websiteQuestion":
      render = function _() {
        return (
          <SnoopElement
            type="website"
            name={block.id}
            label={block.data.label}
            placeholder={block.data.placeholder}
            icon={<GlobeAltIcon className="w-5 h-5" />}
            classNames={{
              label: "mt-4 mb-2 block text-lg font-bold leading-7 text-gray-800 sm:truncate",
            }}
            required={block.data.required}
          />
        );
      };
      break;
    default:
      render = function _() {
        return <></>;
      };
      break;
  }
  return render;
};
function SnoopElementHeading({ children, level }: PropsWithChildren<{ level: number }>) {
  if (level === 1) {
    return <h1 className="ce-header">{children}</h1>;
  } else if (level === 2) {
    return <h2 className="ce-header">{children}</h2>;
  } else if (level === 3) {
    return <h3 className="ce-header">{children}</h3>;
  } else {
    return <h3 className="ce-header">{children}</h3>;
  }
}
