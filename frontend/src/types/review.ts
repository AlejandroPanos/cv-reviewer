interface AssessmentCategory {
  score: number;
  actionablePoints: string[];
}

interface OverallAssessment {
  score: number;
  text: string;
}

interface Review {
  _id: string;
  userId: string;
  resumeText: string;
  jobDescriptionText: string;
  overallAssessment: OverallAssessment;
  atsOptimization: AssessmentCategory;
  impactQuantification: AssessmentCategory;
  structureReadability: AssessmentCategory;
  redFlags: AssessmentCategory;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type { Review, AssessmentCategory, OverallAssessment };
