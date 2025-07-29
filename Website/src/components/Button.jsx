const Button=({handler,btnName})=>{
    return(
        <button className="mt-4 mb-8 w-36 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-white/50 to-black/50 group-hover:from-green-400 group-hover:to-black hover:text-white dark:text-white/80 focus:ring-2 focus:outline-none focus:ring-white/20 dark:focus:ring-white" onClick={handler} >
<span className="relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
{btnName}
</span>
</button>
    )
}
export default Button