const Footer = () => {
  return (
    <div className="fixed  w-full bottom-0 text-center text-gray font-semibold z-0">
      <p className="text-sm font-bold justify-center bg-white opacity-70">
        &copy; {new Date().getFullYear()}  Stellar Markets Developed by Anthony, Andrew and Justin.
      </p>
    </div>
  );
}

export default Footer;