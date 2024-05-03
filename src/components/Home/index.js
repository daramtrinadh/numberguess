import React, { Component } from 'react';
import Header from '../Header';
import './index.css';

class Home extends Component {
    state = {
        number: '',
        userNumber: '',
        playAgain: false,
        smallNumber: false,
        bigNumber: false,
        attempts: 0,
        maxAttempts: 5, 
        score: 0,
        attemptWarning:false

    };

    componentDidMount() {
        this.guessNumber();
    }

    playAgain = () => {
        this.setState({ playAgain: false, attemptWarning:false,userNumber: '', smallNumber: false, bigNumber: false, attempts: 0 });
        this.guessNumber();
    };

    guessNumber = () => {
        const randomNumber = Math.floor(Math.random() * 101);
        this.setState({ number: randomNumber, attempts: 0 });
        console.log(randomNumber);
    };

    onEnter = () => {
        const { number, userNumber, attempts, maxAttempts } = this.state;
        this.setState({userNumber:''});
        if (Number(number) === Number(userNumber)) {
            this.setState({ playAgain: true, userNumber: '', smallNumber: false, bigNumber: false, score: this.state.score + (maxAttempts - attempts) });
            this.guessNumber();
            console.log('you-won');
        } else {
            if (Number(number) < Number(userNumber)) {
                this.setState({ smallNumber: true, bigNumber: false, attempts: attempts + 1 });
            } else {
                this.setState({ bigNumber: true, smallNumber: false, attempts: attempts + 1 });
            }

            if (attempts >= maxAttempts) {
               this.setState({attemptWarning:true})
            }
        }
    };

    onChangeNum = (event) => {
        this.setState({ userNumber: event.target.value });
    };

    render() {
        const { userNumber, playAgain, smallNumber, bigNumber, score ,attemptWarning} = this.state;
        return (
            <div>
                <Header />
                <div className="home-container">
                    <h1 className="heading">GUESS THE NUMBER</h1>
                    <b className="info">Let's play Guess the Number! The game picks a number. You make a guess. The game tells you if its number is more or less. Keep guessing to find that number!</b>
                    <input type="text" className="input" onChange={this.onChangeNum} value={userNumber} placeholder="Enter the Number.." />
                    <button type="button" className="enterbutton" onClick={this.onEnter}>Enter</button>
                    {playAgain ? <p onClick={this.playAgain} className="playagain">You Won CLick to Guess Again</p> : ''}
                    {smallNumber ? <p>Enter Small Number</p> : ''}
                    {bigNumber ? <p>Enter Big Number</p> : ''}
                    {attemptWarning? <p className="warning">Max Attempts Reached</p>:''}
                    {attemptWarning?<button className="retry" type="button" onClick={this.playAgain}>Retry</button>:''}
                    <h1 className='score'>Score:<span className="points"> {score}</span></h1>
                </div>
            </div>
        );
    }
}

export default Home;