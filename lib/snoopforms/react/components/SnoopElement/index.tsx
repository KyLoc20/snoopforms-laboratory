import React, { FC, useContext, useEffect } from "react";
// import { getOptionsSchema } from '../../lib/elements';
import { ClassNames } from "../../types";
// import { Checkbox } from '../Elements/Checkbox';
// import { Email } from '../Elements/Email';
// import { Number } from '../Elements/Number';
// import { Phone } from '../Elements/Phone';
// import { Radio } from '../Elements/Radio';
// import { Submit } from '../Elements/Submit';
// import { Text } from '../Elements/Text';
// import { Textarea } from '../Elements/Textarea';
// import { Website } from '../Elements/Website';
import { CurrentPageContext, SchemaContext } from "../SnoopForm";
import { PageContext } from "../SnoopPage";
import { createQuestionElement, PreSubmissionData } from "../../questions";
interface Option {
  label: string;
  value: string;
}
interface QuestionElementProps {
  id?: string; //questionId, should be a must for a Question
  config?: any;
}
export interface SnoopElementProps extends QuestionElementProps {
  type: string; //questionType
  name: string; //unsure
  label?: string; //unsure
  icon?: React.ReactNode; //unsure
  placeholder?: string; //unsure
  classNames?: ClassNames; //to customize the styles of its UI parts
  required?: boolean; //unsure
  options?: Option[] | string[]; //unsure
  rows?: number; //unsure
}

export const SnoopElement: FC<SnoopElementProps> = (props) => {
  const { type, name, label = undefined, icon, placeholder, classNames = {}, required = false, options, rows } = props;
  const { id, config } = props;
  const { schema, setSchema } = useContext(SchemaContext);
  const pageName = useContext(PageContext);
  const { currentPageIdx } = useContext(CurrentPageContext);

  useEffect(() => {
    setSchema((schema: any) => {
      if (pageName === "") {
        console.warn(`🦝 SnoopForms: An Element must always be a child of a page!`);
        return;
      }
      const newSchema = { ...schema };
      let pageIdx = newSchema.pages.findIndex((p: any) => p.name === pageName);
      if (pageIdx === -1) {
        console.warn(`🦝 SnoopForms: Error accessing page`);
        return;
      }
      let elementIdx = newSchema.pages[pageIdx].elements.findIndex((e: any) => e.name === name);
      if (elementIdx === -1) {
        newSchema.pages[pageIdx].elements.push({ name });
        elementIdx = newSchema.pages[pageIdx].elements.length - 1;
      }
      newSchema.pages[pageIdx].elements[elementIdx].type = type;
      newSchema.pages[pageIdx].elements[elementIdx].label = label;
      if (["checkbox", "radio"].includes(type)) {
        newSchema.pages[pageIdx].elements[elementIdx].options = getOptionsSchema(options);
      }
      return newSchema;
    });
  }, [name, setSchema, pageName]);

  const questionId = id ?? "";
  const Question = createQuestionElement(type, { id: questionId, type, data: config });
  const handleUpdateSubmission = (preData: PreSubmissionData) => {};
  return (
    <div>
      {currentPageIdx === schema.pages.findIndex((p: any) => p.name === pageName) && (
        <div>
          <Question onSubmissionChange={handleUpdateSubmission}></Question>
        </div>
      )}
    </div>
  );
};
