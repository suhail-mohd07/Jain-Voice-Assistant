"use client"
import React, { useEffect, useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { CiUser } from 'react-icons/ci';
import { FaRegUserCircle } from 'react-icons/fa';

interface UserData {
    name: string;
    usn: string;
    class: string;
    password: string
}

let SpeechRecognition: any;
var day = new Date();
var hr = day.getHours();
var mi = day.getMinutes();
let ap = "AM"


if (typeof window !== 'undefined') {
    if ('SpeechRecognition' in window) {
        SpeechRecognition = window.SpeechRecognition;
    } else if ('webkitSpeechRecognition' in window) {
        SpeechRecognition = window.webkitSpeechRecognition;
    } else {
        console.error('SpeechRecognition is not supported in this browser.');
    }
}

const btn = document.querySelector('#talk');

if (btn) {
    btn.addEventListener('click', () => {
        recognition.start();
    });
} else {
    console.error('Element with id "talk" not found.');
}

const recognition = new SpeechRecognition();

function Hero() {
    const [popUp, setPopUp] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    const userDataString = localStorage.getItem('user');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;

    console.log(userData)

    useEffect(() => {
        if (!userData) {
            window.location.href = 'http://localhost:3000/';
            
        }
    }, [])

    function readOut(message: any) {
        const speech = new SpeechSynthesisUtterance;
        const allVoices = speechSynthesis.getVoices();
        // speech.voice = allVoices[8];
        speech.text = message;
        speech.volume = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);

    }

    function wishme(): string {
        var day = new Date();
        var hr = day.getHours();

        if (hr >= 0 && hr < 12) {
            readOut("Good Morning");
            return "Good morning"
        }
        else if (hr >= 12 && hr <= 17) {
            readOut("Good Afternoon");
            return "Good Afternoon"
        }
        else {
            readOut("Good Evening");
            return "Good Evening"
        }
    }

    useEffect(() => {
        recognition.onstart = function () {
            console.log('activated');
        };

        recognition.onresult = function (event: any) {
            const current = event.resultIndex;
            const newTranscript = event.results[current][0].transcript.toLowerCase();
            setTranscript(newTranscript);
            console.log(newTranscript);

            handleTranscriptLogic(newTranscript);
        };

        recognition.onend = function () {
            console.log('deactivated');
            setIsListening(false);
        };
    }, []);

    const handleButtonClick = () => {
        setIsListening(true);
        setTranscript('');
        recognition.start();

    };


    const handleTranscriptLogic = (newTranscript: string) => {

        if (newTranscript.includes('hello') || newTranscript.includes('hi') || newTranscript.includes('hey')) {
            readOut("hello there , i am jain university's voice assistant , how may i assist you");
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Hello there, I am Jain University's voice assistant, how may I assist you";
            } else {
                console.error('Element with id "answer" not found.');
            }

        } else if (newTranscript.includes('good morning') || newTranscript.includes('good afternoon') || newTranscript.includes('good evening')) {
            
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = wishme();
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('how are you')) {
            readOut('i am fine, how are you doing');
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "i am fine, how are you doing"
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('what is your name') || newTranscript.includes("what's your name")) {
            readOut('i dont have any name as  i am an a i of jain university, my job is to assist the students and faculties of jain university');
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "i dont have any name as  i am an a i of jain university, my job is to assist the students and faculties of jain university"
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('open youtube')) {
            readOut('opening youtube');
            window.open("https://www.youtube.com/");
            // window.location.href = 'https://www.youtube.com/'
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "opening youtube"
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('time')) {
            console.log("nothing");
            if (hr > 12) {
                hr = hr - 12;
                ap = "PM";
            }
            readOut("the time is");
            readOut(hr);
            readOut(mi);
            readOut(ap);
            console.log(hr + ':' + mi + ' ' + ap);
            // document.querySelector('#answer').textContent=hr+':'+mi+' '+ap;
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = hr + ':' + mi + ' ' + ap;
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('open google')) {
            readOut('opening google');
            window.open("https://www.google.com/");
            // window.location.href = 'https://www.youtube.com/'
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "opening google"
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('weather') || newTranscript.includes("what is the weather")) {
            readOut('here is the weather of bengaluru');
            window.open("https://www.bing.com/search?q=current+weather&qs=n&form=QBRE&sp=-1&lq=0&pq=current+weather&sc=21-15&sk=&cvid=CC247B7DD80A4AB3B2E46754F6D75F7F&ghsh=0&ghacc=0&ghpl=");
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Weather of Bengaluru"
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('hod') || newTranscript.includes("hod of bca")) {
            readOut('doctor suneetha k');
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Dr. Suneetha K"
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('pcl guide')) {
            readOut('doctor m s nidhya');
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Dr. MS Nidhya"
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('play some music in youtube') || newTranscript.includes("play some music on youtube") || newTranscript.includes("music on youtube") || newTranscript.includes("music")) {
            readOut('Playing Starboy');
            window.open("https://www.youtube.com/watch?v=34Na4j8AVgA");
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Okay"
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('open jain university website') || newTranscript.includes("open chain university website") || newTranscript.includes("open jnu university website") || newTranscript.includes("open jain universities website")) {
            readOut("opening jain university's website");
            window.open("https://www.jainuniversity.ac.in/");            
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Opening Jain University's Website"
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('pcl coordinator') || newTranscript.includes("pcl co ordinator")) {
            readOut('doctor ananta ojha');
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Dr. Anantha Ojha"
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('location') || newTranscript.includes("location of or college")) {
            readOut("here's the location for jain university, jayanagar");
            window.open("https://goo.gl/maps/c122V6RecoMr1tcm6");
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Here's the location for jain university, jayanagar"
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('21 bcar 0045') || newTranscript.includes("21bcar0045") || newTranscript.includes("21 bca are 0045") || newTranscript.includes("0045") || newTranscript.includes("21 bca or 0045")  ) {
            readOut('this is the u s n number of mohammed suhail');
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Mohammed suhail"
            } else {
                console.error('Element with id "answer" not found.');
            }
            
        }
        else if (newTranscript.includes('21 bcar 0166') || newTranscript.includes("21bcar0166") || newTranscript.includes("21 bca are 0166") || newTranscript.includes("0166") || newTranscript.includes("21 bca or 0166")  ) {
            readOut('this is the u s n number of murali mohan reddy');
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Murali Mohan Reddy"
            } else {
                console.error('Element with id "answer" not found.');
            }
            
        }
        else if (newTranscript.includes('21 bcar 0164') || newTranscript.includes("21bcar0164") || newTranscript.includes("21 bca are 0164") || newTranscript.includes("0164") || newTranscript.includes("21 bca or 0164")  ) {
            readOut('this is the u s n number of monish');
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Monish"
            } else {
                console.error('Element with id "answer" not found.');
            }
            
        }
        else if (newTranscript.includes('21 bcar 0076') || newTranscript.includes("21bcar0076") || newTranscript.includes("21 bca are 0076") || newTranscript.includes("0076") || newTranscript.includes("21 bca or 0076")  ) {
            readOut('this is the u s n number of shahabarsha');
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Shahabarsha"
            } else {
                console.error('Element with id "answer" not found.');
            }
            
        }
        else if (newTranscript.includes('class teacher of sixth sem a section') || newTranscript.includes("section a") || newTranscript.includes("6th sem section a") || newTranscript.includes("general a") || newTranscript.includes("a section")) {
            readOut('doctor ramkumar krishnamoorthy');
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Dr.Ramkumar Krishnamoorthy"
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('class teacher of sixth sem b section') || newTranscript.includes("section b") || newTranscript.includes("6th sem section b") || newTranscript.includes("general b") || newTranscript.includes("b section")) {
            readOut('karthikeyan m p');
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Mr. Karthikeyan M P"
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('class teacher of sixth sem d section') || newTranscript.includes("section d") || newTranscript.includes("6th sem section d") || newTranscript.includes("class teacher of 6th sem m a c t") || newTranscript.includes("m a c t") || newTranscript.includes("mact") || newTranscript.includes(" class teahcer of mact")|| newTranscript.includes("d section")) {
            readOut('doctor taskeen zaidi');
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Mr. Taskeen Zaidi"
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('who is our class teacher') || newTranscript.includes("class teacher")) {
            readOut('please specify which class');
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = "Please specify which class"
            } else {
                console.error('Element with id "answer" not found.');
            }
        }
        else if (newTranscript.includes('search for')) {
            const match = newTranscript.match(/search for (.+)$/i);
        
            if (match && match[1]) {
                const searchQuery = encodeURIComponent(match[1].trim());
        
                readOut(`Here's the result for ${match[1]}`);
                window.open(`https://www.google.com/search?q=${searchQuery}`);
            }
        }
        else if (newTranscript.includes('logout') || newTranscript.includes('log out') || newTranscript.includes("shut down")) {
            readOut('Okay, have a nice day');
            const answerElement = document.querySelector('#answer');
                if (answerElement) {
                    answerElement.textContent = 'Okay, have a nice day';
                } else {
                    console.error('Element with id "answer" not found.');
                }
        
            setTimeout(() => {
                window.location.href = 'http://localhost:3000/';
            }, 3000); // 3000 milliseconds (3 seconds) delay
        }
        else{
            readOut('i did not understand the question, please try again');
            const answerElement = document.querySelector('#answer');
            if (answerElement) {
                answerElement.textContent = 'I did not understand the question, please try again';
            } else {
                console.error('Element with id "answer" not found.');
            }    
        }
        

        
    };

    return (
        <div className='w-full h-full'>
            <video className='w-full h-full rotate-180 absolute top-[-400px] z-[-1] object-cover' autoPlay muted loop src="./videos/blackhole.webm"></video>
            <div className='w-full h-[80px] flex items-center pl-5'>
                <img src="./images/logo.png" className='w-[200px] bg-white bg-auto h-[60px]' alt="" />
                <h1 className='text-white text-[20px] absolute right-24'>{userData?.name}</h1>
                <div onClick={() => popUp ? setPopUp(false) : setPopUp(true)} className='w-[40px] h-[40px] z-[999] border cursor-pointer absolute right-0 mr-10 rounded-full flex justify-center items-center text-white text-3xl'><CiUser /></div>
                {
                    popUp
                    &&
                    <div className='w-[250px] h-[200px] border rounded-2xl bg-black absolute text-white flex flex-col items-center py-5 z-[10] right-1 top-[5rem]'>
                        <div className='text-[30px]'><FaRegUserCircle /></div>
                        <h1 className='text-white text-[20px]'>{userData?.name}</h1>
                        <h1 className='text-white text-[18px]'>{userData?.usn}</h1>
                        <h1 className='text-white text-[18px]'>{userData?.class}</h1>
                    </div>
                }
            </div>
            <div className='w-full h-[60%] absolute bottom-16 flex flex-col items-center py-20'>
                <button
                    id='talk'
                    className='w-[250px] z-[999] h-[50px] border border-blue-800 rounded-xl bg-blue-950 flex justify-center text-[20px] items-center text-white font-bold gap-2'
                    onClick={handleButtonClick}
                    disabled={isListening}
                >
                    <FaMicrophone /> Tap to Speak
                </button>
                <h1 className='text-white mt-10 w-auto font-bold text-4xl font-serif' id='query'>{transcript}</h1>
                <h1 className='text-white mt-10 w-auto font-bold text-4xl font-serif' id='answer'></h1>
            </div>
        </div>
    );
}

export default Hero;

