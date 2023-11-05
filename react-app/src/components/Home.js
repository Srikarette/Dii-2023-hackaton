import React, { useState, useEffect } from "react";
import AppsQr from "../assets/Download-Apps-qr.png";
import Genocide from "../assets/Genocide.jpg"
import "../components/Home.css";

function Home() {
  const slides = [
    { id: 1, text: "Slide 1" },
    { id: 2, text: "Slide 2" },
    { id: 3, text: "Slide 3" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleRadioChange = (e) => {
    setCurrentSlide(parseInt(e.target.value));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="h-screen flex flex-col">
      <div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-5/6 h-4/6 mb-64 border border-black p-4 relative duration-500">
          {/* Right part for the slideshow and resume text */}
          <div className="slide-container">
            <SlideShow slides={slides} currentSlide={currentSlide} />
          </div>
          <SlideSelector
            slides={slides}
            currentSlide={currentSlide}
            onChange={handleRadioChange}
          />
          {/* Add your resume text here */}
        </div>
      </div>
      <div className="bg-gray-900 text-white py-2 text-center">
        <div className="px-4 mt-2"> {/* Move address to the bottom */}
          <span>Alert Town since 2023</span>
        </div>
      </div>
    </div>
  );
}

function SlideShow({ slides, currentSlide }) {
    return (
      <div className="w-100 h-100 relative p-4 duration-500">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${
              currentSlide === index ? "block" : "hidden"
            } transition-opacity duration-500 text-center`}
          >
            {slide.id === 1 ? (
              <div className="h-full justify-center items-center ">
                <div className="h-64 text-center border border-black">
                  <h2 className="whitespace-nowrap mt-6">Background and Significance of the Study</h2>
                  <p className="m-8 text-lg">
                    In today's rapidly changing world, the need for effective and efficient emergency alert systems is paramount. Timely and accurate information dissemination during emergencies can save lives and minimize property damage. This project proposal will build on an emergency notification system to ensure that it meets current technological standards and can respond effectively to emergency situations.
                  </p>
                </div>
                <div className="h-58 text-center mt-2 border border-black">
                  <h2 className="whitespace-nowrap mt-2">Project Objectives</h2>
                  <ul className="text-left m-4 text-lg">
                    <li>1) Create emergency notification systems to ensure they are compatible with the latest technology.</li>
                    <li>2) Build the scalability and reliability of the system to support increased volumes of emergency alerts.</li>
                    <li>3) Create the user interface and user experience for both the sender and recipient of the notification.</li>
                    <li>4) Expand the types of emergencies the system can cover, such as natural disasters and public health crises, and report crimes.</li>
                  </ul>
                </div>
              </div>
            ) : slide.id === 2 ? (
                <div className="w-100 h-96 justify-center items-center">
                <h1>OUR APPLICATION</h1>
                <div className="inline-block mx-4 text-center">
                  <img
                    src={AppsQr}
                    alt="QR Code Left"
                    className="w-96 h-96"
                  />
                </div>
                <div className="inline-block mx-4 text-center">
                  <img
                    src={AppsQr}
                    alt="QR Code Right"
                    className="w-96 h-96"
                  />
                </div>
                <div className="inline-block mx-4 text-center">
                  <img
                    src={AppsQr}
                    alt="QR Code Right"
                    className="w-96 h-96"
                  />
                </div>
              </div>
            ) : slide.id === 3 ? (
              <div className="w-100 h-96 justify-center items-center">
                <h1>JOIN US</h1>
                <div className="inline-block mx-4 text-center">
                  <img
                    src={AppsQr}
                    alt="QR Code Left"
                    className="w-96 h-96"
                  />
                  <p className="mt-1">Download Apps</p>
                  <p className="text-sm">
                    (Currently for <span className="text-green-500">Android only</span>)
                  </p>
                </div>
                <div className="inline-block mx-4 text-center">
                  <img
                    src={AppsQr}
                    alt="QR Code Right"
                    className="w-96 h-96"
                  />
                  <p className="mt-1">
                    <span className="text-green-500">Line</span> Add
                  </p>
                  <p className="text-sm">For everyone!</p>
                </div>
              </div>
            ) : (
              <h2>{slide.text}</h2>
            )}
          </div>
        ))}
      </div>
    );
  }
  
function SlideSelector({ slides, currentSlide, onChange }) {
  return (
    <div className="absolute bottom-1 left-0 right-0 text-center mt-2">
      {slides.map((slide, index) => (
        <label
          key={slide.id}
          className={`inline cursor-pointer ${
            currentSlide === index ? "text-black-500" : "text-gray-500"
          }`}
        >
          <input
            type="radio"
            value={index}
            checked={currentSlide === index}
            onChange={onChange}
            className="sr-only"
          />
          <div className="inline-block mt-2 p-2 bg-red-300 rounded-full border-black duration-500">
            {index === currentSlide && (
              <div className="w-4 h-4 bg-black  rounded-full "></div>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

export default Home;
