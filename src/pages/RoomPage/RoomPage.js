import React, { Component } from "react";
import { getLocalRoom } from "../../services/roomService";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import moment from "moment";

class RoomPage extends Component {
  constructor() {
    super();
    this.state = {
      roomNotFound: false,
      loaded: false,
      room: {
        title: "",
        author: "",
        question: "",
      },
      endTime: moment(),
      timeLeft: 0,
      answer: "",
      escaped: false,
      timeRunning: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const roomCode = this.props.match.params.roomCode;
    const room = getLocalRoom(roomCode);
    if (room) {
      this.setState(
        {
          room: room,
          loaded: true,
          endTime: moment().add(room.timeLimit, "minutes").add(1, "seconds"),
          timeLeft: room.timeLimit * 60,
          answer: "",
          escaped: false,
          timeRunning: true,
        },
        () => {
          this.calculateTimeLeft();
        }
      );
    } else {
      this.setState({ roomNotFound: true, loading: false });
    }
  }

  calculateTimeLeft() {
    let time = moment(this.state.endTime).diff(moment(), "seconds");
    if (time < 0) {
      time = 0;
    }
    if (this.state.timeRunning) {
      this.setState({ timeLeft: time }, () => {
        setTimeout(() => {
          this.calculateTimeLeft();
        }, 1000);
      });
    }
  }

  displayTimeLeft() {
    const time = this.state.timeLeft;
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${("00" + m).slice(-2)}:${("00" + s).slice(-2)}`;
  }

  handleChange(event) {
    this.setState({ answer: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.answer.toLowerCase() ===
      this.state.room.finalPuzzle.answer.toLowerCase()
    ) {
      this.setState({ escaped: true, timeRunning: false });
    } else {
      this.setState({ answer: "" });
    }
    this.setState({ redirectToRoom: true });
  }

  render() {
    if (this.state.roomNotFound) {
      return <NotFoundPage />;
    } else {
      return (
        this.state.loaded && (
          <React.Fragment>
            <div className="container mx-auto py-20 px-4">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 font-serif">
                  {this.state.room.title}
                </h1>
                <p className="text-indigo-700 text-sm mt-2 border-b border-gray-400 pb-12">
                  Room created by{" "}
                  <a
                    href={`http://github.com/${this.state.room.author.githubUsername}`}
                  >
                    <span className="font-semibold border-b border-indigo-700">
                      {this.state.room.author.name}
                    </span>
                  </a>
                </p>
              </div>
              {this.state.escaped ? (
                <React.Fragment>
                  <div className="container mx-auto py-16 lg:py-32 px-4">
                    <h1 className="text-6xl font-bold text-indigo-700 text-center">
                      You escaped!
                    </h1>
                    <div className="mt-16">
                      <div>
                        <p className="mb-2 font-bold text-center">
                          Time remaining
                        </p>
                        <p className="mb-4 text-center">
                          {this.displayTimeLeft()}
                        </p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="mt-16 mb-32">
                    <h2 className="text-2xl font-semibold text-indigo-700 font-serif mt-8 mb-4">
                      Introduction
                    </h2>
                    <p className="whitespace-pre-wrap">
                      {this.state.room.introduction}
                    </p>
                    <h2 className="text-2xl font-semibold text-indigo-700 font-serif mt-8 mb-4">
                      Tasks
                    </h2>
                    {this.state.room.tasks.map((task, i) => (
                      <div className="whitespace-pre-wrap mb-4" key={i}>
                        <p className="font-semibold">Task {i + 1}</p>
                        <div className="h-full">
                          {task.reference && (
                            <div className="bg-white shadow rounded py-4 px-8 inline-block my-4 md:my-0 md:ml-6 md:float-right">
                              <p className="font-semibold text-indigo-700 text-sm mb-2">
                                Reference sheet
                              </p>
                              <p>{task.reference}</p>
                            </div>
                          )}
                          <p>{task.question}</p>
                        </div>
                      </div>
                    ))}
                    <h2 className="text-2xl font-semibold text-indigo-700 font-serif mt-8 mb-4">
                      Final Puzzle
                    </h2>
                    <p className="whitespace-pre-wrap">
                      {this.state.room.finalPuzzle.question}
                    </p>
                  </div>
                </React.Fragment>
              )}
            </div>
            {!this.state.escaped && (
              <div className="fixed bottom-0 inset-x-0 m-4 md:mb-8">
                <div className="max-w-screen-sm mx-auto">
                  <div className="p-4 rounded bg-indigo-100 border border-indigo-200 shadow-md">
                    <div className="flex items-stretch">
                      <div className="self-center flex-1 text-center">
                        <p className="text-5xl text-gray-800 font-mono">
                          {this.displayTimeLeft()}
                        </p>
                      </div>
                      <div className="flex-1">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                          <input
                            className="p-2 border border-indigo-200 uppercase font-semibold text-center w-full mb-4 shadow-inner"
                            value={this.state.answer}
                            onChange={this.handleChange}
                            placeholder="Answer"
                          />
                          <button
                            disabled={this.state.answer === ""}
                            className="disabled:bg-indigo-200 bg-indigo-700 w-full p-2 text-white uppercase font-semibold"
                            type="submit"
                          >
                            Escape
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        )
      );
    }
  }
}

export default RoomPage;
