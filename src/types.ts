export interface UserSession {
  token: string;
  name: string;
  email: string;
  picture: string;
}

export interface ApplicationForm {
  fullName: string;
  organization: string;
  idea: string;
  servicesRequired: string[];
  pitchDeck: File | null;
  website?: string;
}

export interface SubmissionRecord {
  id: string;
  fullName: string;
  applicantEmail: string;
  organization: string;
  website: string;
  idea: string;
  servicesRequired: string[];
  pitchDeckName?: string;
  submittedAt: string;
  isRealEmailSent: boolean;
}
