import { Helmet } from "react-helmet-async";

function SEO({ title, description, image }) {
  const siteTitle = "Frontend";
  const defaultDescription = "...";
  const defaultImage = "/vite.svg";

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content="http://localhost:5173/" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      <link rel="canonical" href="http://localhost:5173/" />
    </Helmet>
  );
}

export default SEO;