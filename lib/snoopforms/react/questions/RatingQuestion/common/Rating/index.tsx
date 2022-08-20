import { PropsWithChildren, useEffect, useState } from "react";
interface RatingProps {
  options: { name: string }[];
  onChange?: (value: number) => void;
  icon?: "stars" | "hearts";
  defaultValue?: number;
}
export default function Rating({ defaultValue, options, icon, onChange }: RatingProps) {
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
  useEffect(() => {
    onChange?.(value);
  }, [value]);
  return (
    <>
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
              <DumbRatingEntry
                label={index + 1}
                active={valueHovering > -1 ? valueHovering >= index : value >= index}
                hovered={valueHovering === index}
                icon={icon ?? "stars"}
              />
            </div>
          ))}
        </div>
      </div>
      <style>{RATING_STYLE}</style>
    </>
  );
}
function DumbRatingEntry({ active, hovered, label, icon }: { active: boolean; hovered: boolean; label: string | number; icon: "stars" | "hearts" }) {
  switch (icon) {
    case "hearts":
      return (
        <div className={`rating-entry`} style={{ marginRight: "8px", color: active ? "#ff6d75" : "rgba(0, 0, 0, 0.26)" }}>
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
                <path
                  className="heart-filled"
                  d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                ></path>
              ) : (
                <path
                  className="heart-stroked"
                  d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                ></path>
              )}
            </svg>
          </div>
          <div style={{ lineHeight: "24px", textAlign: "center", marginTop: "8px" }}>{label}</div>
        </div>
      );
    case "stars":
    default:
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
}

const RATING_STYLE = `
 .rating{

 }

 .rating .entry-list{
 
 }

 .rating .rating-entry:hover{
  
 }

`;
