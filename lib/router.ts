import { useState, useEffect } from "react";
import { useRouter } from "next/router";
export const useFormIdSafely = (onError?: () => void) => {
  const router = useRouter();
  const [formId, setFormId] = useState<undefined | string>(undefined); //"__unknown"
  const possibleFormId = router.query.id?.toString();
  useEffect(() => {
    console.log("possibleFormId useEffect", possibleFormId);
    if (possibleFormId === undefined) {
    } else {
      setFormId(possibleFormId);
    }
  }, [possibleFormId]);
  return { formId, isValid: Boolean(formId) };
};
