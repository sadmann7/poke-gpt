import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>PokeGPT</title>
      </Head>
      <main className="w-full pt-40 pb-32 sm:pt-32">
        <div className="container flex max-w-6xl flex-col items-center justify-center gap-10">
          <h1 className="w-full max-w-3xl text-center text-3xl font-bold leading-tight text-gray-50 sm:text-6xl sm:leading-tight">
            Generating pokemons from your images using AI
          </h1>
        </div>
      </main>
    </>
  );
}
