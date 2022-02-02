import GetCLient from "../../infra/pb/loader";

export const ProductClient = GetCLient({
  serviceName: "ProductService",
  address: "localhost:8088",
  fileName: "product",
});
