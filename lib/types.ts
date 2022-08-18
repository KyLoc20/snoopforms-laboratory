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
