import { SubmissionData, BlockData } from "@/lib/types";
import { isQuestionType } from "@/lib/snoopforms/react/questions";
import { generateId } from "@/lib/utils";
export { getFormPagination, getSubmissionPagination, getQuestionTitleMap };
export type { TitleMap };
type QuestionId = string;
const getFormPagination = (blocks: BlockData[]) => {
  const pages: List<QuestionId[]> = [];
  let cPage: QuestionId[] = [];
  blocks.forEach((block) => {
    const { id, type } = block;
    if (isQuestionType(type)) {
      cPage.push(id);
    }
    if (type === "pageTransition") {
      pages.push(cPage);
      cPage = [];
    }
  });
  if (cPage.length > 0) {
    pages.push(cPage);
  }
  return pages;
};
type List<T> = T[];
type SubmissionPage = List<SubmissionData>;
const getSubmissionPagination = (submissions: SubmissionData[], formPages: List<QuestionId[]>): List<SubmissionPage> => {
  const pages: List<SubmissionPage> = formPages.map((questions) => {
    const submissionPage = questions.map((questionId) => {
      const possibleAnswer = submissions.find((answer) => answer.questionId === questionId);
      if (possibleAnswer !== undefined) {
        return possibleAnswer;
      } else {
        //basically this won't happen cuz all submissions are here
        return {
          id: generateId(10),
          questionId: questionId,
          questionType: "unknown",
          details: {},
        } as SubmissionData;
      }
    });
    return submissionPage;
  });
  return pages;
};

type TitleMap = { [questionId: string]: string };
const getQuestionTitleMap = (blocks: BlockData[]) => {
  //init a Map: questionId -> questionTitle
  const questionTitleMap: TitleMap = {};
  blocks.forEach((block) => {
    const { id, type, data } = block;
    if (isQuestionType(type)) {
      //todo questionConfig: data._component dangerous
      questionTitleMap[id] = (data?._component?.title as string) ?? id;
    }
  });
  return questionTitleMap;
};
