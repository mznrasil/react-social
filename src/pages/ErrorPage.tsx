import { Button } from "@/components/ui/button";
import { CircleXIcon } from "lucide-react";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error?.data || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <main className="grid place-items-center h-screen">
      <div className="text-center flex flex-col justify-center">
        <CircleXIcon className="size-16 text-red-500 mx-auto" />
        <p className="mt-4 font-semibold text-xl">
          Oops. Something went wrong!
        </p>
        <p className="mt-1">
          <i>{errorMessage}</i>
        </p>
        <Button asChild className="mt-2 w-fit mx-auto">
          <Link to={"/"}>Go To Home Page</Link>
        </Button>
      </div>
    </main>
  );
};
