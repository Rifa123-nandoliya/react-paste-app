import React,{useState,useEffect} from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice'; 



const Home = () => {
  const [title,setTitle]=useState("");
  const [value,setValue]=useState('');
  const [searchParams,setSearchParams]=useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state)=> state.paste.pastes);
  //jabhi meri paste ID change hogi mai kuch action lena chahti hu
  useEffect(() => {
  if(pasteId){
    const paste = allPastes.find((p)=>p._id===pasteId);
    setTitle(paste.title);
    setValue(paste.content);
  }
  }, [pasteId])

  function createPaste(){
  const paste = {
    title: title,
    content:value,
    _id: pasteId || Date.now().toString(36),
    createdAt: new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
   })
  }
  if(pasteId){
    //update
    dispatch(updateToPastes(paste));
  }
  else{
    //create
    dispatch(addToPastes(paste));
  }
  //after creation or updation
  setTitle('');
  setValue('');
  setSearchParams({});
  }
  return (
  <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-pink-50 font-serif italic">

      <div className="max-w-4xl mx-auto p-6">
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <input
            className='p-3 rounded-2xl w-full md:w-2/3 pl-4 border shadow-sm bg-white text-gray-800 text-lg'
            type="text"
            placeholder='enter title here'
            value={title}
            onChange={(e)=> setTitle(e.target.value)} />

          <button
            onClick={createPaste}
            className='mt-2 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-2xl shadow'>
            { pasteId ? "Update My Paste" : "Create My Paste" }
          </button>
        </div>

        <div className='mt-8'>
          <div className='relative'>
            {/* overlay placeholder centered when textarea empty */}
            {!value && (
              <div className='absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 text-center px-6'>
                <span className='text-xl'>enter content here</span>
              </div>
            )}

            <textarea
              className='rounded-2xl mt-4 w-full p-6 min-h-80 border resize-y bg-white text-gray-800'
              value={value}
              onChange={(e)=> setValue(e.target.value)}
              rows={20}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
