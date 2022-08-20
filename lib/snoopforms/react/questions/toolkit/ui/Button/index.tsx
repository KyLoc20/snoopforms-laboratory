import { MouseEventHandler, PropsWithChildren } from "react";
import { FORM_GRAY_1 } from "../../base/design";
export default function Button({ children, onClick }: PropsWithChildren<{ onClick?: MouseEventHandler<HTMLButtonElement> }>) {
  return (
    <button
      onClick={onClick}
      className="mr-3 justify-center mt-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
      style={{ marginTop: "8px", padding: "6px 10px", borderRadius: "8px", color: FORM_GRAY_1 }}
    >
      {children}
    </button>
  );
}
