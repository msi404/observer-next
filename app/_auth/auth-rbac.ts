export type User = {
  id: string | null;
  phone: string | null;
  pollingCenter: string | null;
  profileImg: string | null;
  totalPosts: number | null;
  updatedAt: string | null;
  username: string | null;
  candidateListSerial: string | null;
  candidateSerial: string | null;
  coverImg: string | null;
  createdAt: string | null;
  dateOfBirth: string | null;
  deletedAt: string | null;
  electoralEntity: string | null;
  email: string | null;
  gov: string | null;
  role: Role | null;
  name: string | null;
  token: string | null;
};

export type Role = keyof typeof ROLES;
export type Permission = (typeof ROLES)[Role][number];

const ROLES = {
  0: [
    'view:home',
    'view:voters',
    // review
    'view:addObserver',
    // review
    'view:addPollingCenter',
    'view:addElectoralEnttity',
    'view:addElectoralEntityAdmin',
    'view:polling-management',
    'view:electoralEntities',
    'view:state-mangement',
    'view:election-results',
    'view:user-mangement',
    'view:election-base',
    'view:notifications',
    'view:issues',
    'view:parties-representers-tab',
    'view:total-candidates',
    'view:total-observers',
    'view:total-complaints',
    'view:total-comfirmed-voters',
    'view:total-possible-voters',
    'view:confirmedVotersActions',
    'view:reports',
    'view:candidate-activity-chart',
    'view:total-issues-chart',
    'view:observer-by-state-chart',
    'view:reports',
    "view:votersByState",
    "view:gendersChart",
    "view:voterAgeChart",
    "view:candidatesChart",
    "view:candidate-tab",
    "view:data-entries-tab",
    "view:observers-tab",
    "view:province-admins-tab",
    "view:default-tab-province",
    'view:addGovCenter',
    'view:pushNotification'
  ],

  10: [
    'view:home',
    'view:addPronviceAdmin',
    'view:addPollingCenter',
    'view:voters',
    'view:addCandidate',
    'view:addObserver',
    "view:editCandidate",
    "view:votersByState",
    "view:gendersChart",
    "view:voterAgeChart",
    'view:addDataEntry',
    "view:addVoter",
    "view:candidatesChart",
    'view:polling-management',
    'view:state-mangement',
    'view:election-results',
    'view:user-mangement',
    'view:addProvinceAdmin',
    'view:election-base',
    'view:notifications',
    'view:issues',
    'view:total-candidates',
    'view:total-observers',
    'view:total-data-entries',
    'view:total-comfirmed-voters',
    'view:total-possible-voters',
    'view:candidate-activity-chart',
    'view:reports',
    'view:total-issues-chart',
    'view:observer-by-state-chart',
    'view:candidatesChart',
    "view:default-tab-province",
    "view:province-admins-tab",
    "view:candidate-tab",
    "view:data-entries-tab",
    "view:observers-tab",
    'view:pushNotification'
  ],

  12: [
    'view:home',
    'view:candidatesChart',
    "view:updateComplaint",
    'view:total-issues-chart',
    'view:total-candidates',
    'view:total-observers',
    'view:total-comfirmed-voters',
    'view:total-possible-voters',
    'view:polling-management',
    'view:state-mangement',
    'view:user-mangement',
    'view:election-base',
    'view:notifications',
    'view:issues',
    'view:addDataEntry',
    "view:data-entries-tab",
    "view:voters",
    "view:observers-tab",
    "view:default-tab-gov",
    "view:addPollingCenter",
    "view:addStation",
    'view:pushNotification'
  ],

  100: [
    'view:home',
    'view:observers',
    'view:notifications',
    'view:election-base',
    'view:total-observers',
    'view:voters',
    'view:total-comfirmed-voters',
    'view:total-possible-voters',
    "view:addVoter",
    "view:addObserver",
    'view:pushNotification'
  ],

  102: [
    'view:home',
    'view:voters',
    'view:addPost',
    'view:profile',
    'view:observers',
    'view:events',
    'view:election-base',
    'view:notifications',
    'view:total-observers',
    'view:total-comfirmed-voters',
    'view:total-possible-voters',
    'view:candidate-activity-chart',
    'view:observer-by-state-chart',
  ],
  104: [
    'view:home',
    'view:polling-management',
    'view:state-mangement',
    'view:election-results',
    'view:data-entries',
    'view:observers',
    'view:election-base'
  ]
} as const;

export function hasPermission(user: User, permission: Permission) {
  return (ROLES[user.role!] as readonly Permission[])?.includes(permission);
}
