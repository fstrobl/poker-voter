import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../client";

export default function createUserHandler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
}
