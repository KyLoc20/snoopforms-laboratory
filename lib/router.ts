import { useState, useEffect } from "react";
import { useRouter } from "next/router";
export const useFormIdSafely = (onError?: () => void) => {
  const router = useRouter();
  const [formId, setFormId] = useState<undefined | string>(undefined); //"__unknown"
  const possibleFormId = router.query.id?.toString();
  useEffect(() => {
    if (possibleFormId === undefined) {
    } else {
      setFormId(possibleFormId);
    }
  }, [possibleFormId]);
  return { formId, isValid: Boolean(formId) };
};

export const useNavigation = (route?: string) => {
  const router = useRouter();
  const navigateTo = (_route: string) => router.push(_route);
  const navigate = () => router.push(route ?? "");
  return { navigate, navigateTo };
};
