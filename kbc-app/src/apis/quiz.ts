import { BASE_URL, Endpoints } from "../constant/api";

export const startGameApi = async (body:{
    name:string
}) => {
  const response = await fetch(BASE_URL+Endpoints.startGame, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};



export const nextQuestion = async (body:{
    _id:string,
    previoudQueId:number,
    previousQueAnswer:number
}) => {
  const response = await fetch(BASE_URL+Endpoints.nextQuestion, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const quitQuiz = async (body:{
    _id:string
}) => {
  const response = await fetch(BASE_URL+Endpoints.quitGame, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}


export const getLeaderboard = async () => {
  const response = await fetch(BASE_URL+Endpoints.leadeboard, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export const useFiftyFiftyApi = async (body:{
    _id:string,
    queId:number
}) => {
  const response = await fetch(BASE_URL+Endpoints.fiftyFifty, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}


export const useAskAIApi = async (body:{
    _id:string,
    queId:number
}) => {
  const response = await fetch(BASE_URL+Endpoints.askAI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}