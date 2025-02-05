import { Button } from "@/components/ui/button";
import { db } from "@/lib/client/db";
import { handleDownload } from "@/lib/client/utils";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, SaveIcon } from "lucide-react";

export function DownloadStateButton() {
	const downloadMutation = useMutation({
		mutationFn: async () => {
			// Because `dexie-export-import` can only be used in the browser,
			// we need to import it dynamically to avoid breaking the
			// server-side rendering
			const { exportDB } = await import("dexie-export-import");

			const blob = await exportDB(db);

			handleDownload("trip-meister-export.json", blob);
		},
	});

	const handleClick = () => {
		downloadMutation.mutate();
	};

	if (downloadMutation.isPending) {
		return (
			<Button disabled size="icon">
				<Loader2Icon className="h-4 w-4 animate-spin" />
			</Button>
		);
	}

	return (
		<Button onClick={handleClick} size="icon">
			<SaveIcon className="h-4 w-4" />
		</Button>
	);
}
