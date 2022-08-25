import { SnoopElement } from "../components/SnoopElement";
import { SnoopPage } from "../components/SnoopPage";
import { SnoopForm } from "../components/SnoopForm";
export default function YourFirstForm() {
  return (
    <SnoopForm domain="app.snoopforms.com" protocol="http" formId="abcd">
      <SnoopPage name="Page 1">
        <SnoopElement type="ratingQuestion" name="q1" />
        <SnoopElement name="submit" type="submit" label="Submit" />
      </SnoopPage>
      <SnoopPage name="Page 2">
        <SnoopElement type="ratingQuestion" name="q2" />
        <SnoopElement name="submit" type="submit" label="Submit" />
      </SnoopPage>
      <SnoopPage name="thankyou" thankyou>
        <p>Thanks a lot for your time and insights 🙏</p>
      </SnoopPage>
    </SnoopForm>
  );
}
