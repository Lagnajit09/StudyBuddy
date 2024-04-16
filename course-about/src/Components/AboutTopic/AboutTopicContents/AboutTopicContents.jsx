import React, {useState, useMemo} from 'react';
import './AboutTopicContents.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function AboutTopicContents() {
    const [showMore, setShowMore] = useState(false);
    const [divHeight, setDivHeight]= useState('100px');

    const paragraphContent = useMemo(() => {
      return (
        // Your large paragraph here
        
          
          `Welcome to Artificial Intelligence A-Z!
         
         Learn key AI concepts with intuition lectures to get you quickly up to speed with all things AI and practice them by building 7 different AIs:
         
         1.Build an AI with a Q-Learning model and train it to optimize warehouse flows in a Process Optimization case study.
         2.Build an AI with a Deep Q-Learning model and train it to land on the moon.
         3.Build an AI with a Deep Convolutional Q-Learning model and train it to play the game of Pac-Man.
         4.Build an AI with an A3C (Asynchronous Advantage Actor-Critic) model and train it to fight Kung Fu.
         5.Build an AI with a PPO (Proximal Policy Optimization) model and train it for a Self-Driving Car.
         6.Build an AI with a SAC (Soft Actor-Critic) model and train it for a Self-Driving Car.
         7.Build an AI by fine-tuning a powerful pre-trained LLM (Llama 2 by Meta) with Hugging Face and re-train it to chat with you about medical terms. Simply put, we build here an AI Doctor Chatbot
         
         But that's not all... Once you complete the course, you will get 3 extra AIs: DDPG, Full World Model, and Evolution Strategies & Genetic Algorithms. We build these AIs with ChatGPT for a Self-Driving Car and a Humanoid application. For each of these extra AIs you will get a long video lecture explaining the implementation, a mini PDF, and the Python code.
         
         Besides, you will get a free 3-hour extra course on Generative AI and LLMs with Cloud Computing as a Prize for completing the course.
         
         And last but not least, here is what you will get with this course:
        
         1. Complete beginner to expert AI skills – Learn to code self-improving AI for a range of purposes. In fact, we code together with you. Every tutorial starts with a blank page and we write up the code from scratch. This way you can follow along and understand exactly how the code comes together and what each line means.
         2. Hassle-Free Coding and Code templates – We will build all our AIs in Google Colab, which means that we will have absolutely NO hassle installing libraries or packages because everything is already pre-installed in Google Colab notebooks. Plus, you’ll get downloadable Python code templates (in .py and .ipynb) for every AI you build in the course. This makes building truly unique AI as simple as changing a few lines of code. If you unleash your imagination, the potential is unlimited.
         3. Intuition Tutorials – Where most courses simply bombard you with dense theory and set you on your way, we believe in developing a deep understanding for not only what you’re doing, but why you’re doing it. That’s why we don’t throw complex mathematics at you, but focus on building up your intuition in AI for much better results down the line.
         4. Real-world solutions – You’ll achieve your goal in not only one AI model but in 5. Each module is comprised of varying structures and difficulties, meaning you’ll be skilled enough to build AI adaptable to any environment in real life, rather than just passing a glorified memory “test and forget” like most other courses. Practice truly does make perfect.
         5. In-course support – We’re fully committed to making this the most accessible and results-driven AI course on the planet. This requires us to be there when you need our help. That’s why we’ve put together a team of professional Data Scientists to support you in your journey, meaning you’ll get a response from us within 48 hours maximum.
    
         So, are you ready to embrace the fascinating world of AI?
         Come join us, never stop learning, and enjoy AI!`
        
      );
    }, []);
  
    const toggleShowMore = () => {
      setShowMore(!showMore);
      setDivHeight(showMore?'100px':'auto')
    };
  
  return (
    <>
    <div className='content' style={{height: divHeight, overflow: 'hidden', transition: 'height 0.5s ease' }}>
    <p className='content-paragraph' style={{boxShadow : !showMore ? 'inset 0px -48px 75px 0px #ffffff':""}}>
      {/* {showMore ? paragraphContent : paragraphContent.split('\n').slice(0, 7).join('\n')} */}
      {paragraphContent}
    </p>

    <div className='box-div' style={{boxShadow : !showMore ? 'inset 0px -48px 75px 0px #ffffff':""}} >

    </div>

  </div>
      {!showMore ? (
        <button className='show-more-less-button' onClick={toggleShowMore}>Show More <KeyboardArrowDownIcon/> </button>
  
      ):( <button className='show-more-less-button' onClick={toggleShowMore}>Show Less <KeyboardArrowUpIcon/> </button>)}
  
  </>
  );
};

export default AboutTopicContents;
