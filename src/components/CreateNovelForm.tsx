"use client";

import { Input } from "@/components/ui/Input";
import { toast } from "@/hooks/useToast";
import { useCustomToast } from "@/hooks/useCustomToast";
import { CreateNovelPayload } from "@/lib/validators/novel";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Button } from "./ui/Button";
import { NOVEL_GENRES } from "@/config";

export const CreateNovelForm = () => {
  const [title, setTitle] = useState<string>("");
  const [authorId, setAuthorId] = useState<string>("");
  const [genres, setGenres] = useState<string[]>([]);
  const [summary, setSummary] = useState<string>("");

  const router = useRouter();

  const { loginToast } = useCustomToast();

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setGenres((prev) => [...prev, value]);
    } else {
      setGenres((prev) => prev.filter((genre) => genre !== value));
    }
  };

  const { mutate: createNovel, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateNovelPayload = {
        title: title,
        authorId: authorId,
        genres: genres,
        summary: summary,
      };

      const { data } = await axios.post("/api/novel", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Novel already exists.",
            description: "Please choose a different name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid novel name.",
            description: "Please choose a name between 3 and 21 letters.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: "There was an error.",
        description: "Could not create novel.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.push(`/n/${data}`);
    },
  });

  return (
    <form
      className="relative w-full h-fit p-4 rounded-lg space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        createNovel();
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Create a Novel</CardTitle>
          <CardDescription>
            Please enter a novel's information below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <section>
              <label className="block text-lg font-medium" htmlFor="title">
                Title
              </label>
              <Input
                id="title"
                value={title}
                placeholder="Enter title..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </section>

            <section>
              <label className="block text-lg font-medium" htmlFor="author">
                Author
              </label>
              <Input
                id="author"
                value={authorId}
                placeholder="Enter author's name..."
                onChange={(e) => setAuthorId(e.target.value)}
              />
            </section>

            <section>
              <label className="block text-lg font-medium" htmlFor="genres">
                Genres
              </label>
              <div className="flex flex-wrap">
                {NOVEL_GENRES.map((genre) => (
                  <label key={genre} className="flex items-center m-2">
                    <input
                      type="checkbox"
                      value={genre}
                      onChange={handleGenreChange}
                      checked={genres.includes(genre)}
                      className="mr-2"
                    />
                    {genre}
                  </label>
                ))}
              </div>
            </section>

            <section>
              <label className="block text-lg font-medium" htmlFor="summary">
                Novel Summary
              </label>
              <Input
                id="summary"
                value={summary}
                placeholder="Enter summary..."
                onChange={(e) => setSummary(e.target.value)}
              />
            </section>

            {/* For Images In the future
          <section>
            <label className="block text-lg font-medium" htmlFor="coverImage">Cover Image</label>
            <input id="coverImage" type="file" onChange={handleImageChange} className="mt-1 block w-full" />
          </section>
        */}
          </div>
        </CardContent>
        <CardFooter>
          <Button isLoading={isLoading}>Create Novel</Button>
        </CardFooter>
      </Card>
    </form>
  );
};
