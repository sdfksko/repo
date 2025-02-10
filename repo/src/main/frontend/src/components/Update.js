import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';

function Update() {
    const location = useLocation();
    const navigate = useNavigate();
    const toDo = location.state.toDo;

    const[month, setMonth] = useState(toDo.month);
    const[day, setDay] = useState(toDo.day);
    const[content, setContent] = useState(toDo.content);
    const[week, setWeek] = useState();
    const[lastDay, setLastDay] = useState();
    const[days, setDays] = useState([]);
    const[id, setId] = useState(toDo.id);

    useEffect(()=> {
        axios.get('http://localhost:9000/editDayList?month=' + month + '&&day=' + day)
            .then(function(response) {
                console.log(response.data);
                setLastDay(response.data[1]);
                setWeek(response.data[2]);
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
        for(let i = 1; i <= lastDay; i++) {
            dayList.push(i);
        }
        setDays(dayList);
    }, [lastDay]);

    useEffect(()=> {
        axios.get('http://localhost:9000/editDayList?month=' + month + '&&day=' + day)
            .then(function(response) {
                console.log(response.data);
                setLastDay(response.data[1]);
                setWeek(response.data[2]);
            })
            .catch(function(error) {
                console.log(error);
            });
    }, [month, day]);

    function back() {
        navigate('/');
    }

    function edit() {
        axios.post('http://localhost:9000/editToDoList', {id, month, day, content})
            .then(function(response) {
                alert(response.data);
                setTimeout(function() {
                    navigate('/');
                }, 100)
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    return(
        <div>
            <button onClick={back}>뒤로가기</button>
            <div>
                <div>월을 선택하세요.
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
                <div>일을 선택하세요.
                    <select value={day} onChange={(e)=> setDay(e.target.value)}>
                        {days.map((day)=> (
                        <option value={day}>{day}일</option>
                        ))}
                    </select>
                </div>
                <div>{week}</div>
            </div>
            <textarea onChange={(e)=> setContent(e.target.value)}>{content}</textarea>
            <button onClick={edit}>수정</button>
        </div>
    )
}

export default Update;