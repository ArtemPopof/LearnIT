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
                           <h1>Java тесты для изучения и подготовки к собеседованию</h1>
                           <h1 style={{marginTop: "50px"}}>Начать тестирование</h1>
                           <ul className="level-chooser" style={{textAlign: "center"}}>
                               <p className="menu_item" onClick={this.startTest.bind(this, "junior")}>Начинающий уровень (Junior)</p>
                               <p className="menu_item" onClick={this.startTest.bind(this, "middle")}>Средний уровень (Middle)</p>
                               <p className="menu_item" onClick={this.startTest.bind(this, "senior")}>Продвинутый уровень (Senior)</p>
                           </ul>
                           <div className="center-vertically">
                                <a style={{marginRight: "10px", display: "flex", alignItems: "center"}} href="https://vk.com/javatests">Перейти в группу  <img width="50" style={{marginLeft: "10px"}} src="https://leonardo.osnova.io/7e0ec5a0-1e56-2e90-de73-6c402276900d/-/resize/900"></img></a>
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