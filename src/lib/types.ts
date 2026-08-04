export type UserRole = "researcher" | "doctor" | "student" | "administrator";

export interface User {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  institution?: string | null;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface Patient {
  id: string;
  patient_name: string;
  age?: number | null;
  gender?: string | null;
  blood_group?: string | null;
  medical_history?: string | null;
  disease_history?: string | null;
  created_at: string;
}

export interface DrugRecommendation {
  drug_name: string;
  effectiveness?: number | null;
  dosage_suggestion?: string | null;
  side_effects?: string | null;
  interactions?: string | null;
  alternatives?: string | null;
  risk_level?: string | null;
}

export interface Prediction {
  id: string;
  patient_id: string;
  disease: string;
  risk_level?: string | null;
  confidence: number;
  probability: number;
  recommended_drug?: string | null;
  model_version?: string | null;
  inference_time_ms?: number | null;
  created_at: string;
  drug_recommendations: DrugRecommendation[];
}

export interface DashboardStats {
  total_patients: number;
  total_uploads: number;
  total_predictions: number;
  disease_categories: number;
  drug_recommendations: number;
}
