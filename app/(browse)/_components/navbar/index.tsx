import { Logo } from "./logo";
import { Search } from "./search";

export const Navbar = () => {
	return (
		<nav className="fixed top-0 flex items-center justify-between w-full h-20 z-[49] px-2 lg:px-4 bg-[#252731] shadow-sm">
			<Logo />
			<Search />
		</nav>
	);
};
