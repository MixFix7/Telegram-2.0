import React from 'react'
import { useLoaderData } from 'react-router-dom'

export const Home: React.FC = () => {
    const name = useLoaderData() as {name: string | null}
    console.log(name)

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-6xl'>Welcome, {name?.name}</h1>
        <h2 className='text-4xl mt-3'>Let's start creating a new Website?</h2>
    </div>
  )
}
