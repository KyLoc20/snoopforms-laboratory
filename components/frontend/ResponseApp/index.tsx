import { useEffect, useState, PropsWithChildren } from "react";
import { useSubmissionSessions } from "@/lib/submissionSession";
import { SubmissionSessionData } from "@/lib/types";
import SessionDetails from "./SessionDetails";
import Loading from "@/components/layout/Loading";
import { toast } from "react-toastify";
import SessionCardWithTimeline from "./SessionCard";
import SessionList from "./SessionList";
import clsx from "clsx";
import styles from "./ResponseApp.module.css";
export default function ResponseApp({ formId }: { formId: string }) {
  // const { mutate } = useSWRConfig();
  const { submissionSessions, isLoading, mutate } = useSubmissionSessions(formId);
  const [activeSubmissionSession, setActiveSubmissionSession] = useState<SubmissionSessionData | null>(null);
  const hasActiveSubmissionSession = activeSubmissionSession !== null;

  useEffect(() => {
    if (!isLoading && submissionSessions.length > 0) {
      setActiveSubmissionSession(submissionSessions[0]);
    } else {
      setActiveSubmissionSession(null);
    }
  }, [isLoading, submissionSessions]);

  const handleDelete = async (sessionId: string) => {
    if (confirm("Are you sure you want to delete this submission? It will be gone forever!")) {
      try {
        // //way A
        // fetch(`/api/forms/${formId}/submissionSessions/${sessionId}`, {
        //   method: "DELETE",
        // }).then((res) => {
        //   toast("Successfully Deleted");
        //   const updatedSubmissionSessions = submissionSessions.filter((session) => session.id !== sessionId);
        //   mutate(updatedSubmissionSessions);
        // });

        // //way B Mutate Based on Current Data
        // mutate(
        //   async (sessions: SubmissionSessionData[]) => {
        //     console.log("mutate:", sessions);
        //     await fetch(`/api/forms/${formId}/submissionSessions/${sessionId}`, {
        //       method: "DELETE",
        //     });
        //     toast("Successfully Deleted");
        //     const updatedSubmissionSessions = sessions.filter((session) => session.id !== sessionId);
        //     return [...updatedSubmissionSessions];
        //   },
        //   { revalidate: false }
        // );

        //way C Optimistical
        const updatedSubmissionSessionsOptimistically = [...submissionSessions.filter((session) => session.id !== sessionId)];
        mutate(
          async (sessions: SubmissionSessionData[]) => {
            console.log("mutate:", sessions);
            await fetch(`/api/forms/${formId}/submissionSessions/${sessionId}`, {
              method: "DELETE",
            });
            toast("Successfully Deleted");
            const updatedSubmissionSessions = sessions.filter((session) => session.id !== sessionId);
            return [...updatedSubmissionSessions];
          },
          { optimisticData: updatedSubmissionSessionsOptimistically, rollbackOnError: true }
        );
        setActiveSubmissionSession(null);
      } catch (error) {
        toast(<div>error</div>);
      }
    }
  };
  if (isLoading) {
    return <Loading />;
  } else
    return (
      <Container>
        <aside className={clsx(styles.aside, "flex flex-col flex-1 h-full border-r border-ui-gray-light")}>
          <SessionList sessions={submissionSessions} activeSession={activeSubmissionSession} setActiveSubmissionSession={setActiveSubmissionSession} />
        </aside>
        <main className="relative flex flex-1 justify-center items-start">
          <>
            <MobileWrapper>
              {submissionSessions.map((session, i) => (
                <SessionCardWithTimeline key={session.id} session={session} onDelete={handleDelete}>
                  <SessionDetails submissions={session.submissions} formId={formId} />
                </SessionCardWithTimeline>
              ))}
            </MobileWrapper>
          </>
          <>
            <DesktopWrapper>
              {hasActiveSubmissionSession ? (
                <SessionCardWithTimeline session={activeSubmissionSession} onDelete={handleDelete}>
                  <SessionDetails submissions={activeSubmissionSession.submissions} formId={formId} />
                </SessionCardWithTimeline>
              ) : (
                <Reminder />
              )}
            </DesktopWrapper>
          </>
        </main>
      </Container>
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

function MobileWrapper({ children }: PropsWithChildren<{}>) {
  return <ul className={clsx(styles.mobileWrapper)}>{children}</ul>;
}
function DesktopWrapper({ children }: PropsWithChildren<{}>) {
  return <div className={clsx(styles.desktopWrapper)}>{children}</div>;
}
function Container({ children }: PropsWithChildren<{}>) {
  return (
    <section className={clsx("response-app-container", "w-full h-full")}>
      <div className="relative flex flex-1">{children}</div>
    </section>
  );
}
