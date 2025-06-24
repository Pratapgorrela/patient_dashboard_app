import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface IConfig {
	routeConfig: {
		client: string;
		userType: string;
	};
}

interface IConfigStore extends IConfig {
	hydrated: boolean;

	setRouteConfig(routeConfig: { client: string; userType: string }): void;
	setHydrated(): void;
}

export const useConfigStore = create<IConfigStore>()(
	persist(
		immer((set) => ({
			routeConfig: { client: "fortis", userType: "patient" },
			hydrated: false,

			setRouteConfig(routeConfig: { client: string; userType: string }) {
				set({ routeConfig });
			},

			setHydrated() {
				set({ hydrated: true });
			},
		})),
		{
			name: "config-store",
			// storage: createJSONStorage(() => sessionStorage),
			onRehydrateStorage() {
				return (state, error) => {
					if (!error) state?.setHydrated();
				};
			},
		}
	)
);
