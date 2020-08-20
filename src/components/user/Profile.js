import React from 'react'

export default function UserProfile() {
    return (
        <div>
            <div className=' flex flex-col md:flex-row items-center justify-center  max-w-xl mx-auto my-10'>

                <figure className='w-48 h-48 bg-gray-800  rounded-full mr-10'></figure>
                <div className=' flex flex-col flex-1'>
                    <h1>User Name</h1>
                    <article className='text-gray-600'>
                        Cupidatat anim officia excepteur aute aliquip ut aliqua velit deserunt nulla veniam ut exercitation amet. Mollit eu elit sit aliquip in ullamco ex elit. Sunt nulla culpa duis et reprehenderit anim velit culpa amet esse. Dolore elit id labore officia proident quis.
                    </article>
                    <div className='flex flex-row gap-4 my-2 font-semibold text-sm'>
                        <span className='px-3 py-1 rounded-full bg-red-500 text-black'>11 errors</span>
                        <span className='px-3 py-1 rounded-full bg-green-500 text-black'>2 awards</span>
                        <span className='px-3 py-1 rounded-full bg-yellow-500 text-black'>3 bugs</span>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto'>
                <section>
                    <h3 className='mt-4'>Projects</h3>
                    <article className='base mb-4 '>
                        <h3 className='mt-4'>Project 1</h3>
                        <p>In laboris ea eiusmod est duis reprehenderit et Lorem sint nisi.</p>
                    </article>
                    <article className='base '>
                        <h3 className='mt-4'>Project 1</h3>
                        <p>Sint quis commodo consequat sint.</p>
                    </article>
                    <h3 className='mt-4'>Vulnerabilities</h3>
                    <article className='base mb-4 '>
                        <h3 className='mt-4'>Vulnerability 1</h3>
                        <p>Cupidatat laboris adipisicing duis mollit ex eiusmod nostrud officia eiusmod. </p>
                    </article>
                   
                </section>
                <section>
                    <h3 className='mt-4'>Tasks</h3>
                    <article className='base mb-4 '>
                        <h3 className='mt-4'>Task</h3>
                        <p>Magna magna non voluptate commodo in quis aute.</p>
                    </article>
                    <article className='base '>
                        <h3 className='mt-4'>Task</h3>
                        <p>Ullamco cupidatat sint amet consectetur duis culpa enim do fugiat.</p>
                    </article>
                </section>
            </div>

        </div>
    )
}
