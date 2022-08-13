import { PropsWithChildren, useState } from "react";
interface RatingProps {
  options: { name: string }[];
  defaultValue?: number;
}
export default function Rating({ defaultValue, options }: RatingProps) {
  const [value, setValue] = useState(defaultValue ?? -1); // -1 means no entry selected
  const [valueHovering, setValueHovering] = useState(-1); // -1 means no entry being hovered
  const handleSelect = (index: number) => {
    if (value === index) {
      //reset
      setValue(-1);
      setValueHovering(-1);
    } else {
      //select this one
      setValue(index);
    }
  };
  return (
    <>
      {/* ["awful", "bad", "not bad", "good", "awesome"] */}
      <div className="rating" style={{ display: "inline-flex" }}>
        <div className="entry-list" style={{ display: "flex" }}>
          {options.map((option, index) => (
            <div
              className="entry-wrapper"
              style={{ cursor: "pointer" }}
              key={index}
              onMouseEnter={() => setValueHovering(index)}
              onMouseLeave={() => setValueHovering(-1)}
              onClick={() => handleSelect(index)}
            >
              <DumbRatingEntry label={index + 1} active={valueHovering > -1 ? valueHovering >= index : value >= index} hovered={valueHovering === index} />
            </div>
          ))}
        </div>
      </div>
      <style>{RATING_STYLE}</style>
    </>
  );
}
function DumbRatingEntry({ active, hovered, label }: { active: boolean; hovered: boolean; label: string | number }) {
  return (
    <div className={`rating-entry`} style={{ marginRight: "8px", color: active ? "#faaf00" : "rgba(0, 0, 0, 0.26)" }}>
      <div
        className="icon-wrapper"
        style={{
          transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          transform: hovered ? "scale(1.2)" : undefined,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" width={36} height={36} fill="currentColor">
          {active ? (
            <path className="star-filled" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
          ) : (
            <path
              className="star-stroked"
              d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
            ></path>
          )}
        </svg>
      </div>
      <div style={{ lineHeight: "24px", textAlign: "center", marginTop: "8px" }}>{label}</div>
    </div>
  );
}
const RATING_STYLE = `
 .rating{

 }

 .rating .entry-list{
 
 }

 .rating .rating-entry:hover{
  
 }

`;
