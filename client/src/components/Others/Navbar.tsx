export default function Headerbar() {
    return(
    <header className="w-full h-14 border-b-4 flex items-center justify-between  px-2 py-8 gap-4 bg-white md:hidden">
        <div className="flex gap-4 jus"> 
        <div className="">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10  rounded-full overflow-hidden border-4 border-gray-500">
                <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                />
                </div>
            </div>
            </div>
            <div className="text-2xl font-extrabold	self-center mb-2">Profile</div>
        </div>
        <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
        </div>
        </div>
    </header>
    )
}