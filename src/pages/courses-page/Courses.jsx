import React, { useState, useEffect } from "react";
import "./Courses.scss";
import CourseInformation from "../../component/course-information/CourseInformation"
import CourseSelector from "../../component/course-selector/CourseSelector";
import CourseCalender from "../../component/course-calender/CourseCalender";
// import WeekBar from "../../component/week-bar/WeekBar"


function Courses() {

  const [allCourses, setAllCourses] = useState([])
  const [choose, setChoose] = useState([])
  const [newCourses, setNewCourses] = useState([])
  const [newCategory, setNewCategory] = useState([])
  const [coaches, setCoaches] = useState([])
  //原本資料庫的bookingData
  const [bookingData, setBookingData] = useState('');
  // const [week, setWeek] = useState('')
  // console.log('app.js',newCourses)


  async function getCoursesData() {
    // 開啟載入指
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request("http://localhost:5000/api/courses/data", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    setAllCourses(data)
  }
  async function getCoachesData() {
    const request = new Request('http://localhost:5000/api/employee', {
      method: 'GET',
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request)
    const data = await response.json()

    setCoaches(data);
  }


  async function getCategoryData() {
    // 開啟載入指示
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request("http://localhost:5000/api/category", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    // console.log(data)
    // 設定資料
    setChoose(data);
  }
  //Fetch 預約資料

  async function getBookingData() {
    const request = new Request("http://localhost:5000/api/courses/bookingData", {
      method: 'GET',
      body: JSON.stringify(),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    setBookingData(data)

  }
  const handleChange = (e) => {

    const oop = e.target.value
    const renewCourses = allCourses.coursesRow && allCourses.coursesRow.filter(course => (course.courseCategoryName === oop))

    setNewCourses(renewCourses)
    setNewCategory(oop)

    // console.log('aa',{ ...choose })
    if (!allCourses.coursesRow) {
      const aa = { ...choose }
      setChoose(aa)
    }
  }

  const startFetch = async()=>{
    await getCoursesData()
    await getCoachesData()
    await getCategoryData()
    await getBookingData()
  }

  useEffect(() => {
    console.log("fire")
    startFetch()

    handleChange({ target: { value: '有氧教室' } })

    if (!localStorage.getItem("courses")) localStorage.setItem('courses', JSON.stringify(allCourses))

  }, [])

  useEffect(() => {
    handleChange({ target: { value: '有氧教室' } })
  }, [choose])

  // const changeWeek = (e) => {
  //   const whichWeek = e.target.value
  //   // console.log(whichWeek)
  //   const Week = whichWeek.split("-")
  //   const aWeek = parseInt(Week[0].split("/")[1])
  //   const zWeek = parseInt(Week[1].split("/")[1])
  //   console.log(aWeek, zWeek)
  //   // console.log(allCourses)
  //   //所有課程的日期

  //   const c = allCourses && allCourses.coursesRow.map(item=>parseInt(item.courseTime.split(" ")[2]))
  //   console.log(c)

  //   const d = c && c.filter(item=> aWeek<=item)
  //   const f = c && c.filter(item => item<=zWeek) 

  // }

  return (
    <>
      <div>
        <div className="courseBanner"></div>
        <div className="courseBannerCover">
          <h1>課程資訊 Class information</h1>
        </div>
        <div className="container">
          <CourseInformation
            choose={choose}
            newCourses={newCourses}
            newCategory={newCategory}
          />
          <CourseSelector
            choose={choose}
            setChoose={setChoose}
            allCourses={allCourses}
            setAllCourses={setAllCourses}
            handleChange={handleChange}
          />
          {/* <WeekBar 
          allCourses={allCourses}
          // week={setWeek}
          // changeWeek={changeWeek}
        /> */}
          <div>
            <CourseCalender
              choose={choose}
              setChoose={setChoose}
              allCourses={allCourses}
              setAllCourses={setAllCourses}
              newCourses={newCourses}
              coaches={coaches}
              setCoaches={setCoaches}
              bookingData={bookingData}
              setBookingData={setBookingData}
              getBookingData={getBookingData}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Courses;
