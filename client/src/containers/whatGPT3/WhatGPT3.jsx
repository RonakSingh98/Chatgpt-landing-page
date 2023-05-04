import React from 'react';
import Feature from '../../components/feature/Feature';
import './whatGPT3.css';

const WhatGPT3 = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="What is GPT-3" text="GPT-3, or the third-generation Generative Pre-trained Transformer, is a neural network machine learning model trained using internet data to generate any type of text. Developed by OpenAI, it requires a small amount of input text to generate large volumes of relevant and sophisticated machine-generated text." />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">The possibilities are beyond your imagination</h1>
      <a href='https://platform.openai.com/docs/libraries'>Explore the Library</a>
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature title="Chatbots" text="Chatbots rely on artificial intelligence and machine learning to perform tasks typically done by humans. Your business can use chatbots to find quality sales leads, improve customer service and engage customers at different points in the sales journey." />
      <Feature title="Knowledgebase" text="A knowledge base is a self-serve online library of information about a product, service, department, or topic. The data in your knowledge base can come from anywhere. Typically, contributors who are well versed in the relevant subjects add to and expand the knowledge base." />
      <Feature title="Education" text="
Artificial intelligence (AI) is rapidly becoming a common feature in school classrooms and adult education worldwide, with many educators and instructors exploring the potential of this technology to improve teaching and learning outcomes." />
    </div>
  </div>
);

export default WhatGPT3;