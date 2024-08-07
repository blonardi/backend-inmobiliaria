import mongoose from "mongoose";
import { realEstateSchema } from "../schemas/realEstateSchema.js";

export const RealEstateModel = mongoose.model('RealEstate', realEstateSchema)