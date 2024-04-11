import { useLoaderData } from "react-router-dom";

import { Suspense } from "react";
import Loading from "../../components/Loading";
import { Await } from "react-router-dom";
import Error from "../../components/Error";
import PageData from "./PageData";

export default function SinglePage() {
  const data = useLoaderData();
  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={data.postResponse} errorElement={<Error />}>
        {(postResponse) => <PageData listing={postResponse?.data} />}
      </Await>
    </Suspense>
  );
}
