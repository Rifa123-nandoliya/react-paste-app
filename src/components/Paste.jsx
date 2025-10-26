import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {removeFromPastes} from '../redux/pasteSlice'
import toast,{Toaster} from 'react-hot-toast'
import { NavLink } from 'react-router-dom'

// Small SVG icon components (Heroicons-like)
const IconEdit = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4h-1a2 2 0 00-2 2v1m4-3l6 6M16 7l1 1M4 20h4l10-10a2.828 2.828 0 00-4-4L4 16v4z" />
  </svg>
)

const IconView = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
  </svg>
)

const IconDelete = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
  </svg>
)

const IconCopy = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2" />
    <rect width="12" height="12" x="8" y="8" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const IconShare = ({className}) => (
  // Updated share icon: arrow leaving a box (external/share)
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14L21 3" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3l-7 7" />
  </svg>
)

const Paste = () => {
  const pastes = useSelector((state)=> state.paste.pastes || []);
  const dispatch = useDispatch();
  const [searchTerm,setsearchTerm]=useState('');

  const filteredData = pastes.filter((paste)=>
    (paste?.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId){
    if(!pasteId) return;
    if(!window.confirm('Delete this paste?')) return;
    dispatch(removeFromPastes(pasteId));
    // toast.success('Deleted paste');
  }

  const handleCopy = async (content) => {
    try{
      await navigator.clipboard.writeText(content || '');
      toast.success('Copied to clipboard');
    }catch(err){
      toast.error('Copy failed');
    }
  }

  const handleShare = async (paste) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: paste.title,
          text: paste.content,
          url: window.location.href,
        });
        toast.success('Shared successfully');
      } catch (err) {
        toast.error('Share cancelled');
      }
    } else {
      toast('Share not supported on this browser');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Toaster position="top-right" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-semibold">Your Pastes</h2>
        <input
          className='p-2 rounded-full w-full sm:w-80 border focus:ring-2 focus:ring-indigo-300'
          type="search"
          placeholder='Search by title...'
          value={searchTerm}
          onChange={(e)=> setsearchTerm(e.target.value)} />
      </div>

      <div className='mt-6 flex flex-col gap-4'>
        {filteredData.length === 0 && (
          <div className="text-center text-gray-500 py-6">No pastes found.</div>
        )}

        {filteredData.map((paste) => (
          <article key={paste?._id} className="bg-white border rounded-lg shadow-sm p-4 md:p-6 flex flex-col md:flex-row md:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800">{paste?.title || 'Untitled'}</h3>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap max-h-36 overflow-auto font-serif text-lg leading-relaxed">{paste?.content}</p>
              <div className="mt-3 text-xs text-gray-400">{paste?.createdAt ? new Date(paste.createdAt).toLocaleString() : ''}</div>
            </div>

            <div className="flex items-start md:flex-col md:items-end gap-2">
              <NavLink to={`/?pasteId=${paste?._id}`} className="p-2 rounded hover:bg-gray-100" title="Edit" aria-label="Edit paste">
                <IconEdit className="w-5 h-5 text-indigo-600" />
              </NavLink>

              <NavLink to={'/pastes/' + paste?._id} className="p-2 rounded hover:bg-gray-100" title="View" aria-label="View paste">
                <IconView className="w-5 h-5 text-slate-700" />
              </NavLink>

              <button onClick={()=>handleDelete(paste?._id)} title="Delete" aria-label="Delete paste" className="p-2 rounded hover:bg-red-50">
                <IconDelete className="w-5 h-5 text-red-600" />
              </button>

              <button onClick={()=>handleCopy(paste?.content)} title="Copy" aria-label="Copy paste" className="p-2 rounded hover:bg-gray-100">
                <IconCopy className="w-5 h-5 text-gray-700" />
              </button>

              <button onClick={() => handleShare(paste)} title="Share" aria-label="Share paste" className="p-2 rounded hover:bg-green-50">
                <IconShare className="w-5 h-5 text-green-600" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Paste
