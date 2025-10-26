import React,{useState,useEffect} from 'react'
import { useSearchParams,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice'; 
import toast from 'react-hot-toast';



const Viewpaste = () => {
  const {id} = useParams();
  const allPastes = useSelector((state)=> state.paste.pastes);
  const paste = allPastes.filter((p)=>p._id===id)[0];
  console.log("Final Paste: ",paste)
  return (
  <div className="w-full max-w-6xl mx-auto p-6">
    <div className="bg-white/80 backdrop-blur-sm border rounded-lg shadow-sm p-6">
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <input
          className='p-3 rounded-xl mt-0 w-full md:w-2/3 pl-4 border shadow-sm bg-gray-50 text-lg'
          type="text"
          // placeholder='enter title here'
          value={paste?.title}
          disabled
          onChange={(e)=> setTitle(e.target.value)} />
      </div>

      <div className="relative w-full mt-4">
        <textarea
          className="pt-6 pr-12 p-4 border rounded-lg w-full bg-white text-gray-800 whitespace-pre-wrap min-h-[60vh] resize-y font-serif text-lg leading-relaxed"
          rows="5"
          value={paste?.content}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Copy button placed inside top-right corner of content box */}
        <button
          onClick={()=>{
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("Copied to clipboard")
                   }}
          title="Copy"
          aria-label="Copy"
          className="absolute top-3 right-3 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2" />
            <rect width="12" height="12" x="8" y="8" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
   </div>
  )
}

export default Viewpaste
