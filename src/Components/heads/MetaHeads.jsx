import { Helmet } from "@vuer-ai/react-helmet-async"

export default function MetaHead({ metadata }){
    return (
        <Helmet>
            <title>{metadata.title}</title>
            <link rel="canonical" href={metadata.canonical} />
            {metadata.meta.map((tag, i) =>
            tag.name ? (
                <meta key={i} name={tag.name} content={tag.content} />
            ) : (
                <meta key={i} property={tag.name} content={tag.content} />
            )
            )}
        </Helmet>
    )
}