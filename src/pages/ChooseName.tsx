import Input from "../components/ui/Input";
import { ChangeEvent, useState, FormEvent } from "react";
import { supabase } from "../../client";
import s from "../styles/Landing.module.css";
import { UserDetails } from "../utils/useUser";
import { useRouter } from "next/router";

interface Props {
  //   userId: number | undefined;
  userId: string | undefined;
}

export default function ChooseName({ userId }: Props) {
  const [username, setUsername] = useState("");
  const [isDisabled, setDisabled] = useState(true);
  const router = useRouter();

  const validateName = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUsername(e.target.value);

    const usernameLength = username.trim().length;
    if (usernameLength > 1 && usernameLength < 30) {
      setDisabled(false);
    }
  };

  async function submitName(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userId) {
      const { data, error } = await supabase
        .from<UserDetails>("users")
        .update({ name: username })
        .limit(1)
        .eq("id", userId)
        .single();

      if (data?.name) {
        router.push("/auth");
      }
    }
  }

  return (
    <section className={s.container}>
      <form onChange={validateName} onSubmit={submitName}>
        <Input type="text" placeholder="Name" value={username} required></Input>
        <button type="submit" disabled={isDisabled}>
          Choose Name
        </button>
      </form>
    </section>
  );
}
