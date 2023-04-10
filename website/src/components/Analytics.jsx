import { Content } from "./Content"

export  const Analytics = () => {
    return (
        <Content title="Analytics">
            <div className="grid grid-cols-2 w-full h-full gap-x-0.5 bg-gray-300">
                    <div className="flex flex-col w-full items-center p-4 bg-neutral-100">
                    <h1 className="font-bold text-large">History</h1>
                        <div className="px-1 flex flex-row justify-between w-full">
                            <p className="w-full">Ticker</p>
                            <p className="w-full text-center">Buy/Sell</p>
                            <p className="w-full text-center">Quantity</p>
                            <p className="w-full text-right">Profit</p>
                        </div>
                        <div className="w-full h-0.5 rounded bg-gray-300 mb-2"></div>
                        <div className="mb-2 p-1 flex flex-row justify-between w-full bg-gray-100 rounded-sm border-2 border-gray-200">
                            <p className="w-full">AAPL</p>
                            <p className="w-full text-center">Sell</p>
                            <p className="w-full text-center">10</p>
                            <p className="w-full text-right">$198.36</p>
                        </div>
                        <div className="mb-2 p-1 flex flex-row justify-between w-full bg-gray-100 rounded-sm border-2 border-gray-200">
                            <p className="w-full">NVDA</p>
                            <p className="w-full text-center">Sell</p>
                            <p className="w-full text-center">5</p>
                            <p className="w-full text-right">-$200.44</p>
                        </div>
                        <div className="mb-2 p-1 flex flex-row justify-between w-full bg-gray-100 rounded-sm border-2 border-gray-200">
                            <p className="w-full">GO</p>
                            <p className="w-full text-center">Buy</p>
                            <p className="w-full text-center">10</p>
                            <p className="w-full text-right">-$4245.60</p>
                        </div>
                        <div className="mb-2 p-1 flex flex-row justify-between w-full bg-gray-100 rounded-sm border-2 border-gray-200">
                            <p className="w-full">GOOG</p>
                            <p className="w-full text-center">Sale</p>
                            <p className="w-full text-center">50</p>
                            <p className="w-full text-right">$9184.50</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center px-4 bg-neutral-100">
                        <div className="bg-neutral-100 rounded-sm w-full h-full flex flex-col p-2 px-16 m-2">
                            <h1 className="w-full text-center font-bold text-lg">Best Trade:</h1>
                            <div className="w-full h-0.5 rounded bg-gray-300 mb-2"></div>
                            <p>Stock: <span className="font-bold">AAPL</span></p>
                            <p>Bought at: $146.55</p>
                            <p>Sold at: $192.43</p>
                            <p>Quantity: 100</p>
                            <p className="font-bold">Net profit: $4588</p>
                        </div>
                        <div className="bg-neutral-100 rounded-sm w-full h-full flex flex-col p-2 px-16 m-2">
                            <h1 className="w-full text-center font-bold text-lg">Worst Trade:</h1>
                            <div className="w-full h-0.5 rounded bg-gray-300 mb-2"></div>
                            <p>Stock: <span className="font-bold">AAPL</span></p>
                            <p>Bought at: $ 245.30</p>
                            <p>Sold at: $60.25</p>
                            <p>Quantity: 10</p>
                            <p className="font-bold">Net loss: -$1850.50</p>
                        </div>
                    </div>
            </div>
        </Content>
    )
}