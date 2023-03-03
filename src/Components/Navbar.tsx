import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { BiChevronRight } from 'react-icons/bi'
import { useAuth } from '../Contexts/AuthContext'

export default function Navbar() {
    
    const { countries } = useAuth()
        
    return (
        <div className='flex justify-between'>
            <div className='flex gap-6'>
                <div className='flex gap-3'>
                    <img src={countries[0].flag} className='w-[40px] h-[30px]'/>
                    <p className='text-[1.2rem]'>{countries[0].name}</p>
                </div>
                <p className='flex text-green-600 text-[1.1rem] items-center'>Change <span><BiChevronRight /></span></p>
            </div>
            <i className='text-[1.3rem]'><FaTimes /></i>
        </div>
    )
}
