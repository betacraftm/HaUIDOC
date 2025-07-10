import { Search } from 'lucide-react'
import { anton } from '../ui/fonts'

const HomePage = () => {
	return (
		<div>
			<section className='flex flex-col gap-6 items-center justify-center px-6 py-16 text-center max-w-md sm:max-w-lg mx-auto sm:px-0'>
				<h1
					className={`${anton.className} text-4xl sm:text-5xl leading-14 sm:leading-20`}
				>
					Học và thi dễ dàng hơn với{' '}
					<span className='text-secondary'>HaUIDOC</span>
				</h1>
				<p className='sm:text-xl'>
					Nền tảng chia sẻ tài liệu học tập dành riêng cho sinh viên Đại học
					Công nghiệp Hà Nội
				</p>
				<div className='relative mx-auto mt-6 sm:max-w-md w-full'>
					<input
						type='text'
						placeholder='Tìm kiếm tài liệu...'
						className='w-full pr-12 pl-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow transition'
					/>
					<span className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'>
						<Search size={20} />
					</span>
				</div>
			</section>
		</div>
	)
}

export default HomePage
