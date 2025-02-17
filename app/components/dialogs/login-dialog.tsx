import { GithubIcon } from "@/components/icons/github-icon";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { signIn } from "@/lib/shared/auth";
import { useMutation } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

type Provider = "github" | "google";

export function LoginDialog({ children }: Props) {
	const mutation = useMutation({
		mutationFn: async (provider: Provider) => {
			await signIn.social({ provider });
		},
	});

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Login</DialogTitle>
					<DialogDescription>
						Login to save and download your trips
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-2">
					<Button
						className="w-full"
						disabled={mutation.isPending}
						onClick={() => {
							mutation.mutate("google");
						}}
						variant="outline"
					>
						<GoogleIcon />
						Login with Google
					</Button>
					<Button
						className="w-full"
						disabled={mutation.isPending}
						onClick={() => {
							mutation.mutate("github");
						}}
						variant="outline"
					>
						<GithubIcon />
						Login with Github
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
