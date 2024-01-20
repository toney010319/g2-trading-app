const Footer = () => {
  return (
    <div className="fixed w-full bottom-0 text-center text-gray font-semibold z-0">
    <p className="text-sm font-bold justify-center bg-white opacity-70">
      &copy; {new Date().getFullYear()} Stellar Markets Developed by Anthony, Andrew and Justin
      <a href="https://github.com/toney010319/g2-trading-app" target="_blank" rel="noopener noreferrer" className="ml-2">
        <img src="https://www.svgrepo.com/show/503359/github.svg" alt="GitHub" className="h-5 w-5 inline" />
      </a>
    </p>
  </div>
  );
}

export default Footer;