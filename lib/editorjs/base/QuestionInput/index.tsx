export default function QuestionInput({ placeholder }: { placeholder?: string }) {
  return (
    <div className="question-input" style={{ color: "rgba(56, 70, 84, 1)", height: "28px", display: "flex", alignItems: "center" }}>
      <input type="text" placeholder={placeholder ?? "Your Question"} style={{ width: "100%", lineHeight: "24px", fontSize: "16px", fontWeight: 700 }} />
    </div>
  );
}
