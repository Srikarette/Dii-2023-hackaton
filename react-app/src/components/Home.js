import React from "react";
import DecorScreen1 from "../assets/screen1.png";
import DecorScreen2 from "../assets/screen2.png";
import DecorScreen3 from "../assets/screen3.png";
import AppsQr from "../assets/Download-Apps-qr.png";
import LineQr from "../assets/Line-add-friend.png";
import "./Home.css";

// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/bundle";

const Home = () => {
  return (
    <>
      <div className="container mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          autoplay={{}}
        >
          <SwiperSlide>
            <div className="text-center mt-24">
              <h2 className="text-3xl md:text-4xl lg:text-5xl">
                Background and Significance of the Study
              </h2>
              <p className="m-8 text-lg 11/12">
                In today's rapidly changing world, the need for effective and
                efficient emergency alert systems is paramount. Timely and
                accurate information dissemination during emergencies can save
                lives and minimize property damage. This project proposal will
                build on an emergency notification system to ensure that it
                meets current technological standards and can respond
                effectively to emergency situations.
              </p>
            </div>
            <div className="text-center p-12">
              <h2 className="whitespace-nowrap mt-2">Project Objectives</h2>
              <ul className="text-left m-4 text-lg pl-32">
                <li>
                  1) Create emergency notification systems to ensure they are
                  compatible with the latest technology.
                </li>
                <li>
                  2) Build the scalability and reliability of the system to
                  support increased volumes of emergency alerts.
                </li>
                <li>
                  3) Create the user interface and user experience for both the
                  sender and recipient of the notification.
                </li>
                <li>
                  4) Expand the types of emergencies the system can cover, such
                  as natural disasters and public health crises, and report
                  crimes.
                </li>
              </ul>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center">
              <h1 className="text-3xl mt-8">Welcome to Our Application</h1>
              <div className="grid grid-cols-3 gap-4">
                <img src={DecorScreen1} alt="Screen 1" className="rounded-lg" />
                <img src={DecorScreen2} alt="Screen 2" className="rounded-lg" />
                <img src={DecorScreen3} alt="Screen 3" className="rounded-lg" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center p-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl">
                Download Our App
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <img
                    src={AppsQr}
                    alt="Download Apps QR"
                    className="w-full h-4/6"
                  />
                  <p>Scan the QR code to download our app</p>
                </div>
                <div>
                  <img
                    src={LineQr}
                    alt="Line Add Friend QR"
                    className="w-full h-4/6"
                  />
                  <p>Add us on Line with this QR code</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* Add more slides as needed */}
        </Swiper>
      </div>
      {/* */}

      <div className="mt-4">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <div className="bg-gray-900 text-white py-2 text-center tracking-wider w-full fixed bottom-0">
        {/* Move address to the bottom */}
        <h5 className="text-sm md:text-base lg:text-lg">
          Alert Town since 2023
        </h5>
      </div>
    </>
  );
};

export default Home;
