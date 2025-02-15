import type { ReactNode } from "react";

type Props<T> = {
	children?: ((item: T) => ReactNode) | ReactNode | undefined;
	fallback?: ReactNode;
	when: false | null | T | undefined;
};

export function Show<T>({ children, fallback, when }: Props<T>) {
	if (!when && !fallback) {
		return null;
	}

	if (!when) {
		return <>{fallback}</>;
	}

	if (typeof children === "function") {
		return <>{children(when)}</>;
	}

	return <>{children}</>;
}
