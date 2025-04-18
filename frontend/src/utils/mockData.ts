import { DisasterType, DonationCategory, RequestStatus, UserRole } from "./types";

export const disasterProjects = [
  {
    id: 1,
    title: "Cyclone Relief - Eastern Coast",
    location: "Vishakhapatnam, Andhra Pradesh",
    type: DisasterType.CYCLONE,
    status: RequestStatus.ONGOING,
    managingNgo: "Coastal Relief Foundation",
    ngoId: 3,
    description: "Providing emergency shelter, food, and medical care to communities affected by the recent cyclone that hit the eastern coast. Over 5,000 families have been displaced and require immediate assistance.",
    createdAt: new Date(2025, 3, 10), // April 10, 2025
    updatedAt: new Date(2025, 4, 15), // May 15, 2025
    victims: 5200,
    updates: [
      {
        id: 1,
        content: "Emergency shelters set up in 5 locations",
        timestamp: new Date(2025, 3, 12).toISOString(),
      },
      {
        id: 2,
        content: "500 food packets distributed today",
        timestamp: new Date(2025, 3, 13).toISOString(),
      },
      {
        id: 3,
        content: "Medical camp established at central relief center",
        timestamp: new Date(2025, 3, 14).toISOString(),
      },
      {
        id: 4,
        content: "Additional resources deployed to coastal villages",
        timestamp: new Date(2025, 4, 15).toISOString(),
      }
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 2,
    title: "Flood Relief - Western Region",
    location: "Mumbai, Maharashtra",
    type: DisasterType.FLOOD,
    status: RequestStatus.ONGOING,
    managingNgo: "Rapid Action Welfare Society",
    ngoId: 2,
    description: "Supporting communities affected by severe flooding in western regions. Operations include water rescue, temporary housing, and distribution of clean water and essential supplies.",
    createdAt: new Date(2025, 3, 5), // April 5, 2025
    updatedAt: new Date(2025, 4, 5), // May 5, 2025
    victims: 8700,
    updates: [
      {
        id: 1,
        content: "Rescue boats deployed in most affected areas",
        timestamp: new Date(2025, 3, 5).toISOString(),
      },
      {
        id: 2,
        content: "200 families relocated to safer areas",
        timestamp: new Date(2025, 3, 7).toISOString(),
      },
      {
        id: 3,
        content: "Clean water distribution centers established",
        timestamp: new Date(2025, 3, 10).toISOString(),
      }
    ],
    images: ["/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 3,
    title: "Earthquake Response - Northern Hills",
    location: "Shimla, Himachal Pradesh",
    type: DisasterType.EARTHQUAKE,
    status: RequestStatus.CRITICAL,
    managingNgo: "Mountain Rescue Initiative",
    ngoId: 4,
    description: "Emergency response to 6.7 magnitude earthquake that struck northern hill regions. Teams are working on search and rescue, emergency medical aid, and providing temporary shelters for affected communities.",
    createdAt: new Date(2025, 4, 12), // May 12, 2025
    updatedAt: new Date(2025, 4, 13), // May 13, 2025
    victims: 3200,
    updates: [
      {
        id: 1,
        content: "Search and rescue teams deployed to all affected areas",
        timestamp: new Date(2025, 4, 12).toISOString(),
      },
      {
        id: 2,
        content: "Emergency medical facilities set up in 3 locations",
        timestamp: new Date(2025, 4, 12).toISOString(),
      },
      {
        id: 3,
        content: "Helicopter rescue operations ongoing in remote villages",
        timestamp: new Date(2025, 4, 13).toISOString(),
      }
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 4,
    title: "Drought Mitigation - Central Region",
    location: "Vidarbha, Maharashtra",
    type: DisasterType.DROUGHT,
    status: RequestStatus.ONGOING,
    managingNgo: "Rural Development Trust",
    ngoId: 1,
    description: "Long-term support for communities affected by prolonged drought. Focus on water conservation, sustainable agriculture, and providing immediate relief through water tankers and food support.",
    createdAt: new Date(2025, 2, 15), // March 15, 2025
    updatedAt: new Date(2025, 4, 10), // May 10, 2025
    victims: 12000,
    updates: [
      {
        id: 1,
        content: "Water tankers deployed to 25 villages",
        timestamp: new Date(2025, 2, 20).toISOString(),
      },
      {
        id: 2,
        content: "Farm support packages distributed to 500 families",
        timestamp: new Date(2025, 3, 5).toISOString(),
      },
      {
        id: 3,
        content: "Well restoration project initiated in 10 villages",
        timestamp: new Date(2025, 3, 20).toISOString(),
      },
      {
        id: 4,
        content: "Community water conservation training conducted",
        timestamp: new Date(2025, 4, 10).toISOString(),
      }
    ],
    images: ["/placeholder.svg"]
  },
  {
    id: 5,
    title: "Landslide Recovery - Northeastern Hills",
    location: "Gangtok, Sikkim",
    type: DisasterType.LANDSLIDE,
    status: RequestStatus.RESOLVED,
    managingNgo: "Himalayan Relief Network",
    ngoId: 5,
    description: "Recovery efforts after major landslides impacted northeastern hill communities. Work included clearing debris, rebuilding essential infrastructure, and supporting affected families with temporary housing and supplies.",
    createdAt: new Date(2025, 1, 5), // February 5, 2025
    updatedAt: new Date(2025, 3, 25), // April 25, 2025
    victims: 1800,
    updates: [
      {
        id: 1,
        content: "Initial assessment of affected areas completed",
        timestamp: new Date(2025, 1, 6).toISOString(),
      },
      {
        id: 2,
        content: "Debris clearing operations started",
        timestamp: new Date(2025, 1, 10).toISOString(),
      },
      {
        id: 3,
        content: "Temporary bridge constructed to restore connectivity",
        timestamp: new Date(2025, 2, 15).toISOString(),
      },
      {
        id: 4,
        content: "All families returned to rebuilt homes, project closing",
        timestamp: new Date(2025, 3, 25).toISOString(),
      }
    ],
    images: ["/placeholder.svg", "/placeholder.svg"]
  },
];

export const victimRequests = [
  {
    id: 1,
    name: "Rajesh Kumar",
    phoneNumber: "+91-9876543210",
    location: "Vishakhapatnam, Andhra Pradesh",
    description: "Stranded on rooftop with family of four. Water level rising quickly. Need immediate evacuation.",
    mediaFiles: ["/placeholder.svg"],
    status: RequestStatus.CRITICAL,
    createdAt: new Date(2025, 3, 10).toISOString(),
    projectId: 1
  },
  {
    id: 2,
    name: "Priya Singh",
    phoneNumber: "+91-9876543211",
    location: "Mumbai, Maharashtra",
    description: "Need medical assistance for elderly mother with diabetes. No access to medicines for past 3 days.",
    mediaFiles: [],
    status: RequestStatus.ONGOING,
    createdAt: new Date(2025, 3, 6).toISOString(),
    projectId: 2
  },
  {
    id: 3,
    name: "Mohammed Ismail",
    phoneNumber: "+91-9876543212",
    location: "Shimla, Himachal Pradesh",
    description: "House collapsed in earthquake. Family of 6 needs shelter and food supplies.",
    mediaFiles: ["/placeholder.svg", "/placeholder.svg"],
    status: RequestStatus.ONGOING,
    createdAt: new Date(2025, 4, 12).toISOString(),
    projectId: 3
  },
  {
    id: 4,
    name: "Lakshmi Devi",
    phoneNumber: "+91-9876543213",
    location: "Vidarbha, Maharashtra",
    description: "Village well has dried up. 30 families need water supply immediately.",
    mediaFiles: [],
    status: RequestStatus.ONGOING,
    createdAt: new Date(2025, 2, 16).toISOString(),
    projectId: 4
  },
  {
    id: 5,
    name: "Tenzin Norbu",
    phoneNumber: "+91-9876543214",
    location: "Gangtok, Sikkim",
    description: "Need help clearing debris from road to enable access to our village.",
    mediaFiles: ["/placeholder.svg"],
    status: RequestStatus.RESOLVED,
    createdAt: new Date(2025, 1, 7).toISOString(),
    projectId: 5
  }
];

export const ngos = [
  {
    id: 1,
    name: "Rural Development Trust",
    operationAreas: ["Maharashtra", "Gujarat", "Madhya Pradesh"],
    inauguratedOn: new Date(2018, 5, 15), // June 15, 2018
    accomplishments: [
      {
        title: "Drought Relief - Vidarbha",
        description: "Provided water and agricultural support to 200 villages",
        year: 2022,
        mediaFiles: ["/placeholder.svg"]
      },
      {
        title: "Community Well Project",
        description: "Constructed 50 community wells in water-scarce regions",
        year: 2020,
        mediaFiles: ["/placeholder.svg"]
      }
    ],
    status: "APPROVED",
    projectIds: [4],
    contactEmail: "info@ruraldevtrust.org",
    contactPhone: "+91-9876543201"
  },
  {
    id: 2,
    name: "Rapid Action Welfare Society",
    operationAreas: ["Maharashtra", "Goa", "Karnataka"],
    inauguratedOn: new Date(2015, 3, 10), // April 10, 2015
    accomplishments: [
      {
        title: "Mumbai Floods Response",
        description: "Rescued over 1000 people during 2023 floods",
        year: 2023,
        mediaFiles: ["/placeholder.svg"]
      },
      {
        title: "Urban Disaster Preparedness",
        description: "Trained 5000 community volunteers in disaster response",
        year: 2021,
        mediaFiles: ["/placeholder.svg"]
      }
    ],
    status: "APPROVED",
    projectIds: [2],
    contactEmail: "contact@raws.org",
    contactPhone: "+91-9876543202"
  },
  {
    id: 3,
    name: "Coastal Relief Foundation",
    operationAreas: ["Andhra Pradesh", "Odisha", "West Bengal"],
    inauguratedOn: new Date(2016, 7, 22), // August 22, 2016
    accomplishments: [
      {
        title: "Cyclone Preparedness Program",
        description: "Established early warning systems in 120 coastal villages",
        year: 2022,
        mediaFiles: ["/placeholder.svg"]
      },
      {
        title: "Coastal Community Resilience",
        description: "Built 30 cyclone shelters along the eastern coast",
        year: 2019,
        mediaFiles: ["/placeholder.svg"]
      }
    ],
    status: "APPROVED",
    projectIds: [1],
    contactEmail: "admin@coastalrelief.org",
    contactPhone: "+91-9876543203"
  },
  {
    id: 4,
    name: "Mountain Rescue Initiative",
    operationAreas: ["Himachal Pradesh", "Uttarakhand", "Jammu & Kashmir"],
    inauguratedOn: new Date(2017, 9, 5), // October 5, 2017
    accomplishments: [
      {
        title: "Himalayan Earthquake Response",
        description: "Conducted search and rescue operations across 45 villages",
        year: 2023,
        mediaFiles: ["/placeholder.svg"]
      },
      {
        title: "Mountain Community Preparedness",
        description: "Trained 3000 residents in earthquake response protocols",
        year: 2021,
        mediaFiles: ["/placeholder.svg"]
      }
    ],
    status: "APPROVED",
    projectIds: [3],
    contactEmail: "help@mountainrescue.org",
    contactPhone: "+91-9876543204"
  },
  {
    id: 5,
    name: "Himalayan Relief Network",
    operationAreas: ["Sikkim", "Arunachal Pradesh", "Assam"],
    inauguratedOn: new Date(2019, 2, 18), // March 18, 2019
    accomplishments: [
      {
        title: "Landslide Recovery - Sikkim",
        description: "Rebuilt 120 homes and restored infrastructure in 15 villages",
        year: 2023,
        mediaFiles: ["/placeholder.svg"]
      },
      {
        title: "Northeastern Relief Coordination",
        description: "Established regional disaster response network across 3 states",
        year: 2021,
        mediaFiles: ["/placeholder.svg"]
      }
    ],
    status: "APPROVED",
    projectIds: [5],
    contactEmail: "connect@himalayanrelief.org",
    contactPhone: "+91-9876543205"
  },
  {
    id: 6,
    name: "Youth Emergency Response Team",
    operationAreas: ["Delhi", "Haryana", "Uttar Pradesh"],
    inauguratedOn: new Date(2020, 6, 30), // July 30, 2020
    accomplishments: [
      {
        title: "Urban Emergency Response",
        description: "Mobilized 500 youth volunteers during urban emergencies",
        year: 2023,
        mediaFiles: ["/placeholder.svg"]
      }
    ],
    status: "PENDING",
    projectIds: [],
    contactEmail: "team@yert.org",
    contactPhone: "+91-9876543206"
  }
];

export const donations = [
  {
    id: 1,
    donorId: 1,
    projectId: 1,
    category: DonationCategory.FOOD,
    details: {
      items: ["Rice (100kg)", "Daal (50kg)", "Cooking Oil (25L)"],
      logistics: "Will deliver to collection center",
      specialNotes: "Packaged in family kits"
    },
    status: "RECEIVED",
    createdAt: new Date(2025, 3, 15).toISOString(),
    creditPoints: 150
  },
  {
    id: 2,
    donorId: 2,
    projectId: 2,
    category: DonationCategory.MONETARY,
    details: {
      amount: 25000,
      paymentMethod: "UPI Transfer"
    },
    status: "RECEIVED",
    createdAt: new Date(2025, 3, 8).toISOString(),
    creditPoints: 250
  },
  {
    id: 3,
    donorId: 3,
    projectId: 3,
    category: DonationCategory.MEDICAL,
    details: {
      items: ["First Aid Kits (50)", "Antibiotics (100 strips)", "Pain Relievers (100 strips)"],
      logistics: "Shipped via courier",
      specialNotes: "Requires cold storage for some medicines"
    },
    status: "IN_TRANSIT",
    createdAt: new Date(2025, 4, 13).toISOString(),
    creditPoints: 200
  },
  {
    id: 4,
    donorId: 1,
    projectId: 4,
    category: DonationCategory.MONETARY,
    details: {
      amount: 15000,
      paymentMethod: "Bank Transfer"
    },
    status: "RECEIVED",
    createdAt: new Date(2025, 3, 1).toISOString(),
    creditPoints: 150
  },
  {
    id: 5,
    donorId: 4,
    projectId: 5,
    category: DonationCategory.FOOD,
    details: {
      items: ["Ready-to-eat meals (500)", "Drinking Water (1000L)"],
      logistics: "Delivered to NGO warehouse",
      specialNotes: "All items have 6-month shelf life"
    },
    status: "RECEIVED",
    createdAt: new Date(2025, 1, 10).toISOString(),
    creditPoints: 100
  }
];

export const donors = [
  {
    id: 1,
    name: "Ankit Sharma",
    phoneNumber: "+91-9876543220",
    aadharNumber: "XXXX-XXXX-1234",
    donations: [1, 4],
    totalCreditPoints: 300,
    createdAt: new Date(2025, 3, 10).toISOString()
  },
  {
    id: 2,
    name: "Deepika Patel",
    phoneNumber: "+91-9876543221",
    aadharNumber: "XXXX-XXXX-5678",
    donations: [2],
    totalCreditPoints: 250,
    createdAt: new Date(2025, 3, 5).toISOString()
  },
  {
    id: 3,
    name: "Vikram Reddy",
    phoneNumber: "+91-9876543222",
    aadharNumber: "XXXX-XXXX-9012",
    donations: [3],
    totalCreditPoints: 200,
    createdAt: new Date(2025, 4, 12).toISOString()
  },
  {
    id: 4,
    name: "Neha Gupta",
    phoneNumber: "+91-9876543223",
    aadharNumber: "XXXX-XXXX-3456",
    donations: [5],
    totalCreditPoints: 100,
    createdAt: new Date(2025, 1, 5).toISOString()
  }
];

// Simulated logged-in user data
let loggedInUser: {
  id: number;
  role: UserRole;
  name: string;
  phoneNumber?: string;
  aadharNumber?: string;
  ngoId?: number;
} | null = null;

// Export a function to get and set the logged-in user
export const getLoggedInUser = () => loggedInUser;

export const setLoggedInUser = (user: {
  id: number;
  role: UserRole;
  name: string;
  phoneNumber?: string;
  aadharNumber?: string;
  ngoId?: number;
} | null) => {
  loggedInUser = user;
  return loggedInUser;
};

// Helper function to get an NGO by ID
export const getNgoById = (id: number) => {
  return ngos.find(ngo => ngo.id === id);
};

// Helper function to get a disaster project by ID
export const getDisasterProjectById = (id: number) => {
  return disasterProjects.find(project => project.id === id);
};

// Helper function to get victim requests by project ID
export const getVictimRequestsByProjectId = (projectId: number) => {
  return victimRequests.filter(request => request.projectId === projectId);
};

// Helper function to get donations by project ID
export const getDonationsByProjectId = (projectId: number) => {
  return donations.filter(donation => donation.projectId === projectId);
};

// Helper function to get donors by ID
export const getDonorById = (id: number) => {
  return donors.find(donor => donor.id === id);
};

// Helper function to get donations by donor ID
export const getDonationsByDonorId = (donorId: number) => {
  return donations.filter(donation => donation.donorId === donorId);
};
