import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import '../pages/About.css'

const About = () => {
  const [data, setData] = useState({
    "AC Voltage (RMS) (Vac)": '00.00',
    Vdc: '00.00',
    Iac: '00.00',
    Idc: '00.00',
    Wdc: '00.00',
    Wac: '00.00',
    Netdc: '00.00',
    Imdc: '00.00',
    Expdc: '00.00',
    Appac: '00.00',
    Factac: '00.00',
    Netac: '00.00',
    Imac: '00.00',
    Expac: '00.00',
    Fac: '00.00',
  });

  useEffect(() => {
    if (!firebase.apps.length) {
      const firebaseConfig = {
      apiKey: "AIzaSyDD7gx6O7OcVsMIUjGGhmPFTwq01yOurDE",
      authDomain: "giamsatdiennang-d7210.firebaseapp.com",
      databaseURL: "https://giamsatdiennang-d7210-default-rtdb.firebaseio.com",
      projectId: "giamsatdiennang-d7210",
      storageBucket: "giamsatdiennang-d7210.appspot.com",
      messagingSenderId: "183117916306",
      appId: "1:183117916306:web:fcf3f901e58515ade35e4b",
      measurementId: "G-9Q933YM3S5"
    };
    firebase.initializeApp(firebaseConfig);
  }

    const database = firebase.database();

    const updateData = (key) => (snapshot) => {
      const value = snapshot.val();
      setData((prevData) => ({ ...prevData, [key]: value }));
      updateDateTime(key);
    };

    // Lắng nghe sự thay đổi dữ liệu từ Firebase
    const subscribeToFirebase = (key) => {
      database.ref(`/${key}`).on('value', updateData(key));
    };

    // Cập nhật ngày và giờ hiện tại
    const getCurrentDateTime = () => {
      const currentDateTime = new Date();
      const date = currentDateTime.toLocaleDateString('en-US');
      const time = currentDateTime.toLocaleTimeString('en-US');
      return { date, time };
    };

    // Cập nhật giá trị ngày và giờ cho thông số
    const updateDateTime = (key) => {
      const dateTime = getCurrentDateTime();
      const dateId = `${key.toLowerCase()}-date`;
      const timeId = `${key.toLowerCase()}-time`;

      document.getElementById(dateId).textContent = dateTime.date;
      document.getElementById(timeId).textContent = dateTime.time;
    };

    // Đăng ký lắng nghe dữ liệu từ Firebase
    subscribeToFirebase('AC Voltage (RMS) (Vac)');
    subscribeToFirebase('Vdc');
    subscribeToFirebase('Iac');
    subscribeToFirebase('Idc');
    subscribeToFirebase('Wdc');
    subscribeToFirebase('Wac');
    subscribeToFirebase('Netdc');
    subscribeToFirebase('Imdc');
    subscribeToFirebase('Expdc');
    subscribeToFirebase('Appac');
    subscribeToFirebase('Factac');
    subscribeToFirebase('Netac');
    subscribeToFirebase('Imac');
    subscribeToFirebase('Expac');
    subscribeToFirebase('Fac');

    return () => {
      // Hủy đăng ký lắng nghe khi component unmount
      database.ref('/').off();
    };
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Thông số</th>
            <th>Giá trị</th>
            <th>Ngày</th>
            <th>Giờ</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <span id={`final${key}`}>{value}</span>
              </td>
              <td>
                <span id={`${key.toLowerCase()}-date`}>00/00/0000</span>
              </td>
              <td>
                <span id={`${key.toLowerCase()}-time`}>00:00:00</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default About;
