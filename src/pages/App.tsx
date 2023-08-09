/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useEffect, useRef, useState } from 'react'
import './App.css'
//import 'react-html5-camera-photo/build/css/index.css';
import Webcam from 'react-webcam';
import { CREATE_SCAMMER } from '../graphql/mutations/create_scammer';
import { useMutation } from '@apollo/client';

const App = () => {
  // const [latitude, setLatitude] = useState(0)
  // const [longitude, setLongitude] = useState(0)
  const [ipAddress, setIpAddress] = useState<string>('')
  const [dataNow, setDataNow] = useState('');
  const [imgUrl, setImageUrl] = useState<string>('')

  const webcamRef = useRef<Webcam | null>(null);
  
  //const geolocationAPI = navigator.geolocation;
  //get ip
  function getIpAddress(){
    fetch('https://api.ipify.org?format=json')
      .then(
        response => response.json()
      )
        .then(
          data =>setIpAddress(data.ip) 
        )
          .catch(error => console.log(error))
  }

  //latitude e longitude
  // const getUserCoordinates = () => {
  //   if (!geolocationAPI) {
  //     console.log('Geolocation API is not available in your browser!')
  //   } else {
  //     geolocationAPI.getCurrentPosition((position) => {
  //       const { coords } = position;
  //       setLatitude(coords.latitude);
  //       setLongitude(coords.longitude);
  //     }, (error) => {
  //       console.log('Something went wrong getting your position!', error)
  //     })
  //   }
  // }

  //get camera user 
  
  const capturePhoto = () => {
    if(webcamRef.current !== null){
      const imgSrc = webcamRef.current.getScreenshot()
      if(imgSrc !== null){
        setImageUrl(imgSrc)
      }else{
        console.log('img null')
      }
    } else{
      console.log('webcamRef.current nulo')
    }
   }

  
  // get files user
  // get contact user

  //MUTATION
  const [createScammer, { error }] = useMutation(CREATE_SCAMMER)

  const callMutation = async () => {
    console.log('Mutation')
    if(!imgUrl || !ipAddress){
      console.log('img null')
      return
    }
    try {
      await createScammer({
        variables: {
          ip: ipAddress,
          image: imgUrl,
          active: true,
          link_token_id: 30,
          localization: '0,0',
        }
      })
      // const response = result.data;
      // console.log('RESPONSE: ', response)
      
    } catch (err) {
      console.log('erro:',err, error)
    }

  }

  function handleClickBtn(){
    getIpAddress()   
    //getUserCoordinates()
    capturePhoto()
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const data = today.toLocaleString();
    setDataNow(data)
    console.log('CLick', ipAddress, imgUrl, dataNow)
  }

  useEffect(() => {
    async function onCallMutation(){
      try {
        await callMutation()
        console.log('Call Function')
      } catch (error) {
        console.log('Error useEffect', error)
      }
    }
    void onCallMutation()
    
  },[imgUrl, ipAddress]);

  return (
      <div className="container"> 
        <p>Ip: {ipAddress}</p>
        {/* <p>Localização: {latitude} {longitude}</p> */}
        <p>Data: { dataNow }</p>
        <button className='btn' type="button" onClick={handleClickBtn}>Clique aqui</button>

        <div className="container-webcam">
          <div className='container-hide'> 
          </div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{width: 200, height: 200}}
            />
        </div>
        <img src={imgUrl} alt="imagem" style={{width: 200, height: 200}} />
      </div>
  )
}

export default App
