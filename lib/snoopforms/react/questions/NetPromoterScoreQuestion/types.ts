//for BuilderComponent.props.onDataChange BuilderComponent.props.initialData
//for UserComponent.props.config
export type NetPromoterScoreQuestionConfigData = {
  title: string;
  isRequired: boolean; //for builder
  bestText: string;
  worstText: string;
};
//for UserComponent.props.onSubmissionChange UserComponent.props.initialData
//ResponseDisplay.props.data
export type NetPromoterScoreQuestionSubmissionData = {
  score: number; //[0-10] -1 means null
};
