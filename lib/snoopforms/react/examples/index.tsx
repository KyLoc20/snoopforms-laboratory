import { SnoopElement } from "../components/SnoopElement";
import { SnoopPage } from "../components/SnoopPage";
import { SnoopForm } from "../components/SnoopForm";
export default function YourFirstForm() {
  return (
    <SnoopForm domain="app.snoopforms.com" protocol="http" formId="abcd">
      <SnoopPage name="basicInfo">
        <SnoopElement type="text" name="name" label="Your name" required />
        <SnoopElement type="textarea" name="about" label="About you" required />
        <SnoopElement name="submit" type="submit" label="Submit" />
      </SnoopPage>
      <SnoopPage name="advancedInfo">
        <SnoopElement
          type="checkbox"
          name="programming-lanuguages"
          label="What programming languages do you love?"
          options={["C++", "Javascript", "Scala", "Assembler"]}
        />
        <SnoopElement name="submit" type="submit" label="Submit" />
      </SnoopPage>
      <SnoopPage name="thankyou" thankyou>
        <p>Thanks a lot for your time and insights 🙏</p>
      </SnoopPage>
    </SnoopForm>
  );
}
