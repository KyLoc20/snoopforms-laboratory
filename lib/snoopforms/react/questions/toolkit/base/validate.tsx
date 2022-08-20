import { useEffect, useState, useRef } from "react";
export default function useInputValidator(canSubmit: boolean) {
  const [shouldShowReminder, setShouldShowReminder] = useState(false);
  const hideReminder = () => setShouldShowReminder(false);
  const showReminder = () => setShouldShowReminder(true);
  const Validator = () => {
    return (
      <input
        style={{ position: "absolute", width: "1px", height: "1px", margin: "-1px", overflow: "hidden", clip: "rect(0px, 0px, 0px, 0px)" }}
        type="text"
        name="validator"
        value={(canSubmit && "yes") || "no"}
        onInvalid={(e) => {
          //fires before onSubmit if HTMLInputElement.checkValidity() returns false
          //   e.currentTarget.setCustomValidity("Hi");
          e.preventDefault();
          showReminder();
          /**
           * Warning: You provided a `value` prop to a form field without an `onChange` handler.
           * This will render a read-only field.
           * If the field should be mutable use `defaultValue`.
           * Otherwise, set either `onChange` or `readOnly`.
           * But Readonly inputs are barred from constraint validation
           */
        }}
        pattern="yes"
        onChange={() => {}}
      />
    );
  };
  return { Validator, shouldShowReminder, hideReminder };
}
