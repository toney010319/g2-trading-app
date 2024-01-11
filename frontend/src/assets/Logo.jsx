const Logo = () => {
  return (

    <div className="flex flex-row justify-center mb-1 ml-3 ease-in-out duration-300">
      <img src="https://www.freeiconspng.com/uploads/stock-exchange-icon-png-10.png" width="40" alt="Icon Svg Stock Exchange" />

      <div className="flex flex-col relative z-5">
        <span className="font-bold text-2xl">Stellar</span>
        <sub className="text-md ml-5">Markets</sub>
      </div>
    </div>

  )
}

export default Logo;