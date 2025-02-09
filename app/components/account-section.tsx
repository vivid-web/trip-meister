import { LoginDialog } from "@/components/login-dialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/shared/auth";
import { cn } from "@/lib/shared/utils";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, User2Icon } from "lucide-react";
import { ComponentProps } from "react";

type AccountSectionProps = ComponentProps<"div">;

type LayoutProps = ComponentProps<"div">;

function Layout({ children, className, ...props }: LayoutProps) {
	return (
		<div className={cn("flex justify-end", className)} {...props}>
			{children}
		</div>
	);
}

export function AccountSection({ ...props }: AccountSectionProps) {
	const session = useSession();

	const logoutMutation = useMutation({
		mutationFn: async () => {
			await signOut();
		},
	});

	const isPending = logoutMutation.isPending || session.isPending;

	if (isPending) {
		return (
			<Layout {...props}>
				<Button disabled size="icon" variant="outline">
					<Loader2Icon className="h-4 w-4 animate-spin" />
				</Button>
			</Layout>
		);
	}

	if (!session.data) {
		return (
			<Layout {...props}>
				<LoginDialog>
					<Button variant="outline">Sign in</Button>
				</LoginDialog>
			</Layout>
		);
	}

	return (
		<Layout {...props}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">
						<User2Icon className="h-4 w-4" />
						<span>Account</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>{session.data.user.email}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => {
							logoutMutation.mutate();
						}}
					>
						Log out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Layout>
	);
}
