import { useState, useCallback, PropsWithChildren } from "react";
/**
 *
 * @param validationError if "", it has passed validations
 * @returns
 */
export default function useInputValidator(validationError: string) {
  const canSubmit = !Boolean(validationError);
  const [shouldAlarm, setShouldAlarm] = useState(false);
  const hideAlarm = () => setShouldAlarm(false);
  const showAlarm = () => setShouldAlarm(true);
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

          //showAlarm() will not block submit event
          // setTimeout(showReminder, 0);
          showAlarm();

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
  return { Validator, shouldAlarm, hideAlarm, validationError };
}
export function AlarmPlaceholder({ children }: PropsWithChildren<{}>) {
  return (
    <div style={{ position: "absolute", padding: "0 12px", bottom: "2px", left: "0", lineHeight: "16px", color: "#f53b57", fontSize: "14px" }}>
      <i>{children}</i>
    </div>
  );
}
