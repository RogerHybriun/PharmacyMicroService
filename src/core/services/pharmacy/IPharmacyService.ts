import {
  paginationOptions,
  Pharmacy,
  PharmacyDTO,
  PharmacyList,
  PharmacyWithProducts,
} from "../../types";

export interface IPharmacyService {
  create: (pharmacyData: PharmacyDTO) => Promise<Pharmacy | Error>;
  index: (options: paginationOptions) => Promise<PharmacyList>;
  update: (
    pharmacyId: string,
    pharmacyData: Partial<PharmacyDTO>
  ) => Promise<Pharmacy | Error>;
  show: (pharmacyId: string) => Promise<Pharmacy | Error>;
  delete: (pharmacyId: string) => Promise<void | Error>;
  linkProductsToPharmacy: (
    pharmacyId: string,
    productIds: Array<string>
  ) => Promise<PharmacyWithProducts | Error>;
}
