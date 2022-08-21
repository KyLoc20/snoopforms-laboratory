import { useState, useCallback } from "react";
export default function useInputValidator(canSubmit: boolean) {
  const [shouldShowReminder, setShouldShowReminder] = useState(false);
  const hideReminder = () => setShouldShowReminder(false);
  const showReminder = () => setShouldShowReminder(true);
  const Validator = useCallback(() => {
    return (
      <input
        style={{ position: "absolute", width: "1px", height: "1px", margin: "-1px", overflow: "hidden", clip: "rect(0px, 0px, 0px, 0px)" }}
        type="text"
        name="validator"
        value={(canSubmit && "yes") || "no"}
        onInvalid={(e) => {
          e.preventDefault(); //if preventDefault, no error info will display, otherwise use e.currentTarget.setCustomValidity("Hi");
          //fires before onSubmit if HTMLInputElement.checkValidity() returns false

          //showReminder() will not block submit event
          // setTimeout(showReminder, 0);
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
  }, [canSubmit]);
  return { Validator, shouldShowReminder, hideReminder };
}
