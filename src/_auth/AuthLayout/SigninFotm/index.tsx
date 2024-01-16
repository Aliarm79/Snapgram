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
import { signinSchema } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSignInrAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isLoading: isUserloading, checkAuthUser } = useUserContext();

  const {
    mutateAsync: signInrAccount,
    isError: signInError,
    isPending: isSignIn,
  } = useSignInrAccount();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signinSchema>) {
    await signInrAccount({ email: values.email, password: values.password });
    if (signInError) {
      toast({
        variant: "mobile",
        title: "sign in failed. please try again",
      });
    }
    if (await checkAuthUser()) {
      form.reset();
      navigate("/");
    } else {
      toast({ variant: "mobile", title: "sign in failed. please try again" });
    }
  }
  return (
    <Form {...form}>
      <div className=" sm:w-[420px] flex-center animate-in fade-in-0 duration-500 flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-10">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          wellcome back! please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-5 mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isSignIn || isUserloading}
            type="submit"
            className="shad-button_primary"
          >
            {isSignIn || isUserloading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
          <p className="small-regular text-light-2 text-center mt-2">
            Dont have an account?
            <Link to="/sign-up" className="text-purple-500 small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
