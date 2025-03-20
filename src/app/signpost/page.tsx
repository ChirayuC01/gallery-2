"use client";
import Gallery from "@/components/Gallery";
import VideoGallery from "@/components/VideoGallery";
import React, { useState } from "react";
import ReactPlayer from "react-player";

const LifeLessons = () => {
  const [activeAge, setActiveAge] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null); // Track selected lesson
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  const lessons = [
    {
      id: 1,
      ageRange: "Years 0-3",
      topics: [
        {
          title: "Curiosity",
          points: [
            "The oxygen and elixir of mind and life, expose a lot -(controlled) read a lot",
            "Curiosity is like having a superpower! It means wanting to know and explore new things. When we encourage curiosity from when you were a tiny baby, it helps your brain grow, makes you smarter, and helps you discover amazing things about the world around you. So, keep asking questions and keep being curious!",
          ],
        },
      ],
    },
    {
      id: 2,
      ageRange: "Years 4-7",
      topics: [
        {
          title: "Be enthusiastic",
          points: [
            "Enthusiasm is like a magic potion that makes everything more fun and exciting!",
            "When you're enthusiastic, you have lots of energy and excitement for learning and trying new things. It helps you make new friends, enjoy school, and discover cool things about the world. So, let your enthusiasm shine bright and let's have a fantastic time exploring and learning together!",
          ],
        },
        {
          title: "Make technology a slave - not your master",
          points: [
            "Technology is like a helpful tool that we can use, but we don't want it to be our boss. Just like we need to eat healthy food and play outside to stay strong and happy, we also need to spend time doing other fun things besides using screens. That way, we can use technology wisely and still have time for imagination, games, and being with our friends and family. Remember, we are the boss of technology, not the other way around!",
            "Screens can be a lot of fun, but it's important to use them in a balanced way. Being addicted to screens means spending too much time looking at them and not doing other important things like playing outside, reading books, or spending time with loved ones. Just like we enjoy treats in moderation, let's enjoy screens in moderation too, so we can have a healthy and well-rounded life full of different experiences and adventures!",
          ],
        },
      ],
    },
    {
      id: 3,
      ageRange: "Years 8-11",
      topics: [
        {
          title: "Do not lie to yourself",
          points: [
            "Being honest with yourself means always telling the truth to yourself and others. It's like having a superpower that helps you make good choices and be a trustworthy person. Nietzsche, a philosopher, believed that being honest with ourselves is important for personal growth and finding true happiness. So, remember to listen to your inner voice, be truthful, and always strive to be the best version of yourself!",
            "Nietzsche pointed out that sometimes we tend to lie to ourselves to avoid doing things that we find difficult or uncomfortable.",
          ],
        },
        {
          title: "Be proud of what you do : 3 masons",
          points: [
            'Once upon a time, there were three masons who loved to build things. They each had an important job to do. The first mason was asked, "What are you doing?" He replied, "I am laying bricks." The second mason was asked the same question. He answered, "I am building a wall." But when the third mason was asked, he looked up with a big smile and said, "I am creating a magnificent castle!"',
            "You see, all three masons were doing the same task, but they had different perspectives. The first mason focused on the small task of laying bricks, while the second mason saw the bigger picture of building a wall. However, it was the third mason who saw beyond the bricks and the wall. He saw the grand vision of creating something truly amazing—a beautiful castle.",
            "This story teaches us that we should always try to see the bigger picture and have a positive attitude in whatever we do. Whether it's building a wall or doing our homework, if we have a vision and take pride in our work, we can turn even the simplest tasks into something extraordinary, just like the third mason and his magnificent castle!",
          ],
        },
        {
          title: "Do not be envious",
          points: [
            "Envy means feeling unhappy or jealous because someone has something that we don't have. But remember, everyone is special and unique in their own way. Instead of feeling envious, we can feel happy for others and appreciate what we have. Just like how you have special talents and things that make you special, others have their own special things too. So, let's focus on being happy with ourselves and celebrating the good things in others. When we do that, we can all be happy together and make lots of friends!",
          ],
        },
      ],
    },
    {
      id: 4,
      ageRange: "Years 12-15",
      topics: [
        {
          title: "Show up",
          points: [
            "Showing up in life means being present, engaged, and giving your best effort in everything you do. It's about actively participating and being responsible for your actions. When you show up, you seize opportunities, learn from challenges, and make meaningful connections. By showing up with enthusiasm and determination, you can create a life full of growth, success, and wonderful experiences. So, embrace each day with a positive attitude and show up ready to make a difference!",
          ],
        },
        {
          title: "Big stones",
          points: [
            "Imagine your life is like a jar, and you have different-sized stones, pebbles, and sand to fill it. The big stones represent the important things in your life, like family, education, and personal goals. Covey teaches us that if we put the big stones in the jar first, then the pebbles and sand will fit around them. But if we fill the jar with pebbles and sand first, there won't be enough room for the big stones. This means prioritizing what truly matters, focusing on the important things first, and then fitting in the smaller things. So, remember to put your big stones first, and everything else will fall into place!",
          ],
        },
        {
          title: "Only limitation of life is a bad attitude",
          points: [
            "Having a bad attitude can hold us back and limit our potential in life. It's like putting up a barrier that prevents us from fully experiencing happiness and success. When we have a negative mindset, we close ourselves off to opportunities and growth. But if we choose to have a positive attitude, we can overcome challenges, learn from failures, and create a brighter future. Our attitude shapes our experiences and how we perceive the world. So, let's choose a positive attitude, embrace optimism, and unlock the limitless possibilities that life has to offer!",
          ],
        },
        {
          title: "Hope is not a strategy - Do something",
          points: [
            "Hope is a powerful feeling that can inspire us and give us a sense of possibility. However, it's important to remember that hope alone is not enough to achieve our goals. We need to take action and make a plan to turn our hopes into reality. For example, imagine you hope to get good grades in school. Simply hoping for good grades without studying, attending classes, and putting in effort won't lead to success. Instead, you need to create a strategy by setting specific goals, organizing your study time, seeking help when needed, and working hard to improve your understanding of the subjects. By combining hope with a well-thought-out strategy and consistent effort, you increase your chances of achieving your desired outcome. So, while hope can provide motivation, it's crucial to back it up with ACTION to bring about the results we desire in life.",
          ],
        },
        {
          title: "Do things which will make your parents proud",
          points: [
            "Making your parents proud means doing things that make them happy. It's important to listen to their advice and consider their feelings. But also remember to follow your own passions and dreams, as long as they are respectful and aligned with your values. Finding a balance between making your parents proud and staying true to yourself will lead to a happy and fulfilling life for both you and your parents.",
          ],
        },
      ],
    },
    {
      id: 5,
      ageRange: "Years 16-19",
      topics: [
        {
          title: "Purpose - more you put into life more you get out of it",
          points: [
            "Finding purpose in life means discovering what truly matters to you and dedicating yourself to it. The more effort and passion you invest in something, the more fulfillment and rewards you'll receive in return.",
            "For example, let's say you have a passion for playing the guitar. If you only play occasionally and don't put much effort into practicing, you may not see much progress or enjoyment. However, if you commit to daily practice, join a band, and perform in front of others, you'll not only improve your skills but also experience the joy of creating music and connecting with others who appreciate your talent.",
            "Similarly, in other aspects of life, such as academics, relationships, or pursuing a career, the more you invest your time and energy, the more opportunities and growth you'll encounter. By finding something you're passionate about and giving it your best, you'll unlock a deeper sense of purpose and fulfillment in your journey through life",
          ],
        },
        {
          title: "No rules in life",
          points: [
            "In the path of life, there are no set rules that apply to everyone in every situation. Each person's journey is unique, and it's up to you to make your own decisions based on your values, goals, and what feels right for you. For example, imagine you're trying to decide whether to pursue a certain career path or go to college. There is no one-size-fits-all answer or rule that says what you should do. It's about exploring your interests, considering your strengths and aspirations, and making a decision that aligns with your own path in life.",
            "Remember, embracing adulthood means taking ownership of your choices and being responsible for the outcomes. While it can be daunting, it's also liberating because you have the freedom to shape your own future. Trust yourself, gather information, seek guidance from trusted mentors or loved ones, and make decisions that feel authentic and true to who you are. So, as you navigate important decisions, embrace the fact that there are no strict rules. It's your journey, and you have the power to create a life that reflects your values, passions, and aspirations.",
          ],
        },
        {
          title: "Do not blame someone else for what happens to you",
          points: [
            "Taking responsibility for your own actions and choices is an important mantra in life. It means not blaming others for the things that happen to you and recognizing that you have control over your own decisions and responses to situations.",
            "For example, let's say you didn't perform well on a test. Instead of blaming the teacher for not explaining the material properly or blaming your classmates for distracting you, taking responsibility means reflecting on your own study habits, preparation, and areas where you can improve. It means acknowledging that you have the power to learn from the experience and make changes for future success.",
            "By not blaming others, you empower yourself to take control of your life. It allows you to learn from mistakes, grow as a person, and make better choices going forward. It also fosters a sense of self-reliance and resilience, as you understand that you have the ability to shape your own path and overcome challenges.",
            "Remember, while it's natural to face difficulties and encounter obstacles, how you respond and take ownership of the situation ultimately determines your growth and success. So, embrace the mantra of not blaming others and instead focus on your own actions and choices to create the life you desire.",
          ],
        },
        {
          title: "Work, Personal, Family & Social",
          points: [],
        },
        {
          title: "Get clutter free",
          points: [
            "Getting clutter-free in life means removing unnecessary distractions and organizing our time and space to be more efficient and focused. It allows us to prioritize our goals and achieve them with greater ease.",
            "For example, let's say you have a big school project coming up. However, your workspace is cluttered with papers, toys, and other distractions. By taking the time to declutter and organize your space, you create a clean and organized environment that helps you concentrate and work more efficiently. It becomes easier to find the materials you need, stay focused on your tasks, and complete your project effectively.",
            "Similarly, in other areas of life, such as managing commitments, relationships, and social activities, decluttering means prioritizing what truly matters and eliminating unnecessary or unproductive elements. It involves identifying your goals and values and aligning your choices with them. By decluttering your schedule and making conscious decisions about how you spend your time, you create more space for activities that support your goals and bring you joy.",
            "When we free ourselves from clutter, we create room for growth, productivity, and a sense of calm. It allows us to be more efficient in pursuing our goals and gives us the clarity and focus needed to make the most of our opportunities. So, embrace the practice of decluttering, both physically and mentally, and watch how it enhances your efficiency and success in various aspects of life.",
          ],
        },
        {
          title: "Don't be the tallest pygmy",
          points: [
            "\"Don't be the tallest pygmy\" means that it's important to surround yourself with people who challenge and inspire you. If you're always the smartest or most talented person in a room, you might not be pushing yourself to grow and learn.",
            "For example, imagine you love playing tennis and want to improve your skills. If you only play against younger or less skilled players, you won't be challenged enough to become better. But if you join a team or play with more experienced players, you'll be pushed to work harder, learn new techniques, and elevate your game.",
            "By seeking out environments where you can learn from others who are more skilled or knowledgeable, you open yourself up to new perspectives and opportunities for growth. Surrounding yourself with people who are smarter, more talented, or have different strengths can inspire you to push your own boundaries and reach higher levels of success.",
            "So, remember, being in the \"wrong room\" as the smartest person limits your potential. Embrace situations where you can learn from others and be motivated to continuously improve. It's in these environments that you'll truly thrive and reach your full potential.",
          ],
        },
      ],
    },
    {
      id: 6,
      ageRange: "Years 20-21",
      topics: [
        {
          title: "If you have been curious you will see the big picture",
          points: [
            '"If you have been curious all your life, you would have seen and learned a lot" means that being curious and eager to explore leads to gaining a wide range of knowledge and experiences. It allows you to understand the bigger picture of things, including yourself and the world around you.',
            "For example, let's say you have always been curious about different cultures and languages. You take the initiative to travel, learn new languages, and immerse yourself in various cultural experiences. Through this curiosity-driven journey, you gain insights into different perspectives, traditions, and ways of life. This not only expands your knowledge but also enhances your ability to empathize and connect with people from diverse backgrounds.",
            "By being curious, you become a lifelong learner, constantly seeking new information, asking questions, and challenging yourself. This broadens your understanding of the world, helps you develop critical thinking skills, and enables you to see connections and patterns that others may miss.",
            "Ultimately, curiosity empowers you to see the bigger picture of who you are and how you fit into the world. It allows you to make informed decisions, pursue meaningful goals, and approach life with a sense of wonder and excitement. So, embrace your curiosity, continue seeking knowledge, and never stop exploring the vast possibilities that life has to offer",
          ],
        },
        {
          title: "Think Big (all have same 24 hrs)",
          points: [
            '"Think Big" means having grand aspirations and setting high goals for yourself. While we all have the same 24 hours in a day, it\'s how you choose to utilize those hours that sets you apart from others.',
            "For example, imagine you have just graduated from college and are entering the professional world. You have dreams of starting your own business. Thinking big means not settling for an ordinary job, but rather envisioning yourself as an entrepreneur who creates something impactful and meaningful.",
            "To make the most of your time and separate yourself from others, you would dedicate yourself to acquiring the necessary skills, networking with industry professionals, and continuously learning about business strategies. You might invest your evenings and weekends in researching, developing your business plan, and taking steps towards realizing your vision.",
            "By thinking big and utilizing your time effectively, you set yourself on a path to achieve extraordinary things. While others may spend their free time on leisure activities, you choose to invest in your goals, working tirelessly to make your dreams a reality",
          ],
        },
        {
          title: "Stop being someone else compete with yourself",
          points: [
            '"Stop being someone else, compete with yourself" means focusing on personal growth and improvement rather than constantly comparing yourself to others. In the context of golf, it means striving to beat your own records and constantly challenging yourself to become a better golfer, rather than trying to be better than someone else.',
            "For example, imagine you're a golfer. Instead of comparing your skills to other golfers and feeling pressured to outperform them, you shift your focus inward. You set personal goals, such as improving your swing technique, reducing your handicap, or mastering a challenging course.",
            "By competing with yourself, you channel your energy towards self-improvement. You analyze your own strengths and weaknesses, seek guidance from coaches, and practice diligently to enhance your skills. You measure your progress based on your own achievements, consistently pushing your own limits to become the best version of yourself as a golfer.",
            "This tenet of life applies beyond golf as well. By embracing the mindset of self-competition, you free yourself from the stress of comparison and judgment. You grow at your own pace, continually striving to become better than you were before, and celebrating the personal milestones and achievements along the way.",
            "Remember, life is not a competition against others, but a journey of self-discovery and growth. By competing with yourself, you unlock your true potential and create a path of continuous improvement and personal fulfillment.",
          ],
        },
        {
          title: "Commit publicly",
          points: [],
        },
        {
          title: "The devil is in the detail",
          points: [
            "This mantra emphasizes the importance of being disciplined and paying close attention to the small things in order to achieve significant success in life, regardless of one's aspirations.",
            "For example, imagine you have aspirations to become a professional musician. It's not enough to have a talent for playing an instrument or singing. To truly excel, you need discipline and attention to detail. This means practicing regularly, honing your technique, and refining your performances. It involves paying attention to nuances, such as timing, tone, and expression, to create a captivating musical experience for your audience.",
            "In any field or endeavor, discipline and attention to detail are crucial. Whether it's academic studies, sports, entrepreneurship, or any other pursuit, success is often achieved through consistent effort, meticulous planning, and a commitment to excellence in even the smallest tasks.",
            "By adopting this mantra and embracing discipline and attention to detail, you set yourself apart from others. You develop a strong work ethic, a keen eye for quality, and the ability to identify and rectify errors or shortcomings. These qualities will propel you towards your goals and help you reach new heights of achievement.",
            "Remember, achieving great things requires discipline and a focus on the details. So, whether you're starting out in life or pursuing your aspirations, make this mantra your guide, and let it inspire you to approach every task with dedication, precision, and a relentless pursuit of excellence.",
          ],
        },
        {
          title: "Seek truth not validation",
          points: [
            '"Seek truth, not validation" means that instead of seeking confirmation or agreement from others to validate your beliefs or opinions, you should strive to uncover the actual truth or facts of a situation. Relying solely on validation can lead to a distorted perception of reality.',
            "For example, let's say you have a strong belief about a certain social issue, and you share it with a few friends who happen to agree with you. If you only seek validation from those friends, you may mistakenly assume that your viewpoint represents the majority or the entire truth. However, by seeking truth, you would engage in a broader exploration. This might involve conducting research, listening to different perspectives, and considering opposing viewpoints to gain a more comprehensive understanding of the issue.",
            "By seeking truth rather than solely seeking validation, you open yourself up to different perspectives and possibilities. You become more informed, adaptable, and capable of critically evaluating various viewpoints. This approach fosters intellectual growth, facilitates respectful dialogue, and helps you make well-rounded and evidence-based decisions.",
            "In essence, seeking truth involves a commitment to intellectual honesty, continuous learning, and a willingness to challenge your own beliefs. It allows you to develop a deeper understanding of the world, make informed decisions, and engage in meaningful conversations that promote progress and understanding.",
          ],
        },
        {
          title:
            "Nothing substantial was achieved without a bit of unsubstantiated enthusiasm",
          points: [],
        },
      ],
    },
  ];

  const toggleAge = (id: any) => {
    if (activeAge === id) {
      setActiveAge(null);
    } else {
      setActiveAge(id);
    }
  };

  const openModal = (lesson: any) => {
    setActiveLesson(lesson);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveLesson(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 text-black">
      <div className="max-w-5xl mx-auto">
        <div className="wrapper wrap2">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-[Cinzel]">
              Rana Gyan Churan : 21 Mantras till you are 21
            </h1>
            <p className="text-lg md:text-xl font-[Cinzel]">
              For him - for his parents and for the universe that brings him up
              !!
            </p>
          </div>
        </div>

        {/* Age range selector */}
        <div className="flex flex-wrap justify-center gap-4 pt-10 mb-8">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => openModal(lesson)}
              className="h-[130px] shadow-md border border-[#3F51B5] rounded-lg px-5 py-3 flex justify-center items-center font-bold text-[20px] text-[#3F51B5] font-poppins transition-all hover:bg-[#3F51B5] hover:text-white cursor-pointer"
            >
              {lesson.ageRange}
            </button>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && activeLesson && (
          <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full p-6 max-h-[90vh] overflow-y-scroll relative">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-slate-400 hover:text-gray-700 text-5xl cursor-pointer"
              >
                &times;
              </button>

              {/* Lesson Title */}
              <h2 className="text-2xl font-bold mb-4 text-indigo-700">
                {activeLesson.ageRange}
              </h2>

              {/* Topics Display */}
              {activeLesson.topics.map((topic, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="text-xl font-semibold mb-2 text-indigo-600">
                    {topic.title}
                  </h3>
                  {topic.points.length > 0 ? (
                    <ul className="space-y-2">
                      {topic.points.map((point, idx) => (
                        <li
                          key={idx}
                          className="pl-4 border-l-2 border-indigo-300"
                        >
                          <p className="text-gray-700">{point}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No details provided.</p>
                  )}
                </div>
              ))}

              {/* Toggle Buttons */}
              <div className="flex gap-4 my-4">
                <button
                  className={`px-4 py-2 rounded-lg text-white font-semibold ${
                    activeTab === "photos"
                      ? "bg-indigo-600"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                  onClick={() => setActiveTab("photos")}
                >
                  Photos
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-white font-semibold ${
                    activeTab === "videos"
                      ? "bg-indigo-600"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                  onClick={() => setActiveTab("videos")}
                >
                  Videos
                </button>
              </div>

              {/* Conditional Rendering */}
              {activeTab === "photos" ? <Gallery /> : <VideoGallery />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifeLessons;
