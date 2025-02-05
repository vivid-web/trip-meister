import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TripProvider } from "@/contexts/trip-context";
import "./index.css";
import { App } from "./app.tsx";
import "react-datepicker/dist/react-datepicker.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<TripProvider>
			<App />
		</TripProvider>
	</StrictMode>,
);
