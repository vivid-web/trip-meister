import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

type UseZodFormParams<TSchema extends z.ZodType> = Omit<
	UseFormProps<TSchema["_input"]>,
	"resolver"
> & {
	schema: TSchema;
};

export function useZodForm<TSchema extends z.ZodType>({
	schema,
	...params
}: UseZodFormParams<TSchema>) {
	return useForm<TSchema["_output"]>({
		...params,
		resolver: zodResolver(schema),
	});
}
