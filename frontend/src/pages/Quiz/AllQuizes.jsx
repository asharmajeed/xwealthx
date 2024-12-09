import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import QuizHandler from "./QuizHandler";

const ExamA = () => {
  const { subjectName } = useParams();
  const subject = decodeURIComponent(subjectName);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <QuizHandler
      type="exam"
      subject={subject}
      sessionId="exam123"
      userInfo={userInfo}
    />
  );
};

const RevisionA = () => {
  const { subjectName } = useParams();
  const subject = decodeURIComponent(subjectName);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <QuizHandler
      type="revision"
      subject={subject}
      sessionId="revision456"
      userInfo={userInfo}
    />
  );
};

const SubjectQuizA = () => {
  const { subjectName } = useParams();
  const subject = decodeURIComponent(subjectName);
  const { userInfo } = useSelector((state) => state.auth);

  return <QuizHandler type="subjectQuiz" subject={subject} userInfo={userInfo} />;
};

const SubjectQuizFreeA = () => {
  const { subjectName } = useParams();
  const subject = decodeURIComponent(subjectName);
  const { userInfo } = useSelector((state) => state.auth);

  return <QuizHandler type="subjectQuizFree" subject={subject} userInfo={userInfo} />;
};

export { ExamA, RevisionA, SubjectQuizA, SubjectQuizFreeA };
