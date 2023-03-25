import Head from "next/head";

type MetaProps = {
  siteName?: string;
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
  url?: string;
};

const Meta = ({
  siteName = "PokeGPT",
  title = "PokeGPT",
  description = "Generating pokemons from your images using AI",
  image = "https://pokegpt.vercel.app/api/og?title=PokeGPT&description=Generating%20pokemons%20from%20your%20images%20using%20AI",
  keywords = "pokemon, ai, replicate, gpt, image, generation, image-to-image, image-to-pokemon",
  url = "https://pokegpt.vercel.app/",
}: MetaProps) => {
  return (
    <Head>
      <meta name="description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
