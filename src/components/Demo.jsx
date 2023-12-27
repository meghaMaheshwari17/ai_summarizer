import { useState , useEffect } from 'react'
import { copy , linkIcon , loader , tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';
import AudioPlayer from './AudioPlayer';
import { useGetAudioMutation } from '../services/audio';
// making api request in a scalabale and structured way by using redux toolkit
const Demo = (props) => {
  const [article,setArticle]=useState({
    url:'',
    summary:'',
    audioUrl:''
  });
  const [allArticles,setAllArticles]=useState([]);
  const [getSummary,{error,isFetching}]=useLazyGetSummaryQuery();
  const [audioFetch,setAudioFetch]=useState(true);
  const [getAudio, { isloading, iserror, data, aerror }]=useGetAudioMutation();
  useEffect(()=>{
    const articlesFromLocalStorage=JSON.parse(localStorage.getItem('articles'))
    if (articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage);
    }
  },[])
  const [audioData, setAudioData] = useState({
    isFetching: false,
    isError: false,
    audioUrl: '',
    audioFetch:false
  });
  useEffect(()=>{
    if(!audioData.isFetching && audioData.audioUrl!=''){
      setTimeout(()=>{
        setAudioData({audioFetch:true});
      },15000);
      console.log(isloading);
    }
    
  },[audioData.isFetching])
  // const handleSubmit= async (e)=>{
  //   e.preventDefault();
  //   try {
  //   const {data} =await getSummary({articleUrl:article.url});

  //   if(data?.summary){
      
  //     let text=data.summary
  //     fetchAudioUrl(data.summary);
  //     const response = await getAudio({ text }); // Assuming 'text' is the payload for the text-to-speech API
      
  //     let aUrl=response.data?.url ? response.data.url : ''; 
  //     const newArticle={...article,summary:data.summary,audioUrl:aUrl};
  //     setArticle(newArticle);
  //     const updatedAllArticles=[newArticle,...allArticles];
  //     setAllArticles(updatedAllArticles);
  //     // local storage can only contain strings
  //     localStorage.setItem('articles',JSON.stringify(updatedAllArticles));
  //   }
  //    } catch (err) {
  //       console.error('Error:', err);
  //    }
  // }
 

  const fetchAudioUrl = async (text) => {
    setAudioData({ isFetching: true, isError: false, audioUrl: '' }); // Set loading state

    try {
      // let newText=text.substring(0,2000);
       await getAudio({  text}).then((response)=>{
        console.log(response);
        console.log(isloading);
        let aUrl = response.data?.url ? response.data.url : '';
        setAudioData({ isFetching: false, isError: false, audioUrl: aUrl });
        const newArticle = { ...article,summary:text ,audioUrl: aUrl };
        setArticle(newArticle);
        const updatedAllArticles = [newArticle, ...allArticles];
         setAllArticles(updatedAllArticles);
         localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
      });
        
        
      
    } catch (audioError) {
      console.error('Error fetching audio URL:', audioError);
      setAudioData({ isFetching: false, isError: true, audioUrl: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await getSummary({ articleUrl: article.url });

      if (data?.summary) {
        await fetchAudioUrl(data.summary);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };
  return (
    <section className='mt-16 w-full max-w-xl'>
      
      {/* search */}
      <div className="flex flex-col w-full gap-2">
        <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
          <img 
          src={linkIcon} 
          alt="link_icon"
          className="absolute left-0 my-2 ml-3 w-5"
          ></img>
          {/* peer is used to dynamc display without the use of js */}
          <input type="url" placeholder="Enter a URL" 
          value={article.url} 
          onChange={(e)=>{setArticle({...article,url:e.target.value})}}
          required
          className='url_input peer'
          />
          <button type="submit" className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>
            ✓
           </button>
        </form>
        {/* browse URL History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((item,index)=>(
            <div 
            key={`link-${index}`}
            onClick={()=>{setArticle(item); setAudioData({audioFetch:true})}}
            className='link_card'
            >
              <div className='copy_btn'>
                  <img 
                  onClick={async() => {
                    await navigator.clipboard.writeText(article.url)
                    props.onChange();
                  }}
                  src={copy} alt="copy_icon" className="w-[40%] h-[40%] object-contain"/>
              </div>
              <p className='flex-1 font-nunito text-blue-700 font-medium text-sm truncate'>{item.url}</p>
            </div>
          ))}
        </div>
      </div>
      {/* display results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {
          isFetching ? ( <img src={loader} alt="loader" className='w-20 h-20 object-contain' />):
          error ? ( <p className="font-inter font-bold text-black text-center">Well, that wasn't supposed to happen...
          <br/>
          <span className='font-nunito font-normal text-gray-700'>{error?.data?.error}</span>
          </p>):article.summary && (
            <div className='flex flex-col gap-3'>
              <div className='flex flex-row justify-between items-center'>
              <h2 className="font-nunito font-bold text-gray-600 text-xl">
                Article <span className='blue-gradient'>Summary</span>
              </h2>
              {(audioData.audioFetch) && <AudioPlayer audioUrl={audioData.audioFetch ? article.audioUrl : null} />}
             
              </div>
              
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
              </div>

            </div>
          )
        }
      </div>
    </section>
  )
}

export default Demo