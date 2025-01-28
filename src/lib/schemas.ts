import { z } from "zod";

export const NameSchema = z
	.string({ message: "The trip name is required" })
	.min(5, "The trip name must be longer than 5 character")
	.max(255, "The trip name must be shorter than 255 characters");

export const StartDateSchema = z.coerce.date({
	message: "The start date must be a valid date",
	required_error: "The start date is required",
	invalid_type_error: "The start date must be a valid date",
});

export const EndDateSchema = z.coerce.date({
	message: "The end date must be a valid date",
	required_error: "The end date is required",
	invalid_type_error: "The end date must be a valid date",
});

export const StartMileageSchema = z.coerce
	.number({ message: "The start mileage is required" })
	.min(0, "The start mileage must be greater than 0");

export const EndMileageSchema = z.coerce
	.number({ message: "The end mileage is required" })
	.min(0, "The end mileage must be greater than 0");
