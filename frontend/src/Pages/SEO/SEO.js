import React from "react";
import { Helmet } from "react-helmet-async";
export default function SEO({
  meta_title,
  meta_description,
  meta_keyword,
  breacrumb,ogTitle,OgImage,OgUrl
}) {
  return (
    <Helmet>
      <title>{meta_title}</title>
      <meta name="description" content={meta_description} />
      <meta name="keywords" content={meta_keyword} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:image" content={OgImage}/>
      <meta property="og:url" content={OgUrl}/>
      <script type="application/ld+json">
        {breacrumb
          ?.replace(`<script type="application/ld+json">`, "")
          ?.replace("</script>", "")}
      </script>
    </Helmet>
  );
}
