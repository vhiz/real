import { Suspense } from "react";
import { Await } from "react-router-dom";
import Filter from "../components/Filter";
import CardList from "../components/CardList";
import { useLoaderData } from "react-router-dom";
import Map from "../components/Map";
import Loading from "../components/Loading";
import Error from "../components/Error";
import SEO from "../components/Seo";

export default function List() {
  const data = useLoaderData();
  return (
    <div className="h-full flex">
      <SEO
        title={"Available property"}
        description={
          "See all available properties for sale or rent at a affordable price"
        }
        Url={"/list"}
        img={data?.postResponse?._data?.data[0]?.images[0]}
      />
      <div className="w-full lg:pr-12 lg:flex-[3]">
        <Filter />
        <Suspense fallback={<Loading />}>
          <Await resolve={data.postResponse} errorElement={<Error />}>
            {(postResponse) => <CardList listings={postResponse.data} />}
          </Await>
        </Suspense>
      </div>

      <div className="flex-[2] hidden h-full lg:block">
        <Suspense fallback={<Loading />}>
          <Await resolve={data.postResponse} errorElement={<Error />}>
            {(postResponse) => <Map houses={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
