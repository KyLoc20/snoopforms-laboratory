export type BlockData = {
  id: string;
  type: string;
  data: any;
};
export type NoCodeFormData = {
  formId: string;
  blocksDraft: BlockData[];
  blocks: BlockData[];
};
export type SubmissionData = {
  submissionId: string;
  questionId: string; //BlockData->id
  questionType: string;
  details: any; //content
};
