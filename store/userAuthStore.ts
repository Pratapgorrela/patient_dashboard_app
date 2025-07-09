import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { Models } from "appwrite";
import { account } from "@/models/client/config";

interface IUserAuth {
	session: Models.Session | null;
	user: Models.User<Models.Preferences> | null;
	jwt?: string | null;
}

interface ITeams {
	teams: Models.Team<Models.Preferences>[] | [];
}

interface IMemberships {
	memberships:
		| {
				teamId: string;
				membership: Models.Membership;
		  }[]
		| [];
}

interface ITeamsAndMemberships extends ITeams, IMemberships {}

interface IUserAuthStore extends IUserAuth, ITeamsAndMemberships {
	hydrated: boolean;

	verfiySession(): Promise<void>;
	setJwtToken(jwt: string | null): void;
	setUser(user: Models.User<Models.Preferences> | null): void;
	setAuthData(userAuthData: IUserAuth): void;
	setTeamsAndMemberhips(teamsAndMembershipsData: ITeamsAndMemberships): void;
	setHydrated(): void;
}

export const useAuthStore = create<IUserAuthStore>()(
	persist(
		immer((set) => ({
			session: null,
			jwt: null,
			user: null,
			hydrated: false,
			teams: [],
			memberships: [],

			setHydrated() {
				set({ hydrated: true });
			},

			async verfiySession() {
				try {
					const session = await account.getSession("current");
					set({ session });
				} catch (error) {
					console.log(error);
				}
			},

			setUser(user: Models.User<Models.Preferences> | null) {
				set({ user });
			},

			setJwtToken(jwt: string | null) {
				set({ jwt });
			},

			setAuthData({ session, user, jwt }: IUserAuth) {
				set({ session, user, jwt });
			},

			setTeamsAndMemberhips({ teams, memberships }: ITeamsAndMemberships) {
				set({ teams, memberships });
			},
		})),
		{
			name: "user-auth-store",
			// storage: createJSONStorage(() => sessionStorage),
			onRehydrateStorage() {
				return (state, error) => {
					if (!error) state?.setHydrated();
				};
			},
		}
	)
);
