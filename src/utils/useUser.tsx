import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { AuthState } from "../pages/_app";

type UserContextType = {
  userDetails: UserDetails | null;
  authenticatedState: AuthState;
};

export type UserDetails = {
  id: string;
  name: string;
  email: string;
  table_history: string[];
};

interface Props {
  supabaseClient: SupabaseClient;
  user: User | null;
  authenticatedState: AuthState;
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const MyUserContextProvider = (props: Props) => {
  const { supabaseClient, user, authenticatedState } = props;

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    async function fetchUserFromDB() {
      if (user && user.email && !isLoadingData && !userDetails) {
        setIsLoadingData(true);
        const { data, error } = await supabaseClient
          .from<UserDetails>("users")
          .select()
          .limit(1)
          .eq("id", user.id)
          .single();

        setUserDetails(data);
      }
    }
    fetchUserFromDB();
  }, [user, isLoadingData, userDetails, supabaseClient]);

  return <UserContext.Provider value={{ userDetails, authenticatedState }} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
