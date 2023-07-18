import { useRef, useState } from 'react'
import './App.css'
//import Camera from 'react-html5-camera-photo';
//import 'react-html5-camera-photo/build/css/index.css';
import Webcam from 'react-webcam';

const App = () => {

  const [ipAddress, setIPAddress] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [dataNow, setDataNow] = useState('');
  const [imgUrl, setImageUrl] = useState('')
  const webcamRef = useRef(null);
 
  
  const geolocationAPI = navigator.geolocation;

  //get ip
  function getIpAddress(){
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIPAddress(data.ip))
      .catch(error => console.log(error))
  }

  //latitude e longitude
  const getUserCoordinates = () => {
    if (!geolocationAPI) {
      console.log('Geolocation API is not available in your browser!')
    } else {
      geolocationAPI.getCurrentPosition((position) => {
        const { coords } = position;
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
      }, (error) => {
        console.log('Something went wrong getting your position!', error)
      })
    }
  }

  //get camera user 
  const capturePhoto = () => {
    const imgSrc:string = webcamRef.current.getScreenshot()
    console.log('Imagem capturada:', imgSrc);
    setImageUrl(imgSrc)
   }

  // get files user
  // get contact user

  function handleClickBtn(){
    getIpAddress()   
    getUserCoordinates()
    capturePhoto()
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const data = today.toLocaleString()
    setDataNow(data)
    console.log('CLick')
  }



  return (
    <>
      <div> 
        <p>Ip: {ipAddress}</p>
        <p>Localização: {latitude} {longitude}</p>
        <p>Data: { dataNow }</p>
        
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{width: 200, height: 200}}
        />

        <button type="button" onClick={handleClickBtn}>Clique aqui</button>

        <img src={imgUrl} alt="imagem" style={{width: 200, height: 200}} />
        
      </div>
        
    </>
  )
}

export default App
