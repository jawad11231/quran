export interface stateAuthUser {
  id: string;
  companyId: string;
  email: string;
  message: string;
  name: string;
  token: string;
  image?: string;
  isAdmin: boolean;
  isLinkedwithBranch?: boolean;
  isLinkedwithEmployee?: boolean;
  isLinkedwithSalesman?: boolean;
  phone?: string;
  branchId?: string;
}
export interface state {
  auth: {
    user: stateAuthUser;
    loading: boolean;
  };
}
