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
import { SubmissionContext } from "../SnoopForm";
import { PageContext } from "../SnoopPage";
import { createQuestionElement, PreSubmissionData } from "../../questions";
import { generateId } from "@/lib/utils";
export interface SnoopElementProps {
  type: string; //questionType
  classNames?: ClassNames; //to customize the styles of its UI parts
  id?: string; //questionId, should be a must for a Question
  config?: any;
}

export function SnoopElement(props: SnoopElementProps) {
  const { type, classNames = {} } = props;
  const { id, config } = props;
  const pageName = useContext(PageContext);
  const { update } = useContext(SubmissionContext);
  const questionId = id ?? generateId(10);
  const Question = createQuestionElement(type, generateBlockData(questionId, type, config));
  const handleUpdateOneSubmission = (preData: PreSubmissionData) => {
    update(pageName, [preData]);
  };
  return (
    <div className="snoopform-element">
      <Question onSubmissionChange={handleUpdateOneSubmission}></Question>
    </div>
  );
}
const generateBlockData = (id: string, type: string, config: any) => ({
  id,
  type,
  data: {
    _component: config,
  },
});
