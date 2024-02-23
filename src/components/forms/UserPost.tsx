import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editUserSchema } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Models } from "appwrite";
import FileUploader from "../shared/FileUploader";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useUpdateProfile } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import Loader from "../shared/Loader";
const UserPost = ({ user }: { user: Models.Document }) => {
  const { setUser } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile();
  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
      file: [],
    },
  });
  async function onSubmit(values: z.infer<typeof editUserSchema>) {
    const updatedProfile = await updateProfile({
      ...values,
      id: user.$id,
      imageId: user.imageId,
      imageUrl: user.imageUrl,
    });
    if (!updatedProfile) {
      toast({
        title: "Please try again",
      });
    } else {
      toast({
        title: "Profile Updated",
      });
      const userAccount = updatedProfile;
      setUser({
        id: userAccount.$id,
        bio: userAccount.bio,
        email: userAccount.email,
        imageUrl: userAccount.imageUrl,
        name: userAccount.name,
        username: userAccount.username,
      });
      navigate(`/`);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="w-1/2 flex items-center justify-end gap-6 flex-row-reverse">
              <FormLabel
                htmlFor="file"
                className="text-[#0095F6] cursor-pointer"
              >
                Change profile photo
              </FormLabel>
              <FormControl>
                <FileUploader
                  fieldChnage={field.onChange}
                  mediaUrl={user.imageUrl}
                  userImg={true}
                />
              </FormControl>

              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>

              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>

              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>

              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Bio</FormLabel>
              <FormControl>
                <Textarea className="resize-none shad-textarea " {...field} />
              </FormControl>

              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            className="shad-button_primary"
            type="submit"
            disabled={isUpdatingProfile}
          >
            {isUpdatingProfile ? <Loader /> : "Update Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserPost;
