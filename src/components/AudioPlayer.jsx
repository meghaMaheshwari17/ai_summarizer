// import React, { useState, useEffect } from "react";


// const useAudio = url => {
//   const [audio] = useState(new Audio(url));
//   const [playing, setPlaying] = useState(false);

//   const toggle = () => setPlaying(!playing);

//   useEffect(() => {
//       playing ? audio.play() : audio.pause();
//     },
//     [playing]
//   );

//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false));
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false));
//     };
//   }, []);

//   return [playing, toggle];
// };

// const AudioPlayer = ({ url }) => {
//   const [playing, toggle] = useAudio(url);

//   return (
//     <div>
//       <img className="hover:cursor-pointer" src={audio} onClick={toggle}/>
//     </div>
//   );
// };

// export default AudioPlayer;
// AudioPlayer.js
// import React, { useState, useRef, useEffect } from 'react';
// import { audio } from "../assets";
// const AudioPlayer = ({ audioUrl,fetchAudioUrl}) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(new Audio(audioUrl));

//   useEffect(() => {
//     // fetch(audioUrl)
//     //    .then(response=>console.log(response))
//     if (audioUrl) {
//       audioRef.current.src = audioUrl;
//       audioRef.current.load(); // Reload the audio element to ensure the new source is ready

//       // Handle play/pause when the component mounts
//       if (isPlaying) {
//         audioRef.current.play();
//       } else {
//         audioRef.current.pause();
//       }
//     }
//   }, [audioUrl]);


//   const togglePlay = async() => {
//     if (audioUrl) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }else{
//       await fetchAudioUrl();
//     }
//   };

//   return (
//     <div>
//       {console.log(audioUrl)}
//       {audioUrl ? (
//         <>
//           {/* <img
//             src={audio}
//             alt="Play Audio"
//             style={{ cursor: 'pointer' }}
//             onClick={togglePlay}
//           /> */}
//           <audio ref={audioRef} controls />
//         </>
//       ) : (
//         <p>Error: Audio URL not available</p>
//       )}
//     </div>
//   );
// };
// export default AudioPlayer;
// current
// import React, { useState, useRef, useEffect } from 'react';
// import { audio } from "../assets";

// const AudioPlayer = ({ audioUrl, fetchAudioUrl }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const audioRef = useRef(new Audio());

//   useEffect(() => {
//     const loadAudio = async () => {
//       if (audioUrl) {
//         setIsProcessing(true); // Set processing state while waiting for audio data

//         audioRef.current.src = audioUrl;
//         audioRef.current.load();

//         // Event listener to detect when the audio has loaded data
//         const handleLoadedData = () => {
//           setIsProcessing(false);
//           setIsLoading(false);
//         };

//         audioRef.current.addEventListener('loadeddata', handleLoadedData);

//         return () => {
//           // Clean up event listener
//           if (audioRef.current) {
//             audioRef.current.removeEventListener('loadeddata', handleLoadedData);
//           }
//         };
//       }
//     };

//     loadAudio();
//   }, [audioUrl]);

//   const togglePlay = async () => {
//     if (audioUrl) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     } else {
//       await fetchAudioUrl();
//     }
//   };

//   return (
//     <div>
//       {console.log(audioUrl)}
//       {audioUrl ? (
//         <>
//           {isProcessing ? (
//             <p>Processing audio...</p>
//           ) : isLoading ? (
//             <p>Loading audio file...</p>
//           ) : (
//             <>
//               {/* <img
//                 src={audio}
//                 alt="Play Audio"
//                 style={{ cursor: 'pointer' }}
//                 onClick={togglePlay}
//               /> */}
//               <audio ref={audioRef} controls />
//             </>
//           )}
//         </>
//       ) : (
//         <p>Error: Audio URL not available</p>
//       )}
//     </div>
//   );
// };

// export default AudioPlayer;

import React, { useState, useRef, useEffect } from 'react';
// import { audio } from '../assets';

const AudioPlayer = ({ audioUrl, fetchAudioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const audioRef = useRef(new Audio(audioUrl));

  useEffect(() => {
    const loadAudio = async () => {
      if (audioUrl && isLoading) {
        setIsProcessing(true); // Set processing state while waiting for audio data

        // Periodically check the status and update the state
        const checkStatus = setInterval(async () => {
          const response = await fetch(audioUrl);
          console.log(response);
          // const data = await response.json();
          audioRef.current.src = audioUrl;
          audioRef.current.load();
          audioRef.current.addEventListener('loadeddata', ()=>{
            console.log("canplay")
            setIsProcessing(false);
            setIsLoading(true);
            audioRef.current.src = audioUrl;
            audioRef.current.load();
            handleLoadedData();
          });
        }, 15000); // Check every 5 seconds (adjust as needed)

        // Event listener to detect when the audio has loaded data
        const handleLoadedData = () => {
          clearInterval(checkStatus); // Stop the status check
          setIsLoading(false);
        };

        // audioRef.current.addEventListener('loadeddata', handleLoadedData);

        return () => {
          // Clean up event listener and interval
          if (audioRef.current) {
            audioRef.current.removeEventListener('loadeddata', handleLoadedData);
          }
          clearInterval(checkStatus);
        };
      }else{
        audioRef.current.src = audioUrl;
         audioRef.current.load();
      }
    };

    loadAudio();
  }, [audioRef,audioUrl]);
  
  const togglePlay = async () => {
    if (audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      await fetchAudioUrl();
    }
  };

  return (
    <div>
      {console.log(audioUrl)}
      {audioUrl ? (
        <>
          {isProcessing ? (
            <p>Processing audio...</p>
          ) : isLoading ? (
            <p>Loading audio file...</p>
          ) : (
            <>
              {/* <img
                src={audio}
                alt="Play Audio"
                style={{ cursor: 'pointer' }}
                onClick={togglePlay}
              /> */}
              <audio ref={audioRef} controls />
            </>
          )}
        </>
      ) : (
        <p>Error: Audio URL not available</p>
      )}
    </div>
  );
};

export default AudioPlayer;


// AudioPlayer.js
// import React, { useState, useEffect ,useRef} from 'react';
// import { audio } from "../assets";
// const AudioPlayer = ({ fetchAudioUrl }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [audioUrl, setAudioUrl] = useState('');
//   const isMounted = useRef(true);

//   useEffect(() => {
//     const fetchDataAndPlay = async () => {
//       try {
//         const response = await fetchAudioUrl();
//         if (isMounted.current) {
//           if (response && response.audioUrl) {
//             setAudioUrl(response.audioUrl);
//           } else {
//             console.error('Error: Audio URL not available in the response.');
//             setAudioUrl('');
//           }
//         }
//       } catch (error) {
//         if (isMounted.current) {
//           console.error('Error fetching audio URL:', error);
//           setAudioUrl('');
//         }
//       }
//     };

//     fetchDataAndPlay();
//     return () => {
//       isMounted.current = false;
//     };
//   }, [fetchAudioUrl]);

//   const togglePlay = () => {
//     if (audioUrl) {
//       setIsPlaying((prevIsPlaying) => {
//         const audio = new Audio(audioUrl);

//         if (prevIsPlaying) {
//           audio.pause();
//         } else {
//           audio.play();
//         }

//         return !prevIsPlaying;
//       });
//     }
//   };

//   return (
//     <div>
//       {audioUrl ? (
//         <>
//           <img
//             src={audio}
//             alt="Play Audio"
//             style={{ cursor: 'pointer' }}
//             onClick={togglePlay}
//           />
//           {/* Optionally, you can display audio controls */}
//           <audio controls src={audioUrl} />
//         </>
//       ) : (
//         <p>Error: Audio URL not available</p>
//       )}
//     </div>
//   );
// };

// export default AudioPlayer;

