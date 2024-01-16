const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full  p-4 text-center text-white font-semibold">
      <p className="text-sm mt-4">
        &copy; {new Date().getFullYear()}  Stellar Markets Developed by Anthony, Andrew and Justin.
      </p>
    </div>
  );
}

export default Footer;