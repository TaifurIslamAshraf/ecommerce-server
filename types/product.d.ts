import mongoose, { Document } from "mongoose";

export interface IPorductReviews {
  user: mongoose.Schema.Types.ObjectId;
  fullName: string;
  avatar: string;
  rating: number;
  comment: string;
  approved?: boolean;
  createdOn?: Date;
}

export interface IElectronicsDescription {
  colors: string;
  brand: string;
  warrantyPeriod?: string;
  countryOrigin?: string;
  batteryCapacity?: string;
  features?: string;
  dimensions?: string;
  model?: string;
  waterproof?: string;
  powerSupply?: string;
  bodyMaterials?: string;
  chargingTime?: string;
}

export interface IFoodsDescription {
  ingredients: string;
  foodDesc: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  descriptionType: "electronics" | "foods";
  price: number;
  discountPrice?: string;
  stock: number;
  sold: number;
  soldAt: Date;
  shipping: number;
  images: [string];
  numOfReviews: number;
  ratings?: number;
  description: IElectronicsDescription | IFoodsDescription;
  category: mongoose.Schema.Types.ObjectId;
  subcategory?: string;
  reviews?: IPorductReviews[];
}
