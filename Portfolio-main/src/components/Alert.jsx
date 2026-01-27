const Alert=({type,text})=>{
    return (
        <div className="absolute left-0 right-0 top-10 flex justify-center items-center">
            <div className={`${type==="danger"? 'bg-red-200':'bg-blue-800'} p-3 rounded-xl flex flex-row`}>
                <p className={`${type==="danger"? 'bg-red-500':'bg-blue-800'} p-2 rounded-xl`} >{type==="danger"?"Failed":"Success"}</p>
                <p className="lg:py-2 lg:px-4 p-2 ">{text}</p>
            </div>
        </div>
    );
}
export default Alert;