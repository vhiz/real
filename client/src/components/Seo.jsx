import { Helmet } from "react-helmet-async";
export default function SEO({ title, description, img, Url }) {
  return (
    <Helmet prioritizeSeoTags>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="shortcut icon" href={img} type="image/x-icon" />
      {/* End standard metadata tags */}

      {/* Facebook tags */}
      <meta property="og:type" content="website" />
      <meta property="og:image" content={img} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={Url} />
      {/* End Facebook tags */}

      {/* Twitter tags */}
      <meta name="twitter:creator" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
    </Helmet>
  );
}
