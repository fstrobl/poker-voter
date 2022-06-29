import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../client";

type Data = {
  name: string;
};

export default function authCookieHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  supabase.auth.api.setAuthCookie(req, res);
  // supabase.auth.api.deleteUser("43fdc052-c66e-4aec-a47a-a1d0af30a04b");
}

//   supabase.auth.api.createUser
