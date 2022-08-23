export type AvailableIcon = "stars" | "hearts";
//for BuilderComponent.props.onDataChange BuilderComponent.props.initialData
//for UserComponent.props.config
export type RatingQuestionConfigData = {
  title: string;
  num: number; //for builder
  icon: AvailableIcon; //for builder
  isRequired: boolean; //for builder
};
//for UserComponent.props.onSubmissionChange UserComponent.props.initialData
//ResponseDisplay.props.data
export type RatingQuestionSubmissionData = {
  ratings: number;
};
