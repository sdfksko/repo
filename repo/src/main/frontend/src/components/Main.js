import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';

const StyledDiv = styled.div`
    * {
        margin: 0px;
        padding: 0px;
    }

    ul, ol {
        list-style: none;
    }

    a {
        text-decoration: none
    }

    .container {
        width: 1000px;
        margin: 0 auto;
    }

    .top {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 100px 0px 50px 0px;
    }

    .day-pageNation {
        width: 30px;
        height: 30px;
        margin: 0px 5px 0px 0px;
    }

    .day-pageNation:nth-child(4) {
        margin: 0px 5px 0px 5px;
    }

    .day-pageNation:last-child {
        margin: 0px;
    }

    .add-btn {
        width: 50px;
        height: 30px;
        margin-right: 5px;
    }

    .box {

    }

    .week {
        display: flex;
    }

    .week-item {
        width: 140px;
        height: 30px;
        border-width: 2px 0px 2px 2px;
        border-style: solid;
        border-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .week-item:last-child {
        border-width: 2px 2px 2px 2px;
        border-style: solid;
        border-color: black;
    }

    .day {
        display: flex;
        flex-wrap: wrap;
    }

    .day-item {
        width: 140px;
        height: 80px;
        border-width: 0px 0px 2px 2px;
        border-style: solid;
        border-color: black;
    }

    .day-item:nth-child(7n) {
        border-width: 0px 2px 2px 2px;
        border-style: solid;
        border-color: black;
    }

    .day-item:last-child {
        border-width: 0px 2px 2px 2px;
        border-style: solid;
        border-color: black;
    }

    .day-click {
        display: flex;
        justify-content: center;
        cursor: pointer;
        margin-bottom: 10px;
    }

    .day-details {
        display: flex;
        justify-content: center;
        cursor: pointer;
    }
`

function Main() {

    const navigate = useNavigate();

    const[toDoList, setToDoList] = useState([]);
    const[year, setYear] = useState();
    const[month, setMonth] = useState();
    const[lastDay, setLastDay] = useState();
    const[week, setWeek] = useState();
    const[days, setDays] = useState([]);
    const[testWeek, setTestWeek] = useState();

    useEffect(()=> {
        axios.get('http://localhost:9000/dayList')
            .then(function(response) {
                console.log(response.data);
                setYear(response.data[0]);
                setMonth(response.data[1]);
                setWeek(response.data[3]);
                setTestWeek(response.data[3]);
                setLastDay(response.data[2]);
            })
            .catch(function(error) {
                console.log(error);
            });
    }, []);

    useEffect(()=> {
        switch(week) {
            case 1:
                setWeek("월요일");
                break;
            case 2:
                setWeek("화요일");
                break;
            case 3:
                setWeek("수요일");
                break;
            case 4:
                setWeek("목요일");
                break;
            case 5:
                setWeek("금요일");
                break;
            case 6:
                setWeek("토요일");
                break;
            case 7:
                setWeek("일요일");
                break;
        }
    }, [week]);

    useEffect(()=> {
        const dayList = [];
        if(testWeek < 7) {
            for(let i = 1; i <= testWeek; i++) {
                dayList.push("");
            }
            for(let i = 1; i <= lastDay; i++) {
                dayList.push(i);
            }
            setDays(dayList);
        } else {
            for(let i = 1; i <= lastDay; i++) {
                dayList.push(i);
            }
            setDays(dayList);
        }
    }, [lastDay, testWeek]);

    useEffect(()=> {
        axios.get('http://localhost:9000/toDoList?month=' + month)
            .then(function(response) {
                console.log(response.data);
                setToDoList(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    }, [month]);

    function firstMonth() {
        if(month == 1) {
            alert('이미 첫 페이지입니다.');
        } else {
            axios.get('http://localhost:9000/dayList?newMonth=' + 1)
                .then(function(response) {
                    setYear(response.data[0]);
                    setMonth(response.data[1]);
                    setWeek(response.data[3]);
                    setTestWeek(response.data[3]);
                    setLastDay(response.data[2]);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }

    function prevMonth() {
        if(month == 1) {
            alert('이미 첫 페이지입니다.');
        } else {
            axios.get('http://localhost:9000/dayList?newMonth=' + (month - 1))
                .then(function(response) {
                    setYear(response.data[0]);
                    setMonth(response.data[1]);
                    setWeek(response.data[3]);
                    setTestWeek(response.data[3]);
                    setLastDay(response.data[2]);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }

    function nextMonth() {
        if(month == 12) {
            alert('이미 마지막 페이지입니다.');
        } else {
            axios.get('http://localhost:9000/dayList?newMonth=' + (month + 1))
                .then(function(response) {
                    setYear(response.data[0]);
                    setMonth(response.data[1]);
                    setWeek(response.data[3]);
                    setTestWeek(response.data[3]);
                    setLastDay(response.data[2]);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }

    function lastMonth() {
        if(month == 12) {
            alert('이미 마지막 페이지입니다.');
        } else {
            axios.get('http://localhost:9000/dayList?newMonth=' + 12)
                .then(function(response) {
                    setYear(response.data[0]);
                    setMonth(response.data[1]);
                    setWeek(response.data[3]);
                    setTestWeek(response.data[3]);
                    setLastDay(response.data[2]);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }

    function add() {
        navigate('/add');
    }

    function del(day) {
        if(window.confirm("해당 날짜의 일정을 모두 삭제하시겠습니까?")) {
            axios.post('http://localhost:9000/toDoList/del', {month, day})
            .then(function(response) {
                console.log(response.data);
                if(response.data === "일정이 존재하지 않습니다") {
                    alert('일정이 존재하지 않습니다.');
                    console.log(response.data);
                } else {
                    alert('삭제에 성공하였습니다.');
                    axios.get('http://localhost:9000/toDoList?month=' + month)
                        .then(function(response) {
                            console.log(response.data);
                            setToDoList(response.data);
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        }
        else {
            alert("삭제를 취소합니다");
        }
    }

    function update(filteredToDo) {
        navigate('/update', {state: {toDo: filteredToDo}});
    }

    return(
        <StyledDiv>
            <div className="container">
                <div className="top">
                    <button className="day-pageNation" onClick={firstMonth}>&lt;&lt;</button>
                    <button className="day-pageNation" onClick={prevMonth}>&lt;</button>
                    <h1>{year}년 {month}월 해야할 일 목록</h1>
                    <button className="day-pageNation" onClick={nextMonth}>&gt;</button>
                    <button className="day-pageNation" onClick={lastMonth}>&gt;&gt;</button>
                    <button className="add-btn" onClick={add}>등록</button>
                </div>
                <div className="box">
                    <div className="week">
                        <div className="week-item">일</div>
                        <div className="week-item">월</div>
                        <div className="week-item">화</div>
                        <div className="week-item">수</div>
                        <div className="week-item">목</div>
                        <div className="week-item">금</div>
                        <div className="week-item">토</div>
                    </div>
                    <div className="day">
                        {days.map((day) => (
                          <div className="day-item">
                            <p className="day-click" onClick={()=> del(day)}>{day}</p>
                            {toDoList
                              .filter((toDo) => toDo.day === day)
                              .map((filteredToDo) => (
                                <div className="day-details">
                                  <p onClick={()=> update(filteredToDo)}>{filteredToDo.content}</p>
                                </div>
                             ))}
                          </div>
                        ))}
                    </div>
                </div>
            </div>
        </StyledDiv>
    )
}

export default Main;