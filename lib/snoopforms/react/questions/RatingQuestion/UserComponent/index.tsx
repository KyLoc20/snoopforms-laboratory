import { useEffect, useState } from "react";
import Rating from "../common/Rating";
import Mark from "../common/Mark";
import { QuestionTitle } from "../../toolkit/ui";
type AvailableIcon = "stars" | "hearts";
export type RatingComponentCustomData = {
  title: string;
  num: number; //for builder
  icon: AvailableIcon; //for builder
  isRequired: boolean; //for builder
};
interface RatingQuestionProps {
  onDataChange: (data: RatingComponentCustomData) => void;
  initialData: RatingComponentCustomData;
}
export default function UserComponent({ onDataChange, initialData }: RatingQuestionProps) {
  const [title, setTitle] = useState(initialData.title);
  const [num, setNum] = useState(initialData.num);
  const [icon, setIcon] = useState<AvailableIcon>(initialData.icon);
  const [isRequired, setIsRequired] = useState(initialData.isRequired);
  useEffect(() => {
    onDataChange({ title, num, icon, isRequired });
  }, [title, num, icon, isRequired]);
  return (
    <div className="question-container" style={{ paddingBottom: "20px" }}>
      <div style={{ position: "relative" }}>
        <QuestionTitle title={title} />
        <Mark active={isRequired}></Mark>
      </div>
      <div style={{ marginTop: "8px" }}>
        <Rating
          options={Array(num)
            .fill(0)
            .map((_, n) => ({ name: n.toString() }))}
          icon={icon}
        ></Rating>
      </div>
    </div>
  );
}
