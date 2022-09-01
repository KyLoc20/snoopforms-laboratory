export interface ClassNames {
  label?: string;
  element?: string;
  radioOption?: string | ((bag: any) => string) | undefined;
  radioGroup?: string;
  elementLabel?: string;
  button?: string;
}
export type SubmissionData = {
  id: string;
  questionId: string; //BlockData->id
  questionType: string;
  details: any; //content
};
/**
 * a group of SubmissionData
 * a SubmissionSessionData refers to a complete form submission including all kinds of Questions
 */
export type SubmissionSessionData = {
  formId: string;
  id: string;
  submissions: SubmissionData[];
  createdAt: string;
  updatedAt: string;
};
