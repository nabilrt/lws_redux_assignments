import { Link, useParams } from "react-router-dom";
import { useGetQuizByVideoQuery } from "../../features/quiz/quizApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetQuizMarksByVideoQuery,
  useSubmitQuizMutation,
} from "../../features/quizMark/quizMarkApi";
export default function QuizPage() {
  const { id } = useParams();
  const { data: quiz, isLoading, isError, error } = useGetQuizByVideoQuery(id);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [isQuizSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const user = useSelector((user) => user.auth.user);
  const { data: quizResultsInfo } = useGetQuizMarksByVideoQuery({
    videoId: id,
    studentId: user?.id,
  });
  const [
    submitQuiz,
    { isLoading: isQuizSubmitting, isError: isQuizError, error: quizError },
  ] = useSubmitQuizMutation();

  useEffect(() => {
    if (!isLoading && !isError && quizResultsInfo?.length === 0) {
      setQuestions(quiz[questionIndex]);
    }
  }, [isLoading, isError, questionIndex, userAnswers, quizResultsInfo]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  const handleQuestionChange = (action) => {
    if (action === "prev") {
      setQuestionIndex((currIndex) => currIndex - 1);
    } else if (action === "next") {
      setQuestionIndex((currIndex) => currIndex + 1);
    }
  };

  const handleAnswers = (option) => {
    if ([questions?.id] in userAnswers) {
      if (
        userAnswers[questions.id]?.some(
          (e) => e.id.toString() === option.id.toString()
        )
      ) {
        if (userAnswers[questions.id]?.length === 1) {
          const updatedAnswers = { ...userAnswers };
          delete updatedAnswers[questions.id];
          setUserAnswers(updatedAnswers);
        } else {
          setUserAnswers({
            ...userAnswers,
            [questions?.id]: userAnswers[questions?.id]?.filter(
              (item) => item.id.toString() !== option.id.toString()
            ),
          });
        }
      } else {
        setUserAnswers({
          ...userAnswers,
          [questions?.id]: [...userAnswers[questions?.id], option],
        });
      }
    } else {
      setUserAnswers({
        ...userAnswers,
        [questions?.id]: [
          {
            ...option,
            id: Number(option.id),
          },
        ],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let correctAnswer = 0;
    let quizOriginalAnswers = {};
    for (let i = 0; i < quiz?.length; i++) {
      for (let j = 0; j < quiz[i]?.options?.length; j++) {
        if (quiz[i]?.options[j]?.isCorrect) {
          quizOriginalAnswers = {
            ...quizOriginalAnswers,
            [quiz[i]?.id]: quizOriginalAnswers[quiz[i]?.id]++ || 1,
          };
        }
      }
    }
    let quizUserAnswers = {};
    for (let i = 0; i < quiz?.length; i++) {
      for (let j = 0; j < userAnswers[quiz[i]?.id].length; j++) {
        if (
          userAnswers[quiz[i]?.id].length ===
            quizOriginalAnswers[quiz[i]?.id] &&
          userAnswers[quiz[i]?.id][j].isCorrect
        ) {
          quizUserAnswers = {
            ...quizUserAnswers,
            [quiz[i]?.id]: quizUserAnswers[quiz[i]?.id]++ || 1,
          };
        } else {
          quizUserAnswers = {
            ...quizUserAnswers,
            [quiz[i]?.id]: 0,
          };
        }
      }
    }

    let totalResult = {};

    let wrongAnswer = 0;

    for (let i = 0; i < quiz?.length; i++) {
      if (quizUserAnswers[quiz[i]?.id] === quizOriginalAnswers[quiz[i]?.id]) {
        correctAnswer++;
        totalResult = {
          ...totalResult,
          totalCorrect: correctAnswer,
          mark: correctAnswer * 5,
        };
      } else {
        wrongAnswer++;
        totalResult = {
          ...totalResult,
          totalWrong: wrongAnswer,
        };
      }
    }

    totalResult = {
      ...totalResult,
      quizUserAnswers,
      quizOriginalAnswers,
      totalMark: quiz?.length * 5,
      totalQuiz: quiz?.length,
      totalWrong: totalResult.totalWrong || 0,
      totalCorrect: totalResult.totalCorrect || 0,
      mark: totalResult.mark || 0,
    };

    const quizMarkObject = {
      totalMark: quiz?.length * 5,
      totalQuiz: quiz?.length,
      totalWrong: totalResult.totalWrong || 0,
      totalCorrect: totalResult.totalCorrect || 0,
      mark: totalResult.mark || 0,
      video_id: Number(id),
      video_title: quiz[0]?.video_title,
      student_name: user?.name,
      student_id: user?.id,
    };

    console.log(quizMarkObject);

    submitQuiz({ data: quizMarkObject }).then(() => {
      setResults(totalResult);
      setIsSubmitted(true);
    });
  };

  let content = null;
  if (quizResultsInfo?.length > 0) {
    content = (
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Quizzes for "{quiz[0]?.video_title}"
          </h1>
          <p className="text-sm text-slate-200">
            Each question contained 5 Mark.{" "}
            <span className="underline">
              <u>Only the correct answers are shown!</u>
            </span>
          </p>
        </div>
        <p className="font-semibold">Your Evaluation</p>
        <div className="flex gap-2 w-full">
          <div className="flex flex-col gap-2 py-2">
            <div className="text-white font-semibold">Total Marks</div>
            <div>{quizResultsInfo[0]?.totalMark}</div>
          </div>
          <div className="flex flex-col gap-2 py-2">
            {" "}
            <div className="text-white font-semibold">Total Correct</div>
            <div>{quizResultsInfo[0]?.totalCorrect}</div>
          </div>
          <div className="flex flex-col gap-2 py-2">
            <div className="text-white font-semibold">Total Wrong</div>
            <div>{quizResultsInfo[0]?.totalWrong}</div>
          </div>
          <div className="flex flex-col gap-2 py-2">
            <div className="text-white font-semibold">Total Marks</div>
            <div>{quizResultsInfo[0]?.mark}</div>
          </div>
        </div>
        <div className="space-y-8 ">
          {quiz?.map((qz, index) => {
            return (
              <div className="quiz">
                <div className="w-full flex justify-between">
                  <h4 className="question">
                    Question {index + 1} - {qz?.question}
                  </h4>
                </div>

                <form className="quizOptions">
                  {/* Option 1 */}
                  {qz?.options?.map((op, index) => {
                    return (
                      <label
                        htmlFor={`option${index + 1}_q${qz?.id}`}
                        key={op.id}
                      >
                        <input
                          type="checkbox"
                          id={`option${index + 1}_q${qz?.id}`}
                          checked={op.isCorrect}
                          key={`option${index + 1}_q${qz?.id}`}
                          disabled
                        />
                        {op?.option}
                      </label>
                    );
                  })}
                </form>
              </div>
            );
          })}
          <button
            className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
            type="button"
          >
            Go to Leaderboard
          </button>
        </div>
      </div>
    );
  } else {
    if (isLoading) {
      content = <div className="text-green-500">Loading...</div>;
    } else if (!isLoading && isError) {
      content = <div className="text-red-500">{error}</div>;
    } else if (!isLoading && !isError && quiz.length === 0) {
      content = <div className="text-blue-500">No Quiz Found!</div>;
    } else if (!isLoading && !isError && quiz.length > 0) {
      content = (
        <>
          {isQuizSubmitted ? (
            <div className="mx-auto max-w-7xl px-5 lg:px-0">
              <div className="mb-8">
                <h1 className="text-2xl font-bold">
                  Quizzes for "{questions?.video_title}"
                </h1>
                <p className="text-sm text-slate-200">
                  Each question contained 5 Mark
                </p>
              </div>
              <div className="flex gap-2 w-full">
                <div className="flex flex-col gap-2 py-2">
                  <div className="text-white font-semibold">Total Marks</div>
                  <div>{results?.totalMark}</div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  {" "}
                  <div className="text-white font-semibold">Total Correct</div>
                  <div>{results?.totalCorrect}</div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="text-white font-semibold">Total Wrong</div>
                  <div>{results?.totalWrong}</div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="text-white font-semibold">Total Marks</div>
                  <div>{results?.mark}</div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex  gap-2">
                    {" "}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="red"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    Your Given Wrong Answers
                  </div>
                  <div className="flex  gap-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="palegreen"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    Correct Answers
                  </div>
                </div>
              </div>
              <div className="space-y-8 ">
                {quiz?.map((qz, index) => {
                  return (
                    <div className="quiz">
                      <div className="w-full flex justify-between">
                        <h4 className="question">
                          Question {index + 1} - {qz?.question}
                        </h4>
                        <span>
                          {results?.quizUserAnswers[qz?.id] !==
                          results?.quizOriginalAnswers[qz?.id] ? (
                            <svg
                              id="Layer_1"
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              width={24}
                              height={24}
                              color="#e70b0b"
                            >
                              <defs>
                                <style
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      ".cls-6374f8d9b67f094e4896c61e-1{fill:none;stroke:currentColor;stroke-miterlimit:10;}",
                                  }}
                                />
                              </defs>
                              <circle
                                className="cls-6374f8d9b67f094e4896c61e-1"
                                cx={12}
                                cy={12}
                                r="10.5"
                              />
                              <line
                                className="cls-6374f8d9b67f094e4896c61e-1"
                                x1="16.77"
                                y1="7.23"
                                x2="7.23"
                                y2="16.77"
                              />
                              <line
                                className="cls-6374f8d9b67f094e4896c61e-1"
                                x1="7.23"
                                y1="7.23"
                                x2="16.77"
                                y2="16.77"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="palegreen"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 12L10.5 15.5L17 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                stroke="#000000"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          )}
                        </span>
                      </div>

                      <form className="quizOptions">
                        {/* Option 1 */}
                        {qz?.options?.map((op, index) => {
                          const isIncorrect = userAnswers[qz?.id]?.some(
                            (e) => e.id === op.id && e.isCorrect === false
                          );

                          const userNotTicked = userAnswers[qz?.id]?.some(
                            (e) => e.id !== op.id && op.isCorrect
                          );

                          return (
                            <label
                              htmlFor={`option${index + 1}_q${qz?.id}`}
                              key={op.id}
                              style={{
                                backgroundColor: isIncorrect
                                  ? "red"
                                  : userNotTicked
                                  ? "palegreen"
                                  : "",
                                color: isIncorrect
                                  ? "white"
                                  : userNotTicked
                                  ? "blue"
                                  : "",
                              }}
                            >
                              <input
                                type="checkbox"
                                id={`option${index + 1}_q${qz?.id}`}
                                checked={
                                  op.isCorrect ||
                                  userAnswers[qz?.id]?.some(
                                    (e) => e.id.toString() === op.id.toString()
                                  )
                                }
                                key={`option${index + 1}_q${qz?.id}`}
                                disabled
                              />
                              {op?.option}
                            </label>
                          );
                        })}
                      </form>
                    </div>
                  );
                })}
                <div className="flex flex-col items-center justify-center  gap-2 py-2">
                  <p
                    className="font-semibold text-red-700"
                    style={{
                      color: "red",
                    }}
                  >
                    N.B: Marks are only given if all the options are correct
                  </p>
                </div>
                <button
                  className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
                  type="button"
                >
                  Go to Leaderboard
                </button>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-7xl px-5 lg:px-0">
              <div className="mb-8">
                <h1 className="text-2xl font-bold">
                  Quizzes for "{questions?.video_title}"
                </h1>
                <p className="text-sm text-slate-200">
                  Each question contains 5 Mark
                </p>
              </div>
              <div className="space-y-8 ">
                <div className="quiz">
                  <h4 className="question">
                    Question {questionIndex + 1} - {questions?.question}
                  </h4>
                  <form className="quizOptions">
                    {/* Option 1 */}
                    {questions?.options?.map((op, index) => {
                      return (
                        <label
                          htmlFor={`option${index + 1}_q${questions?.id}`}
                          key={op.id}
                        >
                          <input
                            type="checkbox"
                            id={`option${index + 1}_q${questions?.id}`}
                            onChange={() => handleAnswers(op)}
                            checked={userAnswers[questions.id]?.some(
                              (e) => e.id.toString() === op.id.toString()
                            )}
                            key={`option${index + 1}_q${questions?.id}`}
                          />
                          {op?.option}
                        </label>
                      );
                    })}
                  </form>
                </div>
              </div>
              <div className="flex w-full justify-between">
                <button
                  className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
                  type="button"
                  onClick={() => handleQuestionChange("prev")}
                  disabled={questionIndex === 0}
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
                  type="button"
                  onClick={() => handleQuestionChange("next")}
                  disabled={questionIndex === quiz?.length - 1}
                >
                  Next
                </button>
              </div>
              <button
                className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
                type="button"
                onClick={handleSubmit}
                disabled={
                  Object.keys(userAnswers).length !== quiz.length ||
                  isQuizSubmitting
                }
              >
                Submit
              </button>
            </div>
          )}
          {isQuizError && (
            <div
              className="font-semibold"
              style={{
                color: red,
              }}
            >
              {quizError}
            </div>
          )}
        </>
      );
    }
  }

  return <section className="py-6 bg-primary">{content}</section>;
}
