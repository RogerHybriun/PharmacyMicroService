import { PharmacyWithProducts } from "../../types";
import { Pharmacy } from "../../../infra/database/models/Pharmacy";

export interface IPharmacyProductsRepository {
  linkProductsToPharmacy: (
    pharmacyId: Pharmacy,
    productIds: Array<string>
  ) => Promise<undefined | Error>;
}
