import { useEffect, useState } from "react"
import Card from "./Card"

const Covid = () => {

    const [data, setData] = useState([])
    const [states, setStates] = useState([])
    const [selectState, setSelectState] = useState('')

    useEffect(() => {
        getCovidData();
    }, [selectState])
    const handleChange = (e) => {
        setSelectState(e.target.value)
    }

    const getCovidData = async () => {
        try {
            const res = await fetch('https://api.covid19india.org/data.json')
            const newData = await res.json();
            setData(newData.statewise[0])
            if (selectState.length) {
                setData(newData.statewise.filter(i => i.state === selectState)[0])
            } else {
                setStates([...new Set(newData.statewise.map((item) => item.state))])
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <h1 className="text-white text-4xl uppercase font-bold text-center mb-8">Covid-19 Coronavirus Tracker</h1>
            <label className="text-white text-base mb-2">Select State</label>
            <div className="relative mb-8">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={selectState} onChange={handleChange}>
                    {
                        states.map((item, index) => {
                            return <option value={item} key={index}>{item}</option>
                        })
                    }
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
            <div className="flex -mx-2 container flex-wrap">
                <div className="w-full lg:w-1/2 xl:w-1/3 px-2">
                    <Card title={data.state === 'Total' ? 'Our Country' : 'State'} values={data.state === 'Total' ? 'India' : data.state} bg="bg-blue-400" />
                </div>
                <div className="w-full lg:w-1/2 xl:w-1/3 px-2">
                    <Card title="Total Recovered" values={data.recovered} bg="bg-green-500" />
                </div>
                <div className="w-full lg:w-1/2 xl:w-1/3 px-2">
                    <Card title="Total Confirmed" values={data.confirmed} bg="bg-yellow-400" />
                </div>
                <div className="w-full lg:w-1/2 xl:w-1/3 px-2">
                    <Card title="Total Deaths" values={data.deaths} bg="bg-yellow-600" />
                </div>
                <div className="w-full lg:w-1/2 xl:w-1/3 px-2">
                    <Card title="Total Active" values={data.active} bg="bg-indigo-800" />
                </div>
                <div className="w-full lg:w-1/2 xl:w-1/3 px-2">
                    <Card title="Last Updated" values={data.lastupdatedtime} bg="bg-pink-600" />
                </div>
            </div>
        </>
    )
}

export default Covid
