import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronRight,
  FaChevronLeft,
  FaRedo,
  FaHeart,
  FaGem,
  FaCircle,
  FaStar,
} from "react-icons/fa";
import questions from "../data/quiz";
import ConfettiExplosion from "react-confetti-explosion";

export default function SweetQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [started, setStarted] = useState(false);


  const [quizQuestions] = useState(() => {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  });

  const currentQ = quizQuestions[step];

  const handleAnswer = (questionId, sweet) => {
    setAnswers((prev) => ({ ...prev, [questionId]: sweet }));
    nextStep();
  };

  const nextStep = () => {
    if (step < quizQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setFinished(true);
      setShowConfetti(true);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const getResult = () => {
    const tally = {};
    Object.values(answers).forEach((a) => {
      tally[a] = (tally[a] || 0) + 1;
    });
    const maxSweet = Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0];

    const results = {
      gulab: {
        icon: '/sweets/gulabjamun.png',
        title: "Gulab Jamun",
        description:
          "You're the warm, comforting soul everyone turns to. Like this beloved sweet, you bring joy and sweetness wherever you go!",
        traits: ["Nurturing", "Reliable", "Heartwarming"],
      },
      kaju: {
        icon: '/sweets/kaju_katli.png',
        title: "Kaju Katli",
        description:
          "Elegant and refined, you have impeccable taste. You're the diamond-shaped perfection in a world of chaos!",
        traits: ["Sophisticated", "Precise", "Classy"],
      },
      rasgulla: {
        icon: '/sweets/rasgulla.png',
        title: "Rasgulla",
        description:
          "You're the zen master of sweets. Calm, adaptable, and with a spongy heart that absorbs all the good vibes!",
        traits: ["Peaceful", "Adaptable", "Gentle"],
      },
      jalebi: {
        icon: '/sweets/jalebi.png',
        title: "Jalebi",
        description:
          "Vibrant and full of twists, you're the life of every party. Your energy is as infectious as your spiral charm!",
        traits: ["Energetic", "Creative", "Bold"],
      },
    };

    return (
      results[maxSweet] || {
        icon: '/sweets/mystery.png',
        title: "Fusion Sweet",
        description: "You're a unique blend that can't be categorized!",
        traits: ["Universal", "Balanced", "Versatile"],
      }
    );
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setFinished(false);
    setShowConfetti(false);
  };

  if (!started) {
  return (
    <div className="h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 p-6 flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border border-pink-200"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Sweet Quiz!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Find out which sweet matches your personality. Answer 5 fun questions!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStarted(true)}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          Start Quiz
        </motion.button>
      </motion.div>
    </div>
  );
}


  if (finished) {
    const result = getResult();

    return (
      <div className="h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 p-6 flex flex-col justify-center items-center">
        {showConfetti && <ConfettiExplosion />}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border border-pink-200"
          >
            <img src={result.icon} alt={result.title} className="h-36 w-auto object-contain mx-auto" />
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
             <div>
              
             </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
                You're a {result.title}!
              </h1>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {result.description}
              </p>

              <div className="flex justify-center gap-4 mb-8">
                {result.traits.map((trait, index) => (
                  <motion.span
                    key={trait}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full text-sm font-medium text-gray-700 border border-pink-200"
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <FaRedo className="text-lg" />
              Take Quiz Again
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen pt-20 bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 p-6 flex items-center justify-center">
      <div className="max-w-lg w-full">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>
              Question {step + 1} of {quizQuestions.length}
            </span>
            <span>
              {Math.round(((step + 1) / quizQuestions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-pink-100 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((step + 1) / quizQuestions.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-pink-400 to-orange-400 rounded-full"
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              opacity: { duration: 0 },
            }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-pink-200 mb-6"
          >
            <h2 className="text-xl text-center font-bold text-gray-800 mb-4 leading-relaxed">
              {currentQ.text}
            </h2>

            {/* Options Grid 2x2 */}
            <div className="grid grid-cols-2 grid-rows-2 gap-4 justify-items-center items-center">
              {currentQ.options.map((opt, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.2, duration: 0.3 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(currentQ.id, opt.sweet)}
                  className={`cursor-pointer p-4 rounded-2xl font-medium transition-all duration-300 w-full h-32 flex items-center justify-center text-center ${
                    answers[currentQ.id] === opt.sweet
                      ? "bg-gradient-to-r from-pink-400 to-orange-400 text-white shadow-lg"
                      : "bg-gradient-to-r from-pink-50 to-orange-50 hover:from-pink-100 hover:to-orange-100 text-gray-700 border border-pink-200 hover:border-pink-300"
                  }`}
                >
                  {opt.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevStep}
            disabled={step === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
          >
            <FaChevronLeft /> Previous
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              nextStep();
            }}
            disabled={!answers[currentQ.id]}
            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {step === quizQuestions.length - 1 ? "See Results" : "Next"}
            <FaChevronRight />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
