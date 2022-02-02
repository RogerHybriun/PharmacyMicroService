import { IPharmacyRepository } from "../../repositories/pharmacy/IPharmacyRepository";
import { PharmacyProductsRepository } from "../../repositories/pharmacyProducts/PharmacyProductsRepository";
import {
  PharmacyDTO,
  paginationOptions,
  PharmacyWithProducts,
} from "../../types";
import { IPharmacyService } from "./IPharmacyService";
import { Validator } from "../../../utils/validator";
import { ProductClient } from "../../gateways/Product";
import { IPharmacyProductsRepository } from "../../repositories/pharmacyProducts/IPharmacyProductsRepository";

export class PharmacyService implements IPharmacyService {
  private validator;
  private pharmacyProductsRepository: IPharmacyProductsRepository;

  constructor(private pharmacyRepository: IPharmacyRepository) {
    this.validator = new Validator();
    this.pharmacyProductsRepository = new PharmacyProductsRepository();
  }

  create = async (pharmacyData: PharmacyDTO) => {
    const validationError = this.validator.ValidateFalsyFields(pharmacyData, [
      "isSubsidiaryOf",
    ]);

    if (validationError) return validationError;

    return await this.pharmacyRepository.create(pharmacyData);
  };
  index = async (options: paginationOptions) => {
    return await this.pharmacyRepository.index(options);
  };
  update = async (pharmacyId: string, pharmacyData: Partial<PharmacyDTO>) => {
    const validationError = this.validator.ValidateFalsyFields(pharmacyData, [
      "isSubsidiaryOf",
    ]);

    if (validationError) return validationError;

    const pharmacy = await this.pharmacyRepository.findById(pharmacyId);

    if (!pharmacy) return new Error("Pharmacy not found");

    return await this.pharmacyRepository.update(pharmacyId, pharmacyData);
  };
  show = async (pharmacyId: string) => {
    const pharmacy = await this.pharmacyRepository.findById(pharmacyId);

    if (!pharmacy) return new Error("Pharmacy not found");

    return pharmacy;
  };
  delete = async (pharmacyId: string) => {
    const pharmacy = await this.pharmacyRepository.findById(pharmacyId);

    if (!pharmacy) return new Error("Pharmacy not found");

    await this.pharmacyRepository.delete(pharmacy.id);
  };
  linkProductsToPharmacy = async (pharmacyId: string, productIds: string[]) => {
    const pharmacy = await this.pharmacyRepository.findById(pharmacyId);

    if (!pharmacy) return new Error("Pharmacy not found");

    this.pharmacyProductsRepository.linkProductsToPharmacy(
      pharmacyId,
      productIds
    );

    return await this.pharmacyRepository.findById(pharmacyId);
  };
}
