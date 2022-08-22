import { useMemo } from "react";
import { useSubmissionSessions } from "@/lib/submissionSessions";
import AnalyticsCard from "./AnalyticsCard";
import TextResults from "./TextResults";
import ChoiceResults from "./ChoiceResults";
import { SubmissionData, SubmissionSessionData } from "@/lib/types";
import { Summary } from "./BaseResults";
/**
 * group all submissions by questionId, generate Summary according to questionType
 * should do it in the server
 * @param data
 */
function getSummary(data: SubmissionSessionData[]) {
  const allSubmissions: SubmissionData[] = [];
  data.forEach((session) => {
    allSubmissions.concat(session.submissions);
  });
  const QUESTIONS = ["3", "4"];
  const summary: { [id: string]: number } = {};
  allSubmissions.forEach((submission) => {
    if (submission.questionId === "3") {
      summary["3"] = summary["3"] ? summary["3"] + 1 : 1;
    }
    if (submission.questionId === "4") {
      summary["4"] = summary["4"] ? summary["4"] + 1 : 1;
    }
  });
  return [
    {
      questionId: "3",
      questionType: "ratingQuestion",
      result: [
        { key: "1", value: 1 },
        { key: "2", value: 2 },
        { key: "3", value: 3 },
      ],
    },
    {
      questionId: "4",
      questionType: "ratingQuestion",
      result: [
        { key: "1", value: 1 },
        { key: "2", value: 2 },
        { key: "3", value: 3 },
      ],
    },
  ];
}

export default function SummaryApp({ formId }: { formId: string }) {
  const { submissionSessions, isLoadingSubmissionSessions } = useSubmissionSessions(formId);
  const summaryList = getSummary(submissionSessions);
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
function SummaryList({ list }: { list: Summary[] }) {
  return (
    <div>
      {list.map((summary, _) => (
        <div key={summary.questionId}>{summary.questionType === "text" ? <TextResults element={summary} /> : <ChoiceResults element={summary} />}</div>
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
