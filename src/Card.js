const Card = (props) => {
    const { title, values, bg } = props
    return (
        <div className={`${bg} p-4 mb-4 text-center flex justify-center items-center flex-col rounded`} >
            <p className="text-white font-semibold text-xl">{title}</p>
            <h4 className="text-white text-4xl font-bold ">{values}</h4>
        </div>
    )
}

export default Card
