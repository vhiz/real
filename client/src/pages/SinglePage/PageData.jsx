import { CiLocationOn } from "react-icons/ci";
import Slider from "../../components/Slider";
import UserInfo from "../../components/UserInfo";
import ItemInfo from "../../components/ItemInfo";
import DOMPurify from "dompurify";
import SEO from "../../components/Seo";
export default function PageData({ listing }) {
  return (
    <div className="flex flex-col gap-y-6 lg:flex-row">
      <SEO
        title={listing?.title}
        description={listing?.desc}
        Url={`/list/${listing?.id}`}
        img={listing?.images[0]}
      />
      <div className="flex-[3] lg:pr-12">
        <Slider listing={listing} />
        <div className="pt-3 flex flex-col w-full gap-y-6">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col gap-y-4">
              <h2 className="text-xl font-semibold md:text-2xl">
                {listing.title}
              </h2>
              <div className="flex gap-x-2 items-center text-gray-500">
                <CiLocationOn />
                {listing.address}, {listing.city}
              </div>
              <span className="p-2 w-max bg-warning/60 text-sm md:text-lg rounded-md">
                ${listing.price}
              </span>
            </div>
            <UserInfo user={listing.user} />
          </div>
          <div
            className="w-full capitalize text-justify"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(listing.postDetail[0].desc),
            }}
          ></div>
        </div>
      </div>

      <div className="divider lg:hidden"></div>
      <div className="flex-[2] h-full">
        <ItemInfo listing={listing} />
      </div>
    </div>
  );
}
