import { z } from "zod";

export const ElectronicsDescriptionSchema = z.object({
  body: z.object({
    colors: z.string({ required_error: "Color is required" }),
    brand: z.string({ required_error: "Brand is required" }),
    warrantyPeriod: z.string().optional(),
    countryOrigin: z.string().optional(),
    batteryCapacity: z.string().optional(),
    features: z.string().optional(),
    dimensions: z.string().optional(),
    model: z.string().optional(),
    waterproof: z.string().optional(),
    powerSupply: z.string().optional(),
    bodyMaterials: z.string().optional(),
    chargingTime: z.string().optional(),
  }),
});

export const FoodsDescriptionSchema = z.object({
  body: z.object({
    ingredients: z.string({
      required_error: "Product Ingredients is required",
    }),
    foodDesc: z.string({ required_error: "Product description is required" }),
  }),
});

export const ProductSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Product name is required" }),
    descriptionType: z.enum(["electronics", "foods"], {
      required_error: "Product descriptionType is required",
    }),
    price: z.number({ required_error: "Product price is required" }),
    discountPrice: z.string().optional(),
    stock: z.number({ required_error: "Product stock is required" }),
    sold: z.number().optional(),
    shipping: z.number({ required_error: "Product shipping is required" }),
    subcategory: z.string().optional(),
    category: z.string({ required_error: "product category is required" }),
    // description: z
    //   .union([ElectronicsDescriptionSchema, FoodsDescriptionSchema])
    //   .optional(),
  }),
});
