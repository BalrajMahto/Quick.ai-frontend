import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { dummyPublishedCreationData } from '../assets/assets/dummyPublishedCreationData'

const Community = () => {

  const [creations,setCreations] = useState([])
  const {user} = useUser()
  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData)
  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      Creations
      <div className='bg-white h-full rounded-xl overflow-y-scroll'>
      {creations.map(()=> (
        <div key={index} className='relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3'>
          <img src={creations.content} className='w-full h-full object-cover rounded-lg'/>
        
      ))}

      </div>

    </div>
  )
}

export default Community