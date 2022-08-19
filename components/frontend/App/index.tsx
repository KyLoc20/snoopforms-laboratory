import { GlobeAltIcon, MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { SnoopElement, SnoopForm, SnoopPage } from "@snoopforms/react";
import { useMemo, createElement } from "react";
import { generateId } from "@/lib/utils";
import { TailSpin } from "react-loader-spinner";
import { BlockData } from "@/lib/types";
import RatingQuestionComponent from "@/lib/editorjs/tools/RatingQuestion/Component";
export default function FormApp({ id, formId, blocks, localOnly }: { id: string; formId: string; blocks: BlockData[]; localOnly: boolean }) {
  const pages = useMemo(() => {
    // console.log("UPDATE FormApp", blocks);
    const pages = [];
    let currentPage: {
      id: string;
      blocks: BlockData[];
    } = {
      id: formId, // give the first page the formId as id by default
      blocks: [],
    };
    for (const block of blocks) {
      if (block.type !== "pageTransition") {
        currentPage.blocks.push(block);
      } else {
        currentPage.blocks.push({
          id: generateId(10),
          data: {
            label: block.data.submitLabel,
          },
          type: "submitButton",
        });
        pages.push(currentPage);
        currentPage = {
          id: block.id,
          blocks: [],
        };
      }
    }
    pages.push(currentPage);
    return pages;
  }, [blocks, formId]);

  if (!pages) return <Loading />;
  else {
    console.log(
      "RENDER FormApp",
      pages[0].blocks.map((n, i) => n.data)
    );
    return (
      <div className="w-full px-5 py-5">
        <SnoopForm
          key={id} // used to reset form
          domain={window.location.host}
          protocol={window.location.protocol === "http:" ? "http" : "https"}
          formId={formId}
          localOnly={localOnly}
          className="w-full max-w-3xl mx-auto space-y-6"
        >
          {pages.map((page, pageIdx) => (
            <SnoopPage key={page.id} name={page.id} thankyou={pageIdx === pages.length - 1}>
              {page.blocks
                .map((block) => createFormElement(block.type, block))
                .map((Element, index) => (
                  <Element key={index}></Element>
                ))}
            </SnoopPage>
          ))}
        </SnoopForm>
      </div>
    );
  }
}

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
        return <h3 className="ce-header">{block.data.text}</h3>;
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

function Loading() {
  return (
    <div className="min-h-screen px-4 py-16 bg-white sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main>
          <div className="flex justify-center">
            <TailSpin color="#1f2937" height={30} width={30} />
          </div>
          <p className="mt-5 text-sm text-ui-gray-dark">Loading...</p>
        </main>
      </div>
    </div>
  );
}
