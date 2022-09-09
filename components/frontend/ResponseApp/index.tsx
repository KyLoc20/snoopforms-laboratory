import { useEffect, useState } from "react";
import { useSubmissionSessions } from "@/lib/submissionSession";
import { SubmissionSessionData } from "@/lib/types";
import SubmissionSessionDisplay from "./SubmissionDisplay";
import Loading from "@/components/layout/Loading";
import { toast } from "react-toastify";
import ActiveSessionCard from "./ActiveSessionCard";
import SessionList from "./SessionList";
import clsx from "clsx";
import styles from "./ResponseApp.module.css";
export default function ResponseApp({ formId }: { formId: string }) {
  const { submissionSessions, isLoading, mutate: mutateSubmissionSessions } = useSubmissionSessions(formId);
  const [activeSubmissionSession, setActiveSubmissionSession] = useState<SubmissionSessionData | null>(null);
  const hasActiveSubmissionSession = activeSubmissionSession !== null;

  useEffect(() => {
    if (!isLoading && submissionSessions.length > 0) {
      setActiveSubmissionSession(submissionSessions[0]);
    }
  }, [isLoading, submissionSessions]);

  const handleDelete = async (sessionId: string) => {
    if (confirm("Are you sure you want to delete this submission? It will be gone forever!")) {
      try {
        await fetch(`/api/forms/${formId}/submissionSessions/${sessionId}`, {
          method: "DELETE",
        });
        await mutateSubmissionSessions();
        setActiveSubmissionSession(null);
        toast("Successfully Deleted");
      } catch (error) {
        toast(<div>error</div>);
      }
    }
  };
  if (isLoading) {
    return <Loading />;
  } else
    return (
      <section className="w-full h-full">
        <div className="flex flex-col flex-1 w-full h-full mx-auto overflow-visible max-w-screen">
          <div className="relative z-0 flex flex-1 h-full overflow-visible">
            <main className="relative flex flex-1 justify-center items-start">
              {hasActiveSubmissionSession ? (
                <ActiveSessionCard session={activeSubmissionSession} onDelete={handleDelete}>
                  <SubmissionSessionDisplay key={activeSubmissionSession.id} submissionSession={activeSubmissionSession} formId={formId} />
                </ActiveSessionCard>
              ) : (
                <Reminder />
              )}
            </main>

            <aside className={clsx(styles.aside, "flex flex-col flex-1 order-first h-full border-r border-ui-gray-light")}>
              <SessionList sessions={submissionSessions} activeSession={activeSubmissionSession} setActiveSubmissionSession={setActiveSubmissionSession} />
            </aside>

            {/* <aside className="flex flex-col flex-1 flex-shrink-0 order-first h-full border-r border-ui-gray-light md:flex-none md:w-96">
              <SessionList sessions={submissionSessions} activeSession={activeSubmissionSession} setActiveSubmissionSession={setActiveSubmissionSession} />
            </aside> */}
          </div>
        </div>
      </section>
    );
}
function Reminder({}) {
  return (
    <button
      type="button"
      className="relative block p-12 mx-auto mt-8 text-center border-2 border-gray-300 border-dashed rounded-lg w-96 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <span className="block mt-2 text-sm font-medium text-gray-500">Select a response on the left to see the details here</span>
    </button>
  );
}
