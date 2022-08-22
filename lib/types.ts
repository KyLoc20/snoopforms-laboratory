export type BlockData = {
  id: string; //if this Block represents a Question, this is the questionI
  type: string;
  data: any;
};
export type NoCodeFormData = {
  formId: string;
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
