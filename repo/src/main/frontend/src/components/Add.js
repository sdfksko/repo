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

    .day-select {
        display: flex;
    }
`

function Add() {

    const navigate = useNavigate();

    const[month, setMonth] = useState();
    const[day, setDay] = useState();
    const[week, setWeek] = useState();
    const[lastDay, setLastDay] = useState();
    const[days, setDays] = useState([]);
    const[content, setContent] = useState(null);

    useEffect(()=> {
        axios.get("http://localhost:9000/dayList")
            .then(function(response) {
                console.log(response.data);
                setMonth(response.data[1]);
                setDay(response.data[4]);
                setWeek(response.data[3]);
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

    useEffect(() => {
        const dayList = [];
        for(let i = 1; i <= lastDay; i++) {
            dayList.push(i);
        }
        setDays(dayList);
    }, [lastDay]);

    useEffect(()=> {
        if(day != 0 && month != 0) {
            console.log(month, day);
        }
    }, [month, day]);

    function back() {
        navigate('/');
    }

    function add() {
        if(content == null) {
            alert('내용을 입력해주세요');
        } else {
            axios.post('http://localhost:9000/toDoList/add', {day, month, content})
                .then(function(response) {
                    alert(response.data);
                    setTimeout(function() {
                        navigate('/');
                    }, 100);
                })
                .catch(function(error) {

                });
        }
    }

    return(
        <StyledDiv>
            <button onClick={back}>뒤로가기</button>
            <div className="day-select">
                <div> 월을 선택하세요.
                    <select value={month} onChange={(e)=> setMonth(e.target.value)}>
                        <option value="1">1월</option>
                        <option value="2">2월</option>
                        <option value="3">3월</option>
                        <option value="4">4월</option>
                        <option value="5">5월</option>
                        <option value="6">6월</option>
                        <option value="7">7월</option>
                        <option value="8">8월</option>
                        <option value="9">9월</option>
                        <option value="10">10월</option>
                        <option value="11">11월</option>
                        <option value="12">12월</option>
                    </select>
                </div>
                <div> 일을 선택하세요.
                    <select value={day} onChange={(e)=> setDay(e.target.value)}>
                        {days.map((day)=> (
                        <option value={day}>{day}일</option>
                        ))}
                    </select>
                </div>
                <p>{week}</p>
            </div>
            <textarea onChange={(e)=> setContent(e.target.value)}></textarea>
            <button onClick={add}>등록</button>
        </StyledDiv>
    )
}

export default Add;