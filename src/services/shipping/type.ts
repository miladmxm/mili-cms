export interface Address {
  id: string;
  fullname: string;
  phoneNumber: string;
  postCode: string;
  province: string;
  city: string;
  additionalAddress: string;
  createdAt: Date;
}

export interface CreateAddress {
  fullname: string;
  phoneNumber: string;
  postCode: string;
  province: string;
  city: string;
  additionalAddress: string;
  userId: string;
}
