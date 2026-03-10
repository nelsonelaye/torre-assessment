export interface TorreSearchStreamEntity {
  ardaId: number;
  ggId: string;
  name: string;
  comparableName: string;
  username: string;
  professionalHeadline: string;
  imageUrl: string;
  completion: number;
  grammar: number;
  weight: number;
  verified: boolean;
  connections: any[];
  totalStrength: number;
  pageRank: number;
  organizationId: string | null;
  organizationNumericId: number | null;
  publicId: string | null;
  status: string | null;
  creators: any[];
  relationDegree: number;
  isSearchable: boolean;
  contact: boolean;
  locationName?: string; // Sometimes present in stream lines based on earlier implementation
}
