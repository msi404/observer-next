export type User = {
  id: string | null
  phone: string | null
  pollingCenter: string | null
  profileImg: string | null
  totalPosts: number | null
  updatedAt: string | null
  username: string | null
  candidateListSerial: string | null
  candidateSerial: string | null
  coverImg: string | null
  createdAt: string | null
  dateOfBirth: string | null
  deletedAt: string | null
  electoralEntity: string | null
  email: string | null
  gov: string | null
	role: Role | null
	name: string | null
  token: string | null
}

export type Role = keyof typeof ROLES
export type Permission = (typeof ROLES)[Role][number]

const ROLES = {
  0: [
    "view:home",
    "view:voters",
    "view:addPost",
    "view:addElectoralEnttity",
    "view:addElectoralEntityAdmin",
    "view:polling-management",
    "view:electoralEntities",
    "view:state-mangement",
    "view:profile",
    "view:parties-representers",
    "view:election-results",
    "view:data-entries",
    "view:observers",
    "view:user-mangement",
    "view:election-base",
    "view:notifications",
    "view:issues",
    "view:parties-representers-tab",
    "view:total-candidates",
    "view:total-observers",
    "view:total-complaints",
    "view:total-comfirmed-voters",
    "view:total-possible-voters",
    "view:confirmedVotersActions",
    'view:addConfirmedVoter',
    'view:addPossibleVoter',
    "view:parties-representers",
    "view:candidates",
    "view:reports",
    "view:addCandidate",
    "view:candidate-activity-chart",
    "view:total-issues-chart",
    "view:observer-by-state-chart",
    "view:addDataEntry",
    "view:addGovCenter",
    "view:reports",
    "view:addObserver",
  ],

  10: [
    "view:home",
    "view:voters",
    "view:polling-management",
    "view:state-mangement",
    "view:election-results",
    "view:user-mangement",
    "view:addCandidate",
    "view:addProvinceAdmin",
    "view:election-base",
    "view:notifications",
    "view:issues",
    "view:total-candidates",
    "view:total-observers",
    "view:total-data-entries",
    "view:total-comfirmed-voters",
    "view:total-possible-voters",
    "view:candidate-activity-chart",
    "view:reports",
    "view:total-issues-chart",
    "view:observer-by-state-chart",
    "view:confirmedVotersActions"
  ],

  12: [
    "view:home",
    "view:polling-management",
    "view:state-mangement",
    "view:election-results",
    "view:data-entries",
    "view:observers",
    "view:user-mangement",
    "view:election-base",
    "view:notifications",
    "view:issues"
  ],

  100: [ "view:home",
    "view:observers",
    "view:notifications",
    "view:election-base",
    "view:total-observers",
    "view:addObserver",
    "view:voters",
    "view:total-comfirmed-voters",
    "view:total-possible-voters",
   ],
  
  102: [  "view:home",
    "view:voters",
    "view:polling-management",
    "view:state-mangement",
    "view:profile",
    "view:parties-representers",
    "view:election-results",
    "view:data-entries",
    "view:observers",
    "view:events",
    "view:user-mangement",
    "view:election-base",
    "view:notifications",
    "view:issues",
    "view:total-candidates",
    "view:total-observers",
    "view:total-complaints",
    "view:total-comfirmed-voters",
    "view:total-possible-voters",
    "view:confirmedVotersActions",
    'view:addConfirmedVoter',
    'view:addPossibleVoter',
    "view:parties-representers",
    "view:candidates",
    "view:reports",
    "view:candidate-activity-chart",
    "view:total-issues-chart",
    "view:observer-by-state-chart",
],
  104: [ "view:home",
    "view:polling-management",
    "view:state-mangement",
    "view:election-results",
    "view:data-entries",
    "view:observers",
    "view:election-base",
],
} as const

export function hasPermission(user: User, permission: Permission) {
  return (ROLES[user.role!] as readonly Permission[]).includes(permission)
}