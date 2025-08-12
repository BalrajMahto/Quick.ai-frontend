import React from 'react'
import { Sparkles,Image } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;



const GenerateImages = () => {
   const imageStyle = [
       'Realstic','Ghibli style','cartoon style','anime style','Fantasy style','Realstic style','3d style','Potrait style',
      ]
    
      const [selectedStyle, setSelectedStyle] = useState('Realstic')
      const [input, setInput] = useState('')

      const [publish, setPublish] = useState(false)
      const[Loading, setLoading] = useState(false)
      const [content, setContent] = useState('')


    const {getToken} = useAuth()

    
      const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
          setLoading(true)
          const prompt = `Generate an image in ${selectedStyle} style with the description: "${input}"`
          const {data} = await axios.post('/api/ai/generate-image',{prompt,style:selectedStyle,publish},{headers:{Authorization: `Bearer ${await getToken()}`}})
          if(data.success){
            setContent(data.content)
          } else {
            toast.error(data.message || 'Failed to generate image')
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message) 
        }
        setLoading(false)
      }

  return (
   <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left column */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#00AD25] '/>
          <h1 className='text-xl font-semibold'>AI Image Generation</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Describe Your Image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          type='text'
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          placeholder='Describe what you want to see in your Image ...'
          required
        />
        <p className='mt-4 text-sm font-medium'>Style</p>
        <div className='mt-3 flex gap-3 flex-wrap'>
          {imageStyle.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedStyle === item
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-500 border-gray-300'
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className='my-6 flex items-center gap-2'>
          <label className='relative cursor-pointer'>
            <input type="checkbox" onChange={(e)=>setPublish(e.target.checked)} checked={publish} className='sr-only peer'/>
            <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'></div>
            <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-4 transition'></span>
          </label>
          <p className='text-sm'>Make this image public</p>

        </div>

        <br />
        <button disabled={Loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          {Loading?<span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>:<Image className='w-5' />}
          
          Generate Image
        </button>
      </form>

      {/* right column */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>

        <div className='flex items-center gap-3'>
          <Image className='w-6 h-8 text-[#00AD25]' />
          <h1 className='text-xl font-semibold'>Image Generated</h1>
        </div>
        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Image  className='w-10 h-10' />
            <p>Enter a topic and click "Generate Image" to get started</p>
          </div>
        </div>
        ):(
          <div className='mt-3 h-full'>
            <img src={content} alt="image" className='w-full h-full' />
          </div>
        )}

        
      </div>
    </div>
  )
}

export default GenerateImages