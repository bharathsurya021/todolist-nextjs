import React from 'react'
import Link from 'next/link';

const Navbar = () => {
        return (
                <div className='flex py-3 flex-wrap justify-around'>
                        <Link href={"/"}>
                                <h1 className='text-lg font-semibold'>Todo App</h1>
                        </Link>
                        {/* <ul className='flex gap-[40px] text-m'>
                                <li>Home</li>
                                <li>Products</li>
                                <li>About</li>
                                <li>Contact</li>
                        </ul> */}
                </div>
        )
}

export default Navbar