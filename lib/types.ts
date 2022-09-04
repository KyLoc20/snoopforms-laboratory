export type BlockData = {
  id: string; //if this Block represents a Question, this is the questionId
  type: string;
  data: any;
};
export type NoCodeFormData = {
  formId: string;
  name: string;
  blocksDraft: BlockData[];
  blocks: BlockData[];
};
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

export type SubmissionSession = {
  id: string;
  createdAt: string;
  updatedAt: string;
  form?: any;
  userFingerprint: string;
  // events: ApiEvent[];
};
export type QuestionSummary = {
  questionId: string;
  questionTitle: string;
  questionType: string;
  questionConfig: any; //from BuilderComponet
  submissionResults: any; //from UserComponent
};
