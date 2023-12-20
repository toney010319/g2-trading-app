
// eslint-disable-next-line react/prop-types
const Navbalance = ({balance}) => {
// eslint-disable-next-line react/prop-types
    const balanceFormat = balance.toFixed(2)
    
    return (
        <>
            <div className="text-white px-2 py-1 bg-azure-700 rounded-md hover:bg-azure-950">
                Current Balance: ₱{balanceFormat}
            </div>
        </>
    )
}

export default Navbalance