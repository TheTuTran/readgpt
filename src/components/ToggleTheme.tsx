"use client";

import { toast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";

interface ToggleThemeProps {
  theme: string | undefined;
}

const ToggleTheme: FC<ToggleThemeProps> = ({ theme }) => {
  const router = useRouter();

  const { mutate: toggleTheme } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`/api/theme/updateTheme`);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast({
            title: "Unauthorized",
            description: "Please login to change theme.",
            variant: "destructive",
          });
        }
      }

      return toast({
        title: "Something went wrong.",
        description: "Your theme was not updated. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <button
      onClick={() => toggleTheme()}
      className="flex items-center justify-center space-x-2 bg-foreground text-background hover:scale-[1.05] rounded-full p-2 w-24"
    >
      {theme === "light" ? (
        <>
          <BsFillSunFill size={20} />
          <span className="hidden md:inline-block">Light</span>
        </>
      ) : (
        <>
          <BsMoonStarsFill size={20} />
          <span className="hidden md:inline-block">Dark</span>
        </>
      )}
    </button>
  );
};

export default ToggleTheme;
