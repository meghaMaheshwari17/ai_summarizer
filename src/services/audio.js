import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiKey=import.meta.env.VITE_RAPID_API_AUDIO_KEY;

export const audioApi=createApi({
    reducerPath:'audioApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://open-ai21.p.rapidapi.com/',
        prepareHeaders:(headers)=>{
            headers.set('X-RapidAPI-Key',rapidApiKey);
            headers.set('X-RapidAPI-Host','open-ai21.p.rapidapi.com');

            return headers;
        }
    }),
    endpoints:(builder)=>({
        // creating an endpoint
        getAudio:builder.mutation({
            query:(payload)=>(
                 {
                url:'/texttospeech',
                method:'POST',
                body:payload
            }),      
        }),
        
    })
});
 
// doesn't fire as soon as the app loads but once user submits
export const { useGetAudioMutation } = audioApi;
export const { endpoints } = audioApi;