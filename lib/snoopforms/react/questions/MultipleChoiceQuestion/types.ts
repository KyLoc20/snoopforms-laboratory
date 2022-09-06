//for BuilderComponent.props.onDataChange BuilderComponent.props.initialData
//for UserComponent.props.config
export type MultipleChoiceQuestionConfigData = {
  title: string;
  isRequired: boolean; //for builder
  onlyOne: boolean; // false means it allows multiple selections
  options: ChoiceOption[];
};
//for UserComponent.props.onSubmissionChange UserComponent.props.initialData
//ResponseDisplay.props.data
export type MultipleChoiceQuestionSubmissionData = {
  choiceList: ChoiceOption[];
};
export type ChoiceOption = {
  label: string;
  value: string;
};
