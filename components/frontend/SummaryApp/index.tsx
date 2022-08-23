import { useMemo } from "react";
import { useSubmissionSessions } from "@/lib/submissionSession";
import AnalyticsCard from "./AnalyticsCard";
import { useNoCodeForm } from "@/lib/noCodeForm";
import { SubmissionData, SubmissionSessionData, NoCodeFormData } from "@/lib/types";
import { QuestionSummary } from "@/lib/types";
import { createSummaryAnalyzer, createSummaryDisplay, isQuestionType } from "@/lib/snoopforms/react/questions";

export default function SummaryApp({ formId }: { formId: string }) {
  const { noCodeForm } = useNoCodeForm(formId);
  const { submissionSessions } = useSubmissionSessions(formId);
  console.log("RENDER SummaryApp fetched noCodeForm: ", noCodeForm);
  const summaryList = getSummary(submissionSessions, noCodeForm);
  return (
    <section className="w-full h-full max-w-5xl mx-auto">
      <Overview></Overview>
      <SummaryList list={summaryList}></SummaryList>
    </section>
  );
}
function Overview({}) {
  return (
    <>
      <h2 className="mt-8 text-xl font-bold text-ui-gray-dark">Responses Overview</h2>
      <dl className="grid grid-cols-1 gap-5 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {Stats.map((item) => (
          <AnalyticsCard
            key={item.id}
            value={item.stat}
            label={item.name}
            toolTipText={item.toolTipText ?? ""}
            trend={item.trend}
            smallerText={item.smallerText}
          />
        ))}
      </dl>
    </>
  );
}

createSummaryDisplay;
function SummaryList({ list }: { list: QuestionSummary[] }) {
  console.log("RENDER SummaryList", list);
  return (
    <div>
      {list.map((summary, _) => (
        <div key={summary.questionId}>{createSummaryDisplay(summary.questionType)(summary)}</div>
      ))}
    </div>
  );
}

const Stats = [
  {
    id: "uniqueUsers",
    name: "Unique Users",
    stat: "--",
    toolTipText: "Tracked without cookies using fingerprinting technique",
    trend: undefined,
  },
  {
    id: "totalSubmissions",
    name: "Total Submissions",
    stat: "--",
    trend: undefined,
  },
  {
    id: "lastSubmission",
    name: "Last Submission",
    stat: "--",
    smallerText: true,
  },
];

/**
 * group all submissions by questionId, generate Summary according to questionType
 * should do it in the server
 * @param submissionData
 * @param formData
 */
function getSummary(submissionData: SubmissionSessionData[], formData: NoCodeFormData) {
  //init summaryData
  //todo should be formData.blocks
  const summaryData: { [questionId: string]: QuestionSummary } = {};
  formData.blocksDraft.forEach((block) => {
    const { id, type, data } = block;
    if (isQuestionType(type)) {
      //todo questionConfig: data._component dangerous
      summaryData[id] = {
        questionId: id,
        questionTitle: data._component?.title ?? id,
        questionType: type,
        questionConfig: data._component,
        submissionResults: undefined,
      };
    }
  });

  console.log("getSummary formData", formData);
  console.log("getSummary submissionData", submissionData);
  console.log("getSummary summaryData", summaryData);

  //collect all submissions
  const allSubmissions: SubmissionData[] = [];
  submissionData.forEach((session) => {
    allSubmissions.push(...session.submissions);
  });
  console.log("getSummary allSubmissions", allSubmissions);
  for (const [questionId, { questionType, questionConfig }] of Object.entries(summaryData)) {
    const submissonsToThisQuestion = allSubmissions.filter((submission) => submission.questionId === questionId);
    const submissionDetails = submissonsToThisQuestion.map((item, _) => item.details);
    console.log("getSummary submissionDetails", submissionDetails);

    //get this Question's analyzer from the factory
    const analyzer = createSummaryAnalyzer(questionType);
    const summaryResults = analyzer(questionConfig, submissionDetails);
    console.log("getSummary summaryResults", summaryResults);

    //set results
    summaryData[questionId].submissionResults = summaryResults;
  }
  console.log("getSummary return", Object.values(summaryData));
  return Object.values(summaryData);
  //e.g.
  // return [
  //   {
  //     questionId: "3",
  //     questionType: "ratingQuestion",
  //     questionConfig: { num: 10, icon: "hearts", isRequired: false, title: "How do you like this stuff?" },
  //     submissionResults: [
  //       { key: "1", value: 1 },
  //       { key: "2", value: 2 },
  //       { key: "3", value: 3 },
  //     ],
  //   },
  //   {
  //     questionId: "4",
  //     questionType: "ratingQuestion",
  //     questionConfig: { num: 5, icon: "stars", isRequired: true, title: "How do you like that stuff?" },
  //     submissionResults: [
  //       { key: "1", value: 1 },
  //       { key: "2", value: 2 },
  //       { key: "3", value: 3 },
  //     ],
  //   },
  // ];
}
