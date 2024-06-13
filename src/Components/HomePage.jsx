import { useState, useEffect, useRef } from "react";

const HomePage = (props) => {

  const {setAudioStream, setFile} = props;
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);

  const mimeType = 'audio/webm'

  async function startRecording (){
    let tempStream 
    console.log('start recording')
    
    try {
      const streamData = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false 
      })
      tempStream = streamData
    } catch (error) {
      console.log(error.message)
      return
    }
    //create new media recorder instance using the stream
    const media = new MediaRecorder(tempStream, {type: mimeType})
    mediaRecorder.current = media

    mediaRecorder.current.start()
  }


  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Free <span className="text-blue-400 bold">Scribe</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record <span className="text-blue-400 px-[5px]">&rarr;</span>Transcibe
        <span className="text-blue-400 px-[5px]">&rarr;</span>Translate
      </h3>
      <button className="flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4">
        <p className="text-blue-400">Record</p>
        <i className="fa-solid fa-microphone"></i>
      </button>
      <p className="text-base ">
        Or &nbsp;
        <label className="text-blue-400 cursor-pointer hover:text-blue-600 duration-200">
          Upload <input 
          onChange={(e) => {
            const tempFile = e.target.files[0];
            setFile(tempFile);
          }}
          type="file" className="hidden" accept=".mp3,.wave" />
        </label>
        a Mp3 file
      </p>
      <p className="italic text-slate-400">Free now Free forever</p>
    </main>
  );
};

export default HomePage;
