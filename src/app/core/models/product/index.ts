export interface Product {
  id: String;
  name: String;
  price: String;
  description: String;
}

export function instanceOfProduct(object: any): object is Product {
  return (
    "id" in object &&
    "name" in object &&
    "price" in object &&
    "description" in object
  );
}
