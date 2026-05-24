"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateProfileName } from "@/app/actions/profile";
import { LoaderCircle } from "lucide-react";

const profileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name is too long"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface Props {
  userName: string;
}

export default function EditProfileForm({ userName }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: userName },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setServerError("");
    const result = await updateProfileName(data.name);

    if (result.error) {
      setServerError(result.error);
    } else {
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors border border-gray-600"
      >
        Edit Profile
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 w-full max-w-sm bg-gray-900/50 p-4 rounded-xl border border-gray-700"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Display Name
        </label>
        <input
          {...register("name")}
          type="text"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-400 transition-colors"
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-red-400 text-sm mb-3">{serverError}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-teal-400 text-gray-900 font-bold py-2 rounded-lg hover:bg-teal-300 transition-colors flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <LoaderCircle className="w-5 h-5 animate-spin" />
          ) : (
            "Save"
          )}
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          disabled={isSubmitting}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
