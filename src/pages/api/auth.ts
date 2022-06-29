import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../client";

type Data = {
  name: string;
};

export default function authCookieHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  supabase.auth.api.setAuthCookie(req, res);
}

//   supabase.auth.api.createUser
