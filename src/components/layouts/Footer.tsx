const Footer = () => {
  return (
    <footer aria-label="footer" className="w-full bg-gray-700/60 py-5">
      <div className="container grid max-w-6xl place-items-center text-center">
        <div className="text-sm text-gray-300 sm:text-base">
          Powered by{" "}
          <a
            aria-label="navigate to replicate"
            href="https://replicate.com/home"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-gray-200 transition-colors hover:text-white active:text-gray-100"
          >
            Replicate
          </a>
          <a
            aria-label="navigate to cloudinary"
            href="https://cloudinary.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-gray-200 transition-colors hover:text-white active:text-gray-100"
          >
            {", "} Cloudinary
          </a>
          {", and "}
          <a
            aria-label="navigate to vercel"
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-gray-200 transition-colors hover:text-white active:text-gray-100"
          >
            Vercel
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
