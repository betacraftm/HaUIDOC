'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { User, Globe, ChevronDown } from 'lucide-react'
import Image from 'next/image'

const Header = () => {
	const [isDropdownOpen, setDropdownOpen] = useState(false)
	const dropdownRef = useRef(null)
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [dropdownRef])

	return (
		<header className='py-3 px-4 md:px-12 border-b sticky top-0 bg-white/80 backdrop-blur-sm z-50'>
			<div className='container mx-auto flex justify-between items-center'>
				{/* Logo */}
				<Link
					href='/'
					className='text-2xl font-extrabold text-primary'
				>
					<Image
						src='/logo.svg'
						alt='HaUIDOC Logo'
						width={128}
						height={28}
					/>
				</Link>
				<div className='flex items-center space-x-2'>
					<div>
						<Link
							href='/login'
							className='inline-flex md:hidden p-1 rounded-full'
						>
							<User className='h-5 w-5' />
						</Link>
						<Link
							href='/login'
							className='hidden md:inline-flex items-center justify-center rounded-md text-sm font-semibold h-9 px-4 py-2 transition-colors'
						>
							Đăng nhập
						</Link>
					</div>
					<div
						className='relative'
						ref={dropdownRef}
					>
						<button
							onClick={() => setDropdownOpen(!isDropdownOpen)}
							className='flex items-center justify-center p-1 rounded-full hover:bg-gray-100'
							aria-haspopup='true'
							aria-expanded={isDropdownOpen}
						>
							<Globe className='h-5 w-5' />
							<ChevronDown
								className={`h-4 w-4 ml-1 text-gray-500 transition-transform duration-200 ${
									isDropdownOpen ? 'rotate-180' : ''
								}`}
							/>
						</button>
						{isDropdownOpen && (
							<ul
								className='absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 py-1'
								role='menu'
								aria-orientation='vertical'
							>
								<li role='none'>
									<Link
										href='#'
										className='flex items-center gap-3 px-4 py-2 text-sm font-semibold text-primary'
										role='menuitem'
									>
										<span>Tiếng Việt</span>
									</Link>
								</li>
								<li role='none'>
									<Link
										href='#'
										className='flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
										role='menuitem'
									>
										<span>English</span>
									</Link>
								</li>
							</ul>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
