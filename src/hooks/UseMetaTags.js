import { useTranslation } from "../auto-il8n";
import { useEffect, useState, useMemo } from "react";
//import { Helmet } from "@vuer-ai/react-helmet-async";

const useMeta = (title, description, canonical, sitename) => {
  return useMemo(() => {
    return {
      title,
      link: [{
        rel: "canonical",
        href: canonical
      }],
      meta: [{
        name: "description",
        content: description
      },
      // Open Graph
      {
        property: "og:title",
        content: title
      }, {
        property: "og:type",
        content: "website"
      }, {
        property: "og:site_name",
        content: sitename
      }, {
        property: "og:description",
        content: description
      }, {
        property: "og:url",
        content: canonical
      }, {
        property: "og:image",
        content: "https://picko7.com/assets/images/picko-logo.png"
      }, {
        property: "og:locale",
        content: "en_US"
      },
      // Twitter
      {
        name: "twitter:card",
        content: "summary_large_image"
      }, {
        name: "twitter:title",
        content: title
      }, {
        name: "twitter:description",
        content: description
      }, {
        name: "twitter:image",
        content: "https://picko7.com/assets/images/picko-logo.png"
      }, {
        name: "twitter:site",
        content: `@${sitename}`
      }, {
        name: "twitter:creator",
        content: "Legist E&T limited"
      }]
    };
  }, [title, description, canonical, sitename]);
};
export default useMeta;