import { IPharmacyProductsRepository } from "./IPharmacyProductsRepository";
import { ProductClient } from "../../gateways/Product";
import { getRepository, Repository } from "typeorm";
import { PharmacyProducts } from "../../../infra/database/models/PharmacyProducts";
import { Pharmacy, PharmacyWithProducts, Product } from "../../types";

export class PharmacyProductsRepository implements IPharmacyProductsRepository {
  private typeOrm: Repository<PharmacyProducts>;

  constructor() {
    this.typeOrm = getRepository(PharmacyProducts);
  }

  linkProductsToPharmacy = async (pharmacy: Pharmacy, productIds: string[]) => {
    try {
      const { count, products } = await ProductClient.getProductsByIds();

      if (count === 0) return new Error("Invalid ids");

      products.forEach(({ id: productId }: { id: string }) => {
        this.typeOrm.save({
          pharmacyId: pharmacy.id,
          productId,
          unitsInStock: 1,
        });
      });
    } catch (e) {
      return new Error("Internal server error");
    }
  };
}
