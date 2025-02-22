import { PropsWithChildren } from "react";

export function NotFound({ children }: PropsWithChildren) {
	return (
		<div className="space-y-2 p-2">
			<div className="text-gray-600 dark:text-gray-400">
				{children || <p>The page you are looking for does not exist.</p>}
			</div>
		</div>
	);
}
