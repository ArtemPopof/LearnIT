import React from 'react';
import MainHeader from '../../components/Header';

export default class Home extends React.Component {

    render() {
        return (
            <div>
                <MainHeader/>
               <div className="flex">
                   {/* <div style={{width:"80%", backgroundColor: "white", paddingTop: "150px", paddingLeft: "90px", paddingRight: "50px"}}>
                       <h1 style={{color: "rgb(55, 55, 122)"}}>LearnIT!</h1>
                       <h1>Проверить свои знания Java или подготовиться к собеседованию</h1>
                       <p className="secondary-text">Тест Java с вопросами из различных областей языка для изучения и эффективной подготовки к собеседованиям.</p>
                   </div> */}
                   <div className="contrast_block white_color" style={{width:"100%", height: "800px", boxShadow: "0 0 10px rgba(0,0,0,0.5)", backgroundColor: "rgb(55, 55, 122)", display: 'flex', justifyContent: 'center'}}>
                       <div className="center-hor" style={{marginTop: '100px'}}>
                            <h1 style={{marginBottom: "50px"}}>Тесты и задания для подготовки к собеседованию и изучению Java</h1>
                            <div className="flex">
                                <div className="half-column card">
                                    <h1>Тестирование</h1>
                                    <ul className="level-chooser" style={{textAlign: "center"}}>
                                        <p className="menu_item" onClick={this.startTest.bind(this, "junior")}>Начинающий уровень (Junior)</p>
                                        <p className="menu_item" onClick={this.startTest.bind(this, "middle")}>Средний уровень (Middle)</p>
                                        <p className="menu_item" onClick={this.startTest.bind(this, "senior")}>Продвинутый уровень (Senior)</p>
                                    </ul>
                                </div>
                                <div className="gap40"></div>
                                <div className="half-column card" style={{position: "relative"}}>
                                    <div className="locked center-hor center-vertically padding36 clickable" onClick={() => document.location.href="/sign_in"}>
                                        <h1>Войдите или зарегистрируйтесь для доступа к этому разделу</h1>
                                    </div>
                                    <h1>Задания с кодом</h1>
                                    <ul className="level-chooser" style={{textAlign: "center"}}>
                                        <p className="menu_item" onClick={this.startTest.bind(this, "junior")}>Простые задания (core java)</p>
                                        <p className="menu_item" onClick={this.startTest.bind(this, "middle")}>Средние задания (core + swing + fs)</p>
                                        <p className="menu_item" onClick={this.startTest.bind(this, "senior")}>Сложные задания (threads, network)</p>
                                    </ul>
                                </div>
                            </div>
                            <div className="center-vertically">
                                <a style={{marginTop: "70px", display: "flex", alignItems: "center"}} href="https://vk.com/javatests">Перейти в группу  <img width="50" style={{marginLeft: "10px"}} src="https://leonardo.osnova.io/7e0ec5a0-1e56-2e90-de73-6c402276900d/-/resize/900"></img></a>
                            </div>
                       </div>
                   </div>
               </div>
            </div>
        );
    }

    
    startTest(level) {        
        this.props.onStartTest(level)
    }
}