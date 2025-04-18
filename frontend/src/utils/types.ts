export enum UserRole {
    VICTIM = "VICTIM",
    DONOR = "DONOR",
    NGO = "NGO",
    GOVERNMENT = "GOVERNMENT"
  }
  
  export enum DisasterType {
    FLOOD = "FLOOD",
    EARTHQUAKE = "EARTHQUAKE",
    CYCLONE = "CYCLONE",
    DROUGHT = "DROUGHT",
    LANDSLIDE = "LANDSLIDE",
    FIRE = "FIRE",
    OTHER = "OTHER"
  }
  
  export enum RequestStatus {
    PENDING = "PENDING",
    ONGOING = "ONGOING",
    CRITICAL = "CRITICAL",
    RESOLVED = "RESOLVED"
  }
  
  export enum DonationCategory {
    FOOD = "FOOD",
    MONETARY = "MONETARY",
    MEDICAL = "MEDICAL",
    CLOTHING = "CLOTHING",
    SHELTER = "SHELTER",
    OTHER = "OTHER"
  }
  
  export interface DisasterProject {
    id: number;
    title: string;
    location: string;
    type: DisasterType;
    status: RequestStatus;
    managingNgo: string;
    ngoId: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    victims: number;
    updates: ProjectUpdate[];
    images: string[];
  }
  
  export interface ProjectUpdate {
    id: number;
    content: string;
    timestamp: string;
  }
  
  export interface VictimRequest {
    id: number;
    name: string;
    phoneNumber: string;
    location: string;
    description: string;
    mediaFiles: string[];
    status: RequestStatus;
    createdAt: string;
    projectId: number;
  }
  
  export interface Ngo {
    id: number;
    name: string;
    operationAreas: string[];
    inauguratedOn: Date;
    accomplishments: NgoAccomplishment[];
    status: "PENDING" | "APPROVED" | "REJECTED";
    projectIds: number[];
    contactEmail: string;
    contactPhone: string;
  }
  
  export interface NgoAccomplishment {
    title: string;
    description: string;
    year: number;
    mediaFiles: string[];
  }
  
  export interface Donation {
    id: number;
    donorId: number;
    projectId: number;
    category: DonationCategory;
    details: any;
    status: "PENDING" | "IN_TRANSIT" | "RECEIVED";
    createdAt: string;
    creditPoints: number;
  }
  
  export interface Donor {
    id: number;
    name: string;
    phoneNumber: string;
    aadharNumber: string;
    donations: number[];
    totalCreditPoints: number;
    createdAt: string;
  }