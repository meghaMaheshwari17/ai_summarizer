import {github, logo} from '../assets';
import {IconButton} from "@material-tailwind/react"
const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        {/* navbar */}
        <nav className='flex justify-between items-center flex-row w-full mb-10 pt-3'>
            <img src={logo} alt="sumz_logo" className='w-28 object-f'/>

            <button 
            type='button' 
            className='black_btn flex flex-row justify-between items-center'
            onClick={()=>{window.open('')}
            }>
            <img src={github} alt="github_logo" className='mr-2 bg-white rounded-2xl' />
                Github
            </button>
        </nav>
        <h1 className='head_text'>
            Summarize Articles with 
            <br className="md:hidden"/>
            <span className="orange_gradient"> OpenAI GPT-4</span>
        </h1>
        <h2 className="desc">
            Simplify your reading with Summize, an open-source article summarizer that transforms lengthy articles into clear and concise summaries
        </h2>
       
    </header>
  )
}

export default Hero