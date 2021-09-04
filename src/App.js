import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Config from '../src/Config.json'
import '../src/App.css'
import image from '../src/Artboard 1 copy 19.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [registerdata, setRegisterdata] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    date: 'Slot for 25th aug-Agra ',
    time: '',
    classname: ''
  })
  const [payment, setPayment] = useState('')
  const [others, setOthers] = useState(false)
  const [center, setCenter] = useState('Agra')
  const { name, mobile, email, city, state, date, time, classname } = registerdata

  const onchange = (e) => {
    console.log(e.target.value)
    setRegisterdata({ ...registerdata, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)
    const myParam = urlParams.get('payment_status');
    console.log(myParam)
    if (myParam === 'Success') {
      setPayment('Success')
    }
    if (myParam === 'Failed') {
      alert('PAYMENT FAILED')
    }
    const script1 = document.createElement("script");
    const script2 = document.createElement("script");
    script1.src = "https://geodata.solutions/includes/statecity.js";
    script1.async = true;
    script2.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";
    script2.async = true;
    document.body.appendChild(script1);
    document.body.appendChild(script2);
  }, [others])
  function submitHandler(e) {
    e.preventDefault()
    if (mobile.length > 10) {
      return toast.error('Mobile Number length must be equal to 10', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    let req = {
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
    console.log('hello')
    let formdata = new FormData()
    formdata.append('name', name)
    formdata.append('mobile_number', `+91 ${mobile}`)
    formdata.append('email', email)
    formdata.append('city', center)
    formdata.append('state', state)
    formdata.append('slot_date', date)
    formdata.append('slot_time', time)
    formdata.append('class_name', classname)
    axios.post(Config.SERVER_URL + 'marketing/paymentlink_via_instamojo/', formdata, req).then((data) => {
      console.log(data)
      console.log(mobile.length)
      if (data.data.Error) {
        return toast.error(data.data.Error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
      let d = JSON.parse(data.data)
      if (d.success == true) {
        toast.success('Submit Successfully', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setTimeout(() => {
          window.open(d.payment_request.longurl)
        }, 1000);
      }
      else if (data.data.Error) {
        toast.error(data.data.Error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
      else {
        toast.error('We are facing some temporary issue please pay tomorrow.', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  function submitHandlerother(e) {
    e.preventDefault()
    if (mobile.length > 10) {
      return toast.error('Mobile Number length must be less than or equal to 10', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    let req = {
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
    let formdata = new FormData()
    formdata.append('name', name)
    formdata.append('mobile_number', `+91 ${mobile}`)
    formdata.append('email', email)
    formdata.append('city', city)
    formdata.append('state', state)
    formdata.append('class_name', classname)
    formdata.append('slot_date', "0")
    formdata.append('slot_time', "0")
    for (var value of formdata.values()) {
      console.log(value);
    }
    axios.post(Config.SERVER_URL + 'marketing/myclassroom_form/', formdata, req).then((data) => {
      console.log(data)
      if (data.data.success) {
        toast.success('Submit Successfully', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
      else {
        toast.error(data.data.Error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    }).catch((err) => {
      console.log(err)
      alert('Server Error Or Check your Connectivity')
    })
  }
  function Indra() {
    setOthers(false)
    setCenter('Indirapuram')
    setRegisterdata({
      date: 'Slot for 27th aug-Indrapuram'
    })
    let a2 = document.querySelector('.nav_box2')
    a2.style.backgroundColor = 'white'
    a2.style.color = 'black'
    let a1 = document.querySelector('.nav_box1')
    a1.style.backgroundColor = '#2c2c96 '
    a1.style.color = 'white'
    let a3 = document.querySelector('.nav_box3')
    a3.style.backgroundColor = '#2c2c96 '
    a3.style.color = 'white'
    let a4 = document.querySelector('.nav_box4')
    a4.style.backgroundColor = '#2c2c96 '
    a4.style.color = 'white'
  }
  function Agra() {
    setOthers(false)
    setCenter('Agra')
    setRegisterdata({
      date: 'Slot for 25th aug-Agra '
    })
    let a1 = document.querySelector('.nav_box1')
    a1.style.backgroundColor = 'white'
    a1.style.color = 'black'
    let a2 = document.querySelector('.nav_box2')
    a2.style.backgroundColor = '#2c2c96 '
    a2.style.color = 'white'
    let a3 = document.querySelector('.nav_box3')
    a3.style.backgroundColor = '#2c2c96 '
    a3.style.color = 'white'
    let a4 = document.querySelector('.nav_box4')
    a4.style.backgroundColor = '#2c2c96'
    a4.style.color = 'white'
  }
  function Far() {
    setCenter('Faridabad')
    setOthers(false)
    setRegisterdata({
      date: 'Slot for 29th aug-Faridabad'
    })
    let a3 = document.querySelector('.nav_box3')
    a3.style.backgroundColor = 'white'
    a3.style.color = 'black'
    let a2 = document.querySelector('.nav_box2')
    a2.style.backgroundColor = '#2c2c96 '
    a2.style.color = 'white'
    let a1 = document.querySelector('.nav_box1')
    a1.style.backgroundColor = '#2c2c96 '
    a1.style.color = 'white'
    let a4 = document.querySelector('.nav_box4')
    a4.style.backgroundColor = '#2c2c96 '
    a4.style.color = 'white'
  }
  function other() {
    setCenter('other')
    setOthers(true)
    let a4 = document.querySelector('.nav_box4')
    a4.style.backgroundColor = 'white'
    a4.style.color = 'black'
    let a2 = document.querySelector('.nav_box2')
    a2.style.backgroundColor = '#2c2c96 '
    a2.style.color = 'white'
    let a3 = document.querySelector('.nav_box3')
    a3.style.backgroundColor = '#2c2c96 '
    a3.style.color = 'white'
    let a1 = document.querySelector('.nav_box1')
    a1.style.backgroundColor = '#2c2c96 '
    a1.style.color = 'white'
  }
  return (
    <div>
      <ToastContainer />
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="#">
          <img src={image} width='150px' />
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
          </ul>
        </div>
      </nav>
      <div className='container_one'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6'>
              <svg width="450" height="300" viewBox="0 0 408 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="127.852" y="187.864" width="279.187" height="51.3147" rx="18" fill="#2D3482" fill-opacity="0.6" />
                <rect x="205.258" y="449.655" width="123.503" height="29.5712" rx="14.7856" fill="#2D3482" fill-opacity="0.5" />
                <rect x="53.0547" y="343.548" width="168.73" height="52.1844" rx="18" fill="#E87A26" fill-opacity="0.2" />
                <g clip-path="url(#clip0)">
                  <path d="M84.5799 290.492C74.3336 290.492 74.2034 279.611 75.4232 273.705L146.789 213.085C156.852 221.789 177.345 239.571 178.808 241.063C180.272 242.556 182.468 241.685 183.383 241.063L214.487 213.085C234.919 231.426 278.888 269.954 286.939 276.669C286.939 284.963 283.102 289.559 279.442 290.492H84.5799Z" fill="#FFCBA3" />
                  <path d="M74.8984 277.592V148.58L148.016 213.086L74.8984 277.592Z" fill="#E8E8E7" />
                  <path d="M286.934 149.501V278.513L213.816 214.007L286.934 149.501Z" fill="#E8E8E7" />
                  <path d="M76.5692 152.826L176.145 240.232C178.883 242.635 182.933 242.667 185.691 240.288C221.306 209.565 284.138 156.276 286.933 151.344C289.857 146.184 284.679 135.679 279.195 135.679H85.4342C75.9739 135.679 74.0761 143.906 74.5151 149.125C74.6384 150.589 75.4695 151.86 76.5692 152.826Z" fill="#2D3482" />
                </g>
                <path d="M31.4199 125.163L4.22955 105.238L31.4199 85.3132L31.4199 125.163Z" stroke="#2D3482" stroke-width="5" />
                <circle cx="390.081" cy="105.673" r="14.4599" stroke="#E87A26" stroke-width="5" />
                <path d="M37.5109 370.075C37.5109 377.945 30.7669 384.535 22.1812 384.535C13.5956 384.535 6.85156 377.945 6.85156 370.075C6.85156 362.206 13.5956 355.615 22.1812 355.615C30.7669 355.615 37.5109 362.206 37.5109 370.075Z" stroke="#E87A26" stroke-width="5" />
                <circle cx="29.1363" cy="29.1363" r="29.1363" fill="#8185B4" />
                <rect x="81.7578" y="3.47852" width="278.317" height="51.3147" rx="18" fill="#E87A26" fill-opacity="0.2" />
                <rect x="264.531" y="90.585" width="11.0461" height="10.1764" stroke="#E87A26" stroke-width="2" />
                <rect x="191.469" y="420.215" width="20.6133" height="18.004" stroke="#E87A26" stroke-width="2" />
                <defs>
                  <clipPath id="clip0">
                    <rect width="215.696" height="154.814" fill="white" transform="translate(73.0547 135.679)" />
                  </clipPath>
                </defs>
              </svg>
              <div class='side_box'>
                <p>
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="3.49944" cy="3.49944" r="3.21429" fill="white" />
                  </svg>
                  <span class='box_text'>Attend the free seminar by registering with us.</span>
                </p>
                <p>
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="3.49944" cy="3.49944" r="3.21429" fill="white" />
                  </svg>
                  <span class='box_text'>If you wish to reserve your seat for the classroom courses, pay a token amount of ₹100 to book your seat. We have limited seats per classroom.</span>
                </p>
                <p>
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="3.49944" cy="3.49944" r="3.21429" fill="white" />
                  </svg>
                  <span class='box_text'>In case you change your mind and decide not to enroll in the course, we will refund your paid amount.</span>
                </p>
              </div>
              <div style={{ float: 'right' }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 21.009C30.0008 22.1907 29.7685 23.3609 29.3163 24.4527C28.8642 25.5445 28.2012 26.5364 27.3652 27.3715C26.5292 28.2067 25.5366 28.8688 24.4444 29.3198C23.3522 29.7708 22.1817 30.002 21 30L9 30C4.0305 30 1.55394e-06 25.9575 1.12133e-06 21.009L-4.53067e-07 2.99999L21 2.99999C25.9695 2.99999 30 7.04249 30 11.991L30 21.009ZM12 18L12 15L9 15L9 18L12 18ZM21 18L21 15L18 15L18 18L21 18Z" fill="#2D3482" />
                  <rect x="7" y="12" width="17" height="9" fill="#2D3482" />
                  <path d="M15.288 9.08C16.92 9.08 18.224 9.528 19.2 10.424C20.192 11.32 20.688 12.544 20.688 14.096C20.688 15.712 20.176 16.928 19.152 17.744C18.128 18.56 16.768 18.968 15.072 18.968L14.976 20.864H12.6L12.48 17.096H13.272C14.824 17.096 16.008 16.888 16.824 16.472C17.656 16.056 18.072 15.264 18.072 14.096C18.072 13.248 17.824 12.584 17.328 12.104C16.848 11.624 16.176 11.384 15.312 11.384C14.448 11.384 13.768 11.616 13.272 12.08C12.776 12.544 12.528 13.192 12.528 14.024H9.96C9.96 13.064 10.176 12.208 10.608 11.456C11.04 10.704 11.656 10.12 12.456 9.704C13.272 9.288 14.216 9.08 15.288 9.08ZM13.752 26.168C13.256 26.168 12.84 26 12.504 25.664C12.168 25.328 12 24.912 12 24.416C12 23.92 12.168 23.504 12.504 23.168C12.84 22.832 13.256 22.664 13.752 22.664C14.232 22.664 14.64 22.832 14.976 23.168C15.312 23.504 15.48 23.92 15.48 24.416C15.48 24.912 15.312 25.328 14.976 25.664C14.64 26 14.232 26.168 13.752 26.168Z" fill="white" />
                </svg>
              </div>
            </div>
            <div className='col-lg-6'>
              <h1 className='one_heading'>BOOK YOUR SEAT</h1>
              {payment === 'Success' ? <p style={{ color: 'green', textAlign: 'center' }}>Your Seat Has Been Booked</p> : ''}
              {others ? '' : <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>Choose your nearest center </p>}
              <div class='nav_con'>
                <div class='row'>
                  <div class='col-lg-3'>
                    <div class='nav_box1' onClick={Agra}>
                      AGRA
                    </div>
                  </div>
                  <div class='col-lg-3'>
                    <div class='nav_box2' onClick={Indra}>
                      INDIRAPURAM
                    </div>
                  </div>
                  <div class='col-lg-3'>
                    <div class='nav_box3' onClick={Far}>
                      FARIDABAD
                    </div>
                  </div>
                  <div class='col-lg-3'>
                    <div class='nav_box4' onClick={other}>
                      OTHERS
                    </div>
                  </div>
                </div>
              </div>
              {others ? <br /> : <div> <p style={{ marginTop: '10px', color: '#2c2c96 ' }}>Selected Current City : {center}</p></div>}
              {others ? <div>
                <p style={{ textAlign: 'center', color: '#2c2c96 ' }}>Currently, we do not have a centre in your city.
                  Please fill the form and we will open a centre in your city shortly!</p>
                <div className='input_con'>
                  <form onSubmit={submitHandlerother}>
                    <div className='row'>
                      <div className='col-lg-6'>
                        <input type='text' className='form-control' placeholder='Name' value={name} name="name" onChange={onchange} required>
                        </input>
                      </div>
                      <div className='col-lg-6'>
                        <select name="city" required class='select_input' name='classname' value={classname} onChange={onchange} >
                          <option>Select Current Class</option>
                          <option>IX</option>
                          <option>X</option>
                          <option>XI JEE</option>
                          <option>XI NEET</option>
                          <option>XII JEE</option>
                          <option>XII NEET</option>
                          <option>DROPPER JEE</option>
                          <option>DROPPER NEET</option>
                        </select>
                      </div>
                    </div>
                    <div className='row' id='form_in'>
                      <div className='col-lg-6'>
                        <input type='email' className='form-control' placeholder='Email' value={email} name="email" onChange={onchange} required >
                        </input>
                      </div>
                      <div class='col-lg-1'>
                        <p style={{ color: '#2c2c96 ', fontSize: '20px' }}>+91</p>
                      </div>
                      <div class='col-lg-5'>
                        <div>
                          <input type='number' className='form-control' placeholder='Mobile Number' value={mobile} name='mobile' onChange={onchange} required min='1' >
                          </input>
                        </div>
                      </div>
                    </div>
                    <div className='row' id='form_in'>
                      <div className='col-lg-6'>
                        <input type="hidden" name="country" id="countryId" value="IN" />
                        <select name="state" class="states order-alpha form-control" id="stateId" value={state} onChange={onchange} required>
                          <option value="">Select State</option>
                        </select>
                        <br />
                        <br />
                      </div>
                      <div className='col-lg-6'>
                        <select name="city" class="cities order-alpha form-control" id="cityId" onChange={onchange} value={city} required>
                          <option value="">Select City</option>
                        </select>
                      </div>
                    </div>

                    <div class='row'>
                      <div class='col-lg-12'>
                        <center>
                          <div class="g-recaptcha" data-sitekey="6LcCHh8cAAAAAKZ1lL8I47JRBK8iqFQDQilC8H0U"></div>
                          <button class='paynow_btn' type='submit'>SUBMIT</button>
                        </center>
                      </div>
                    </div>
                  </form>
                </div>
              </div> : <div>
                <div className='input_con'>
                  <form onSubmit={submitHandler}>
                    <div className='row'>
                      <div className='col-lg-6'>
                        <input type='text' className='form-control' placeholder='Name' value={name} name="name" onChange={onchange} required>
                        </input>
                      </div>
                      <div className='col-lg-6'>
                        <select name="city" required class='select_input' name='classname' value={classname} onChange={onchange} >
                          <option>Select Current Class</option>
                          <option>IX</option>
                          <option>X</option>
                          <option>XI JEE</option>
                          <option>XI NEET</option>
                          <option>XII JEE</option>
                          <option>XII NEET</option>
                          <option>DROPPER JEE</option>
                          <option>DROPPER NEET</option>
                        </select>
                      </div>
                    </div>
                    <div className='row' id='form_in'>
                      <div className='col-lg-6'>
                        <input type='email' className='form-control' placeholder='Email' value={email} name="email" onChange={onchange} required >
                        </input>
                      </div>
                      <div class='col-lg-1'>
                        <p style={{ color: '#2c2c96 ', fontSize: '20px' }}>+91</p>
                      </div>
                      <div class='col-lg-5'>
                        <div>
                          <input type='number' className='form-control' placeholder='Mobile Number' value={mobile} name='mobile' onChange={onchange} required min='1' >
                          </input>
                        </div>
                      </div>
                    </div>
                    <div className='row' id='form_in'>
                      <div className='col-lg-6'>
                        <select name="city" required class='select_input' name='date' value={date} onChange={onchange}>
                          <option>{date}</option>
                        </select>
                      </div>
                      <div className='col-lg-6'>
                        <select name="city" required class='select_input' name='time' value={time} onChange={onchange} >
                          <option>Slot Time</option>
                          <option>3:00pm-4:30pm</option>
                          <option>4:45pm-6:15pm</option>
                          <option>6:30pm-8:00pm</option>
                          <option>8:15pm-9:45pm</option>
                        </select>
                      </div>
                    </div>
                    <div class='row'>
                      <div class='col-lg-12'>
                        <center>
                          <button class='paynow_btn' type='submit'>PAY NOW</button>
                          {/* <svg width="30" height="42" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg" id='svg_comma'>
                            <path d="M21.4896 41.8327C9.98333 41.8327 0.65625 32.5056 0.65625 20.9994C0.65625 9.4931 9.98333 0.166016 21.4896 0.166016C32.9958 0.166016 42.3229 9.4931 42.3229 20.9994C42.3229 32.5056 32.9958 41.8327 21.4896 41.8327ZM19.4063 27.2494V31.416H23.5729V27.2494H19.4063ZM23.5729 23.8223C25.2472 23.3176 26.6846 22.2284 27.6232 20.753C28.5619 19.2775 28.9394 17.514 28.6869 15.7837C28.4345 14.0533 27.569 12.4711 26.2479 11.3253C24.9269 10.1795 23.2383 9.5463 21.4896 9.54102C19.8039 9.54089 18.1701 10.1247 16.8662 11.1931C15.5623 12.2615 14.6688 13.7486 14.3375 15.4014L18.425 16.2202C18.541 15.6398 18.8194 15.1044 19.2278 14.6761C19.6363 14.2477 20.1579 13.9442 20.7321 13.8008C21.3063 13.6574 21.9094 13.68 22.4713 13.866C23.0332 14.0519 23.5306 14.3936 23.9059 14.8512C24.2812 15.3089 24.5187 15.8637 24.591 16.4511C24.6633 17.0385 24.5672 17.6344 24.3141 18.1693C24.061 18.7043 23.6611 19.1564 23.1611 19.473C22.6611 19.7896 22.0814 19.9576 21.4896 19.9577C20.937 19.9577 20.4071 20.1772 20.0164 20.5679C19.6257 20.9586 19.4063 21.4885 19.4063 22.041V25.166H23.5729V23.8223Z" fill="#2D3482" />
                          </svg> */}
                        </center>
                      </div>
                    </div>
                  </form>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
      <br />
      <center><h1 className='heading_one'>How to Book Your Seat ?</h1></center>
      <div>
        <div class='container'>
          <div class='card_con'>
            <center>
              <div class='row'>
                <div class='col-lg-6'>
                  <h5>Step 1</h5><br />
                  <div class='card_box'>
                    <div class='card-body'>
                      <div>
                        <svg width="83" height="81" viewBox="0 0 83 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M73.7501 53.6068V76.907C73.749 77.9707 73.3213 78.9905 72.561 79.7423C71.8007 80.4941 70.77 80.9164 69.6953 80.9164H4.30485C3.76862 80.9126 3.23837 80.8044 2.74439 80.5979C2.2504 80.3913 1.80236 80.0905 1.42584 79.7126C1.04932 79.3347 0.751695 78.887 0.549961 78.3952C0.348226 77.9035 0.246334 77.3772 0.250101 76.8464V28.3747H24.7501C25.8331 28.3747 26.8717 27.9489 27.6374 27.1909C28.4032 26.4329 28.8334 25.4049 28.8334 24.333V0.0830078H69.6749C71.9248 0.0830078 73.7501 1.92197 73.7501 4.09234V19.3092L37.0042 55.6842L36.9797 72.8128L54.3175 72.8371L73.7501 53.6068ZM76.9269 27.5987L82.7008 33.3136L50.9406 64.7497L45.1586 64.7416L45.1668 59.0348L76.9269 27.5987ZM0.250101 20.2913L20.6668 0.0951329V20.2913H0.250101Z" fill="white" />
                        </svg>
                      </div>
                      <div>
                        <h5 class='card_heading'>Enter your name, mobile no, email id, city and state</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div class='col-lg-6'>
                  <h5>Step 2</h5><br />
                  <div class='card_box'>
                    <div class='card-body'>
                      <div>
                        <svg width="81" height="90" viewBox="0 0 81 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="16.0391" y="55.5342" width="41.7041" height="4.01001" fill="white" />
                          <path d="M61.734 56.3359C53.3229 56.3359 46.5117 63.1624 46.5117 71.5735C46.5117 79.9846 53.3229 86.811 61.734 86.811C70.1604 86.811 76.9868 79.9846 76.9868 71.5735C76.9868 63.1624 70.1604 56.3359 61.734 56.3359ZM61.7493 83.7635C55.0143 83.7635 49.5592 78.3085 49.5592 71.5735C49.5592 64.8385 55.0143 59.3834 61.7493 59.3834C68.4843 59.3834 73.9393 64.8385 73.9393 71.5735C73.9393 78.3085 68.4843 83.7635 61.7493 83.7635Z" fill="white" />
                          <path d="M62.5122 63.9551H60.2266V73.0976L68.2263 77.8974L69.3691 76.0232L62.5122 71.9548V63.9551Z" fill="white" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M62.7166 8.36091H66.4058C70.4639 8.36091 73.7842 11.6746 73.7842 15.7247V58.6666C71.7239 56.7456 69.2032 55.312 66.4058 54.5495V26.7705H7.37842V74.6355H44.3751C44.8508 77.3551 45.9494 79.8605 47.5183 81.9993H7.37842C3.32029 81.9993 0 78.6856 0 74.6355V15.7247C0 11.6746 3.32029 8.36091 7.37842 8.36091H11.0676V0.99707H18.4461V8.36091H55.3382V0.99707H62.7166V8.36091Z" fill="white" />
                          <rect x="16.0391" y="34.6816" width="41.7041" height="4.01001" fill="white" />
                          <rect x="16.0391" y="45.1074" width="41.7041" height="4.01001" fill="white" />
                        </svg>
                      </div>
                      <div>
                        <h5 class='card_heading'>Enter your preferred date and time for the slot.</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div><br /><br />
              <div class='row'>
                <div class='col-lg-6'>
                  <h5>Step 3</h5><br />
                  <div class='card_box'>
                    <div class='card-body'>
                      <div>
                        <svg width="109" height="109" viewBox="0 0 109 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M53.1816 81.7042C38.7391 81.023 27.2487 69.1238 27.2487 54.4997C27.2487 39.4668 39.4658 27.2497 54.4987 27.2497C69.1229 27.2497 81.022 38.7401 81.7033 53.1826L72.1658 50.3213C70.3037 42.2826 63.0824 36.333 54.4987 36.333C44.4616 36.333 36.332 44.4626 36.332 54.4997C36.332 63.0834 42.2816 70.3047 50.3204 72.1668L53.1816 81.7042ZM99.9154 54.4997C99.9154 55.8622 99.8699 57.2247 99.7337 58.5872L90.7866 55.9076C90.832 55.4534 90.832 54.9538 90.832 54.4997C90.832 34.4255 74.5729 18.1663 54.4987 18.1663C34.4245 18.1663 18.1654 34.4255 18.1654 54.4997C18.1654 74.5738 34.4245 90.833 54.4987 90.833C54.9529 90.833 55.4524 90.833 55.9066 90.7876L58.5862 99.7347C57.2237 99.8709 55.8612 99.9163 54.4987 99.9163C29.4287 99.9163 9.08203 79.5697 9.08203 54.4997C9.08203 29.4297 29.4287 9.08301 54.4987 9.08301C79.5687 9.08301 99.9154 29.4297 99.9154 54.4997ZM82.7933 73.8472L99.9154 68.1247L54.4987 54.4997L68.1237 99.9163L73.8462 82.7942L93.2391 102.187L102.232 93.1947L82.7933 73.8472Z" fill="white" />
                        </svg>
                      </div>
                      <div>
                        <h5 class='card_heading'>Click on
                          Pay Now</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div class='col-lg-6'>
                  <h5>Step 4</h5><br />
                  <div class='card_box'>
                    <div class='card-body'>
                      <div>
                        <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M90 18H18C13.005 18 9.045 22.005 9.045 27L9 81C9 85.995 13.005 90 18 90H90C94.995 90 99 85.995 99 81V27C99 22.005 94.995 18 90 18ZM90 81H18V54H90V81ZM90 36H18V27H90V36Z" fill="white" />
                        </svg>
                      </div>
                      <div>
                        <h5 class='card_heading'>Complete your payment
                          process on the payment
                          portal</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
      <div class='container_last'>
        <center><h2>CONTACT US</h2></center>
        <div class='add_con'>
          <div class='row'>
            <div class='col-lg-4'>
              <p>
                <svg width="15" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.9247 17.6776L10.5 25L3.07534 17.6776C1.6069 16.2294 0.606884 14.3843 0.20175 12.3755C-0.203384 10.3668 0.00455798 8.28468 0.799282 6.39249C1.59401 4.50031 2.93982 2.88303 4.66653 1.74518C6.39324 0.607327 8.4233 0 10.5 0C12.5767 0 14.6068 0.607327 16.3335 1.74518C18.0602 2.88303 19.406 4.50031 20.2007 6.39249C20.9954 8.28468 21.2034 10.3668 20.7983 12.3755C20.3931 14.3843 19.3931 16.2294 17.9247 17.6776ZM10.5 14.9576C11.7377 14.9576 12.9247 14.4727 13.7998 13.6096C14.675 12.7465 15.1667 11.5759 15.1667 10.3552C15.1667 9.13462 14.675 7.96399 13.7998 7.10088C12.9247 6.23777 11.7377 5.75288 10.5 5.75288C9.26232 5.75288 8.07534 6.23777 7.20017 7.10088C6.325 7.96399 5.83334 9.13462 5.83334 10.3552C5.83334 11.5759 6.325 12.7465 7.20017 13.6096C8.07534 14.4727 9.26232 14.9576 10.5 14.9576ZM10.5 12.6564C9.88116 12.6564 9.28767 12.414 8.85009 11.9824C8.4125 11.5509 8.16667 10.9656 8.16667 10.3552C8.16667 9.74494 8.4125 9.15962 8.85009 8.72806C9.28767 8.29651 9.88116 8.05406 10.5 8.05406C11.1188 8.05406 11.7123 8.29651 12.1499 8.72806C12.5875 9.15962 12.8333 9.74494 12.8333 10.3552C12.8333 10.9656 12.5875 11.5509 12.1499 11.9824C11.7123 12.414 11.1188 12.6564 10.5 12.6564Z" fill="white" />
                </svg>
                <span style={{ marginLeft: '10px', width: '50%' }}>
                  <span style={{ fontWeight: 'bold' }}>AGRA : </span> 1st Floor, D-23, Nirbhay Nagar, <br />
                  <span style={{ marginLeft: '20px' }}>Near Hotel Akash Inn, Agra (UP) 282007</span>
                </span>
              </p>
            </div>
            <div class='col-lg-4'>
              <p>
                <svg width="15" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.9247 17.6776L10.5 25L3.07534 17.6776C1.6069 16.2294 0.606884 14.3843 0.20175 12.3755C-0.203384 10.3668 0.00455798 8.28468 0.799282 6.39249C1.59401 4.50031 2.93982 2.88303 4.66653 1.74518C6.39324 0.607327 8.4233 0 10.5 0C12.5767 0 14.6068 0.607327 16.3335 1.74518C18.0602 2.88303 19.406 4.50031 20.2007 6.39249C20.9954 8.28468 21.2034 10.3668 20.7983 12.3755C20.3931 14.3843 19.3931 16.2294 17.9247 17.6776ZM10.5 14.9576C11.7377 14.9576 12.9247 14.4727 13.7998 13.6096C14.675 12.7465 15.1667 11.5759 15.1667 10.3552C15.1667 9.13462 14.675 7.96399 13.7998 7.10088C12.9247 6.23777 11.7377 5.75288 10.5 5.75288C9.26232 5.75288 8.07534 6.23777 7.20017 7.10088C6.325 7.96399 5.83334 9.13462 5.83334 10.3552C5.83334 11.5759 6.325 12.7465 7.20017 13.6096C8.07534 14.4727 9.26232 14.9576 10.5 14.9576ZM10.5 12.6564C9.88116 12.6564 9.28767 12.414 8.85009 11.9824C8.4125 11.5509 8.16667 10.9656 8.16667 10.3552C8.16667 9.74494 8.4125 9.15962 8.85009 8.72806C9.28767 8.29651 9.88116 8.05406 10.5 8.05406C11.1188 8.05406 11.7123 8.29651 12.1499 8.72806C12.5875 9.15962 12.8333 9.74494 12.8333 10.3552C12.8333 10.9656 12.5875 11.5509 12.1499 11.9824C11.7123 12.414 11.1188 12.6564 10.5 12.6564Z" fill="white" />
                </svg>
                <span style={{ marginLeft: '10px', width: '50%' }}>
                  <span style={{ fontWeight: 'bold' }}>INDRAPURAM : </span>3rd Floor, SPS Residency, 18B, <br />
                  <span style={{ marginLeft: '20px' }}>Vaibhav Khand, Indirapuram, U.P – 201014</span>
                </span>
              </p>
            </div>
            <div class='col-lg-4'>
              <p>
                <svg width="15" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.9247 17.6776L10.5 25L3.07534 17.6776C1.6069 16.2294 0.606884 14.3843 0.20175 12.3755C-0.203384 10.3668 0.00455798 8.28468 0.799282 6.39249C1.59401 4.50031 2.93982 2.88303 4.66653 1.74518C6.39324 0.607327 8.4233 0 10.5 0C12.5767 0 14.6068 0.607327 16.3335 1.74518C18.0602 2.88303 19.406 4.50031 20.2007 6.39249C20.9954 8.28468 21.2034 10.3668 20.7983 12.3755C20.3931 14.3843 19.3931 16.2294 17.9247 17.6776ZM10.5 14.9576C11.7377 14.9576 12.9247 14.4727 13.7998 13.6096C14.675 12.7465 15.1667 11.5759 15.1667 10.3552C15.1667 9.13462 14.675 7.96399 13.7998 7.10088C12.9247 6.23777 11.7377 5.75288 10.5 5.75288C9.26232 5.75288 8.07534 6.23777 7.20017 7.10088C6.325 7.96399 5.83334 9.13462 5.83334 10.3552C5.83334 11.5759 6.325 12.7465 7.20017 13.6096C8.07534 14.4727 9.26232 14.9576 10.5 14.9576ZM10.5 12.6564C9.88116 12.6564 9.28767 12.414 8.85009 11.9824C8.4125 11.5509 8.16667 10.9656 8.16667 10.3552C8.16667 9.74494 8.4125 9.15962 8.85009 8.72806C9.28767 8.29651 9.88116 8.05406 10.5 8.05406C11.1188 8.05406 11.7123 8.29651 12.1499 8.72806C12.5875 9.15962 12.8333 9.74494 12.8333 10.3552C12.8333 10.9656 12.5875 11.5509 12.1499 11.9824C11.7123 12.414 11.1188 12.6564 10.5 12.6564Z" fill="white" />
                </svg>
                <span style={{ marginLeft: '10px', width: '50%' }}>
                  <span style={{ fontWeight: 'bold' }}>FARIDABAD : </span>SCO No. 88, 1st Floor,<br />
                  <span style={{ marginLeft: '20px' }}>Sector 16, Faridabad, Haryana – 121002</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
