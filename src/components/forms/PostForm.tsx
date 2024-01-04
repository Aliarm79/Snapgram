import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { postSchema } from "@/lib/validation";
import { Models } from "appwrite";
import { useCreatePost } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

interface postFormProps {
  post?: Models.Document;
}

const PostForm = ({ post }: postFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutateAsync: createPost, isPending: isLoadingCrate } =
    useCreatePost();
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      caption: post?.caption || "",
      location: post?.location || "",
      file: [],
      tags: post?.tags.join(",") || "",
    },
  });

  async function onSubmit(values: z.infer<typeof postSchema>) {
    const newPost = await createPost({
      ...values,
      userId: user.id,
    });
    if (!newPost) {
      toast({
        title: "Please try again",
      });
      return;
    }
    navigate("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Caption</FormLabel>
              <FormControl>
                <Textarea className="resize-none shad-textarea " {...field} />
              </FormControl>

              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChnage={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>

              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>

              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{`Add Tags (seperated by comma",")`}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Js, React, Nextjs"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">
            Cancel
          </Button>
          <Button type="submit" className="shad-button_primary">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
